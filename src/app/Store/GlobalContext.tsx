'use client'

import { createContext, Dispatch, SetStateAction, useState, useContext } from "react";

interface contextProps {
    username: string;
    setUsername: Dispatch<SetStateAction<string>>,
    isAuthenticated: boolean,
    setAuthenticated: Dispatch<SetStateAction<boolean>>,
    isEdit: boolean,
    setIsEdit: Dispatch<SetStateAction<boolean>>
}

const GlobalContext = createContext<contextProps>({
    username: '',
    setUsername: () => '',
    isAuthenticated: false,
    setAuthenticated: () => false,
    isEdit: false,
    setIsEdit: () => false
});

export const GlobalContextProvider = ({children}: {children: React.ReactNode}) => {

    const [username, setUsername] = useState<string>('')
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false)

    return (
        <GlobalContext.Provider value={{username, setUsername, isEdit, setIsEdit, isAuthenticated, setAuthenticated}}>
            {children}
        </GlobalContext.Provider>
    )

}

export const useGlobalContext = () => useContext(GlobalContext)



