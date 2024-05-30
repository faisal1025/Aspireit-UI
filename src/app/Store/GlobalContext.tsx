'use client'

import { createContext, Dispatch, SetStateAction, useState, useContext, useEffect } from "react";

interface contextProps {
    username: string | null;
    setUsername: Dispatch<SetStateAction<string | null>>,
    isAuthenticated: boolean,
    setAuthenticated: Dispatch<SetStateAction<boolean>>,
    isEdit: boolean,
    setIsEdit: Dispatch<SetStateAction<boolean>>
}

const GlobalContext = createContext<contextProps>({
    username: null,
    setUsername: () => '',
    isAuthenticated: false,
    setAuthenticated: () => false,
    isEdit: false,
    setIsEdit: () => false
});

export const GlobalContextProvider = ({children}: {children: React.ReactNode}) => {

    const [username, setUsername] = useState<string | null>(null)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)
    useEffect(() => {
        setUsername(localStorage.getItem('username'))
    }, [])

    return (
        <GlobalContext.Provider value={{username, setUsername, isEdit, setIsEdit, isAuthenticated, setAuthenticated}}>
            {children}
        </GlobalContext.Provider>
    )

}

export const useGlobalContext = () => useContext(GlobalContext)



