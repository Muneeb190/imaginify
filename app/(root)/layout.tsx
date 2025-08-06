import React from 'react'
import Sidebar from '../../components/shared/sidebar'
import MobileNav from '@/components/shared/mobileNav'
import { Toaster } from 'sonner'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className='root'>

            <Sidebar />
            <MobileNav />
            <div className='root-container'>
                <div className='wrapper'>
                    {children}
                </div>
            </div>
            <Toaster richColors/>
        </main>
    )
}

export default layout