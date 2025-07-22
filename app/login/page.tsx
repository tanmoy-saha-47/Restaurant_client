'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"
import { AiOutlineUser } from 'react-icons/ai';
import React from 'react'
import Image from "next/image";

function LoginPage() {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const router = useRouter()
    const { login } = useUser()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!name || !phone) return;

        login({ name, phone, tableNumber: 0 })

        router.push('/select-table')
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <div className='relative w-full h-auto mt-4 px-4'>
                <div className='relative w-full aspect-[3/2] md:aspect-[4/1] overflow-hidden rounded-lg shadow-md'>
                    <Image
                        src='/food.jpg'
                        alt='Image'
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        priority
                        className='object-cover object-center'
                    />
                </div>
            </div>
            <AiOutlineUser className="text-gray-500 text-6xl mb-4" />

            <h2 className="text-2xl font-bold mb-2">Login</h2>
            <p className="text-gray-600 mb-6">Enter your valid mobile number</p>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow-xl max-w-sm space-y-4"
            >
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border border-gray-200 p-3 w-full rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-200 p-3 w-full rounded-lg"
                />

                <button
                    type="submit"
                    className="w-full bg-gray-300  py-3 hover:bg-blue-500 active:bg-blue-700 active:scale-90 duration-200 ease-in-out font-semibold rounded-lg shadow-lg border-none"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage