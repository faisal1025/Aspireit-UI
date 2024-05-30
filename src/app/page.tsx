'use client'

import React, {useState, FormEventHandler} from 'react'
import { getAccessToken } from './utils/handleToken';
import { message } from 'antd';

const url = `${process.env.API_URL}//analyze/`
type analyzedObj = {
    label: string,
    score: number
}
type fileForm = {
    file: File | null,
    description: string
}

export default function Home() {

    const [text, setText] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [formData, setFormData] = useState<fileForm>({
        file: null,
        description: ''
    })
    const [errorFile, setErrorFile] = useState({
        file: "",
        description: ''
    })



    const [analyzedObj, setAnalyzedObj] = useState<analyzedObj>({label: '', score: 0})

    async function handleSubmitFile(e: any){
        e.preventDefault()

        if(formData.file === null){
            setErrorFile({
                ...errorFile,
                file: "File is required can't be null"
            })
            return
        }

        if(formData.description === ''){
            setErrorFile({
                ...errorFile,
                description: "description is required"
            })
            return
        }

        const urlFile = `${process.env.API_URL}/upload/`

        const form_data = new FormData()
        form_data.append('file', formData.file, formData.file.name)
        form_data.append('description', formData.description)

        const response = await (await fetch(urlFile, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            },
            body: form_data
        })).json()

        if(response.detail){
            message.error(response.detail)
        }else{
            message.success(response.message)
        }
    }

    async function handleSubmit(e: any) {
        e.preventDefault();

        if(text === ''){
            setError("Please enter any text")
            return
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${getAccessToken()}`
            },
            body: JSON.stringify({'text': text}),
        })

        const result = await response.json()
        if(result.result){
            console.log(result);
            const analyzedResult = result.result[0]
            setAnalyzedObj(analyzedResult)
        }else{
            message.error(result.detail)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center p-24">
        <div className="w-[35rem] flex border border-gray-400 rounded-lg shadow-xl flex-col items-center justify-between p-8">
            <h1 className='text-4xl font-semibold py-4 underline'>Welcome to My App</h1>
            <h2 className='text-2xl font-semibold'>This is a assignment project</h2>
            <div className='py-8 text-center'>
                <h3 className='text-lg font-semibold'>Enter Text for Sentiment Analysis</h3>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Enter your thoughts' onChange={e => setText(e.target.value)} className="rounded-lg my-1 border border-black dark:bg-slate-500 dark:text-white text-base w-full p-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1" />
                    {error !== '' ? <p className="text-sm text-red-500 drop-shadow-xl">{error}</p> : null}
                    <button type="submit" className="rounded-full my-1 border border-black bg-slate-800 text-white text-base w-full p-4 hover:bg-slate-700 active:scale-75 transition">Submit</button>
                </form>
                {
                    analyzedObj.label !== '' ?
                    <>
                        <p className='text-lg font-semibold'>Nature of text: {analyzedObj.label}</p>
                        <p className='text-lg font-semibold'>Score of Text: {analyzedObj.score}</p>
                    </> :
                    null
                }
                <h3 className='text-lg font-semibold'>Upload your file</h3>
                <form onSubmit={handleSubmitFile}>
                    <input 
                        type='file'
                        placeholder='choose your file'
                        name='file'
                        className="rounded-lg my-1 border border-black dark:bg-slate-500 dark:text-white text-base w-full p-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        accept='image/png, image/jpeg, application/pdf, .mp3'
                        onChange={(e) => setFormData({...formData, file: e.target.files ? e.target?.files[0] : null})}
                    />
                    {errorFile.file ? <p className="text-sm text-red-500 drop-shadow-xl">{errorFile.file}</p> : null}
                    <textarea 
                        rows={4}
                        name='description'
                        placeholder='Description'
                        className="rounded-lg my-1 border border-black dark:bg-slate-500 dark:text-white text-base w-full p-4 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                    {errorFile.description ? <p className="text-sm text-red-500 drop-shadow-xl">{errorFile.description}</p> : null}
                    <button type="submit" className="rounded-full my-1 border border-black bg-slate-800 text-white text-base w-full p-4 hover:bg-slate-700 active:scale-75 transition">Upload</button>
                </form>
            </div>
        </div>
        </main>
    );
}
