// app/api/clerk-webhook/route.ts
import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser, deleteUser, updateUser } from '@/lib/actions/user.action'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env')
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', { status: 400 })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Webhook instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }

  // Handle the event
  const eventType = evt.type

  try {
    if (eventType === 'user.created') {
      const { id, first_name, last_name, username, email_addresses, image_url } = evt.data

    //   Validate required fields
      if (!email_addresses?.[0]?.email_address) {
        throw new Error('No email address provided in webhook payload')
      }

      await createUser({
        clerkId: id,
        firstName: first_name ?? "",
        lastName: last_name ?? "",
        username: username || `${first_name}_${last_name}`.toLowerCase(),
        email: email_addresses[0].email_address,
        photo: image_url,
      })
    }

    if (eventType === 'user.updated') {
      const { id, first_name, last_name, username, email_addresses, image_url } = evt.data

      // Validate required fields
      if (!email_addresses?.[0]?.email_address) {
        throw new Error('No email address provided in webhook payload')
      }

      await updateUser(id, {
        firstName: first_name ?? "",
        lastName: last_name ?? "",
        username: username || `${first_name}_${last_name}`.toLowerCase(),
        photo: image_url
      })
    }

    if (eventType === 'user.deleted') {
      const { id } = evt.data
      if (!id) {
        throw new Error('No user id provided in webhook payload')
      }
      await deleteUser(id)
    }

    return new Response('Webhook processed successfully', { status: 200 })
  } catch (err) {
    console.error('Error processing webhook:', err)
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    return new Response(`Error processing webhook: ${errorMessage}`, { status: 500 })
  }
}