'use client'

import { useGlobalContext } from '@/app/Store/GlobalContext'
import EditUser from '@/app/components/EditUser'
import { getAccessToken } from '@/app/utils/handleToken'
import { message } from 'antd'
import Link from 'next/link'
import React, {useEffect, useState, Suspense} from 'react'

export interface User {
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    id: number,
    date_joined: string,
    files: Array<{
        creator: string,
        creator_id: number,
        description: string,
        file: string,
        id: number
    }>
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
        date_joined: '',
        files: []
    })
    
    const handleDownload = async (id:number, name: string) => {
        const download_url = `${process.env.API_URL}/download/?id=${id}`
        try {
            const response = await fetch(download_url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`
                }
            })
            if (!response.ok) {
                message.error('Network response was not ok');
                return
            }
    
            const blob = await response.blob()

            // Create a URL for the file
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${name}`); // Use the desired file name
            document.body.appendChild(link);
            link.click();
    
            // Clean up the URL
            link?.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url);
            
        } catch (error) {
            message.error('Error downloading the file, try again');
        }


        
    } 

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
                date_joined: userResponse.date_joined,
                files: userResponse.files
            })
        }
        if(isEdit === false)
            getUser()
    }, [isEdit])

    return (
        <>
        <EditUser initialState={user} />
        <div className='h-screen flex flex-col items-center'>
            <Suspense fallback={'loading'}>
                <div className='p-5 w-full h-min rounded-lg border shadow-xl bg-gradient-to-tr from-blue-600 to-slate-200'>
                    <h1 className='text-4xl'>{user.first_name} {user.last_name}</h1>
                    <h3 className='text-xl'>{user.username}</h3>
                    <h4 className='text-base capitalize'>joined at {user.date_joined}</h4>
                    <h4 className='text-base'>Email: {user.email}</h4>
                    <div className='flex justify-end items-center p-4'>
                        <button onClick={() => setIsEdit(true)} className='p-4 bg-slate-900 text-white rounded-lg focus:outline-2'>Edit</button>
                    </div>
                </div>

                <div className='p-5 w-full h-min rounded-lg border shadow-xl bg-gradient-to-tr from-slate-300 to-slate-100'>
                    <table className='w-full'>
                    
                        <tr className='py-12 px-8 border border-gray-500'>
                            <th  className='text-left'>File Name</th>
                            <th className='text-left'>Description</th>
                            <th className='text-left'>Download</th>
                        </tr>
                    
                        <tbody>

                        {
                            user.files.map((file, i) => {
                                return (
                                    <tr key={file.id} className='py-12 px-8 border border-gray-500'>
                                        <td className='text-blue-700 hover:underline'>
                                            <Link target='_blank' href={`${process.env.API_URL}${file.file}`}>
                                                {file.file}
                                            </Link>
                                        </td>
                                        <td>{file.description}</td>
                                        <td onClick={() => handleDownload(file.id, file.file.slice(14))} className='text-blue-700 cursor-pointer hover:underline'>
                                            download
                                        </td>
                                    </tr>

                                )
                            })
                        }
                        </tbody>
                     
                    </table>
                </div>
            </Suspense>
        </div>
        </>
    )
}

export default page
