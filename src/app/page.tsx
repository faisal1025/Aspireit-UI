'use client'

import React, {useState} from 'react'
import { getAccessToken } from './utils/handleToken';
import { message } from 'antd';

const url = `${process.env.API_URL}//analyze/`
type analyzedObj = {
    label: string,
    score: number
}

export default function Home() {

    const [text, setText] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [analyzedObj, setAnalyzedObj] = useState<analyzedObj>({label: '', score: 0})

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
            </div>
        </div>
        </main>
    );
}
