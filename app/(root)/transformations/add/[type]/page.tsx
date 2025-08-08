import Header from '@/components/shared/header';
import TransformationForm from '@/components/shared/transformationForm';
import { transformationTypes } from '@/constants';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

interface SearchParamProps {
  params: Promise<{ type: TransformationTypeKey }>;
}

const AddTransformationTypePage = async ({ params }: SearchParamProps) => {
  const { type } = await params;
  const { userId } = await auth();

  // Redirect if not authenticated
  if (!userId) redirect('/sign-in');


  const transformation = transformationTypes[type as TransformationTypeKey];
  const user = await getUserById(userId);

  // Handle case where user is not found
  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <>
      <Header
        title={transformation.title}
        subtitle={transformation.subtitle}
      />
      <section className='mt-10'>
        <TransformationForm
          action="Add"
          userId={user._id} // Ensure _id is string
          type={transformation.type as TransformationTypeKey}
          creditBalance={user.creditBalance}
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;