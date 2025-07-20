'use client'
import { useContext, createContext, useState, ReactNode } from "react"

type User = {
    name: string,
    phone: string,
    tableNumber: number
}

type UserContextType = {
    user: User | null
    login: (userData: User) => void
    logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)


export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    const login = (userData: User) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useUser must be provided within a provider")
    }
    return context
}


