'use client'

import React from 'react'
import Button from '../Button/Button'
import { isUserLoggedIn } from '../../auth/auth';
import { useRouter, usePathname } from 'next/navigation';

function HeaderInfo() {
    const router = useRouter();
    const currentPath = usePathname();

    const loginRedirect = () => {
        router.push('/login');
    };

    const handleLogout = () => {

    };

    return (
        <>
            {currentPath !== "/login" &&
                <div className='flex gap-4'>
                    <div className='w-52'>
                        <div className='font-medium text-sm text-primary-7 border border-solid border-primary-2 bg-primary-8 pl-5 py-1.5'>
                            <p>Assigned to you</p>
                        </div>
                        <div className='font-normal text-base text-primary-5 border-l border-r border-b border-solid border-primary-2 pl-5 py-1.5'>
                            <p>
                                value from db
                            </p>
                        </div>
                    </div>
                    <div className='w-52'>
                        <div className='font-medium text-sm text-primary-7 border border-solid border-primary-2 bg-primary-8 pl-5 py-1.5'>
                            <p>Today's Item</p>
                        </div>
                        <div className='font-normal text-base text-primary-5 border-l border-r border-b border-solid border-primary-2 pl-5 py-1.5'>
                            <p>
                                value from db
                            </p>
                        </div>
                    </div>
                    <div className='my-auto'>
                        <Button
                            text={isUserLoggedIn() ? "Logout" : "Login"}
                            variant="secondary"
                            onClick={isUserLoggedIn() ? handleLogout : loginRedirect}
                            styles="w-40 text-sm font-semibold"
                        />
                    </div>
                </div>
            }
        </>
    )
}

export default HeaderInfo