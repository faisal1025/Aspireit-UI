
import { cookies } from "next/headers";

type registerResponse = {
    email: string;
    message: string;
    token: {
        refresh: string;
        access: string;
    }
}

export const setToken = (data: registerResponse) => {
    if(data.token.refresh && data.token.access){
        localStorage.setItem('refresh', data.token.refresh)
        localStorage.setItem('access', data.token.access)

    }
}

export const getAccessToken = (): string | null => {
    const token = localStorage.getItem('access')
    return token;
}

export const getRefreshToken = (): string | null => {
    const token = localStorage.getItem('refresh')
    return token;
}

export const clearTokens = () => {
    localStorage.removeItem('access')
    localStorage.removeItem('refresh')
}