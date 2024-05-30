'use client'

import Link from 'next/link'
import React from 'react'
import { clearTokens } from '../utils/handleToken'
import {Avatar} from 'antd'
import { useGlobalContext } from '../Store/GlobalContext'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const {username, setUsername} = useGlobalContext()

    const {replace} = useRouter()

    function logout() {
        setUsername(null);
        clearTokens()
        replace('/login')
    }

    return (
        <div className='flex justify-between items-center p-5'>
            <div className='text-xl font-bold'>
                <Link href={'/'}>Home</Link>
            </div>
            <div className='flex items-center gap-3'>
                {
                    username !== null ?
                    <>
                    <Link href={`/dashboard/${username}`}>
                    <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large" gap={4}>
                        {username[0].toUpperCase()}
                    </Avatar>
                    </Link>
                    <button onClick={() => logout()} className='hover:underline text-blue-500'>Logout</button> 
                    </>
                    :
                    <>
                    <Link href={'/register'} className='hover:underline text-blue-500'>Register</Link>
                    <Link href={'/login'} className='hover:underline text-blue-500'>Login</Link>
                    </>

                }
            </div>
        </div>
    )
}

export default Navbar
