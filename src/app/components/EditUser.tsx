'use client'

import { useFormik } from 'formik';
import React, {useEffect, useState} from 'react'
import { User } from '../dashboard/[username]/page';
import { EditSchema } from '../Schema';
import { useGlobalContext } from '../Store/GlobalContext';
import { getAccessToken } from '../utils/handleToken';
import { message } from 'antd';


const EditUser = ({initialState}: {initialState: User}) => {
    
    const [initialValues, setInitialValues] = useState({
        first_name: "",
        last_name: "",
        email: ""
    })
    const {isEdit, setIsEdit} = useGlobalContext()

    const url = `${process.env.API_URL}/edit/?username=${initialState.username}`

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: EditSchema,
        onSubmit: async (values, { resetForm }) => {
          try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${getAccessToken()}`
                },
                body: JSON.stringify(values),
            })
            const data = await response.json();
            message.success(data.message)
            resetForm()
            setIsEdit(false)
          } catch (error) {
            console.log(error);
          }
        }
    })

    useEffect(() => {
        setInitialValues({
            first_name: initialState.first_name,
            last_name: initialState.last_name,
            email: initialState.email
        })
    }, [])

    return (
        <div className={`h-screen absolute bg-slate-700 bg-opacity-50 w-full flex justify-center items-center ${isEdit ? 'translate-y-0' : '-translate-y-[130%]'} transition-transform`}>
            <div className='rounded-lg p-8 bg-gradient-to-r from-blue-300 to-blue-100 text-white border border-slate-100'>
            <h1 className='text-4xl font-semibold'>Edit User {initialState.first_name}</h1>
            <form onSubmit={handleSubmit} className='w-[30rem] py-2 text-black'>
                
                <div>
                    <input
                        className="rounded-full my-1 border border-black dark:bg-slate-500 dark:text-white text-base w-full p-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        type='text'
                        placeholder='First Name'
                        name="first_name"
                        value={values.first_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.first_name && touched.first_name ? <p className="text-sm text-red-500 drop-shadow-xl">{errors.first_name}</p> : null}
                </div>
                <div>
                    <input
                        className="rounded-full my-1 border border-black dark:bg-slate-500 dark:text-white text-base w-full p-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        type='text'
                        placeholder='Last Name'
                        name="last_name"
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.last_name && touched.last_name ? <p className="text-sm text-red-500 drop-shadow-xl">{errors.last_name}</p> : null}
                </div>
                <div>
                    <input
                        className="rounded-full my-1 border border-black dark:bg-slate-500 dark:text-white text-base w-full p-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        placeholder='Email'
                        type='email'
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.email && touched.email ? <p className="text-sm text-red-500 drop-shadow-xl">{errors.email}</p> : null}
                </div>
    
                <button className="rounded-full my-1 border border-black bg-slate-800 text-white text-base w-full p-4 hover:bg-slate-700 active:scale-75 transition"
                    type="submit">
                        Save
                </button>
                <button onClick={() => setIsEdit(false)} 
                    className="rounded-full my-1 border border-black bg-slate-800 text-white text-base w-full p-4 hover:bg-slate-700 active:scale-75 transition"
                    type="button">
                        Cancle
                </button>
            </form>
            </div>
        </div>
    )
}

export default EditUser
