'use client'

import Image from "next/image";
import {useFormik} from 'formik'

import { message } from "antd";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../Store/GlobalContext";
import { RegisterSchema } from "../Schema";
import { setToken } from "../utils/handleToken";

const initialState = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const url = `${process.env.API_URL}/`

const page = () => {
    const {setUsername} = useGlobalContext()
    const router = useRouter()
    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        initialValues: initialState,
        validationSchema: RegisterSchema,
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
            
            if(data.token !== undefined){
                setToken(data)
                setUsername(data.username)
                router.push(`/dashboard/${data.username}`)
                message.success(`${data.message}`)
            }
            else{
                console.log("data: ", data);
            }

            resetForm()
            } catch (error) {
            console.log(error);
            }
        }
    })

    return (
        <main className="flex min-h-screen items-center justify-center p-24">
        <div className="w-[30rem]  flex border border-gray-400 rounded-lg shadow-xl flex-col items-center justify-between p-8">
            <h1 className='text-4xl font-semibold'>User Register</h1>
            <form onSubmit={handleSubmit} className='w-full py-5'>
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
                        type='text'
                        placeholder='First Name'
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.firstName && touched.firstName ? <p className="text-sm text-red-500 drop-shadow-xl">{errors.firstName}</p> : null}
                </div>
                <div>
                    <input
                        className="rounded-full my-1 border border-black dark:bg-slate-500 dark:text-white text-base w-full p-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        type='text'
                        placeholder='Last Name'
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.lastName && touched.lastName ? <p className="text-sm text-red-500 drop-shadow-xl">{errors.lastName}</p> : null}
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
                <div>
                    <input
                        className="rounded-full my-1 border border-black dark:bg-slate-500 dark:text-white text-base w-full p-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        type='password'
                        placeholder='Confirm Password'
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.confirmPassword && touched.confirmPassword ? <p className="text-sm text-red-500 drop-shadow-xl">{errors.confirmPassword}</p> : null}
                </div>

                <button className="rounded-full my-1 border border-black bg-slate-800 text-white text-base w-full p-4 hover:bg-slate-700 active:scale-75 transition"
                    type="submit">Register</button>
            </form>
        </div>
        </main>
    );
}

export default page
