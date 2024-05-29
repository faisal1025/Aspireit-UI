'use client'

import { useGlobalContext } from '@/app/Store/GlobalContext'
import EditUser from '@/app/components/EditUser'
import { getAccessToken } from '@/app/utils/handleToken'
import React, {useEffect, useState, Suspense} from 'react'

export interface User {
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    id: number,
    date_joined: string
}

const page = ({params}: {params: {username: string}}) => {
    const {isEdit, setIsEdit} = useGlobalContext()
    const url = `${process.env.API_URL}/dashboard/?username=${params.username}`

    const [user, setUser] = useState<User>({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        id: 0,
        date_joined: ''
    })
    
    useEffect(() => {
        async function getUser() {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            }) 
            const userResponse = await response.json()
            console.log("user: ", userResponse);
            
            setUser({
                id: userResponse.id,
                username: userResponse.username,
                email: userResponse.email,
                first_name: userResponse.first_name,
                last_name: userResponse.last_name,
                date_joined: userResponse.date_joined
            })
        }
        getUser()
    }, [isEdit])

    return (
        <div className='h-screen flex justify-center items-center'>
            <Suspense fallback={'loading'}>
                <EditUser initialState={user} />
                <div className='p-5 w-1/2 rounded-lg border shadow-xl bg-gradient-to-tr from-blue-600 to-slate-200 text-white'>
                    <h1 className='text-4xl'>{user.first_name} {user.last_name}</h1>
                    <h3 className='text-xl'>{user.username}</h3>
                    <h4 className='text-base'>joined at {user.date_joined}</h4>
                    <h4 className='text-base'>Email: {user.email}</h4>
                    <div className='flex justify-end items-center p-4'>
                        <button onClick={() => setIsEdit(true)} className='p-4 bg-slate-900 text-white rounded-lg focus:outline-2'>Edit</button>
                    </div>
                </div>
            </Suspense>
        </div>
    )
}

export default page
