'use client'

import React from 'react'
import {useFormik} from 'formik'
import { LoginSchema } from '../Schema'
import { setToken } from '../utils/handleToken'
import { useRouter } from 'next/navigation'
import {message} from 'antd'
import { useGlobalContext } from '../Store/GlobalContext'


const initialState = {
    username: "",
    password: "",
}

const url = `${process.env.API_URL}/login/`

const page = () => {
    const {setUsername} = useGlobalContext()
    const router = useRouter();

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialState,
        validationSchema: LoginSchema,
        onSubmit: async (values, { resetForm }) => {
          try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
            const data = await response.json();
            if( data.token !== undefined){
                setToken(data)
                setUsername(data.username)
                router.push(`/dashboard/${data.username}`)
                message.success(`${data.message}`)
            }
            else{
                console.log(data);
                message.error(data.message)
            }
            resetForm()
          } catch (error: any) {
            console.log(error);
          }
        }
    })
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className='text-4xl font-semibold'>User Login</h1>
        <form onSubmit={handleSubmit} className='w-[25rem] py-2'>
            <div>
                <input
                    className="rounded-full my-1 border border-black dark:bg-slate-500 dark:text-white text-base w-full p-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                    type='text'
                    placeholder='Username'
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.username && touched.username ? <p className="text-sm text-red-500 drop-shadow-xl">{errors.username}</p> : null}
            </div>
            <div>
                <input
                    className="rounded-full my-1 border border-black dark:bg-slate-500 dark:text-white text-base w-full p-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                    type='password'
                    placeholder='Password'
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.password && touched.password ? <p className="text-sm text-red-500 drop-shadow-xl">{errors.password}</p> : null}
            </div>
  
            <button className="rounded-full my-1 border border-black bg-slate-800 text-white text-base w-full p-4 hover:bg-slate-700 active:scale-75 transition"
                type="submit">Login</button>
        </form>
      </main>
    )
}

export default page
