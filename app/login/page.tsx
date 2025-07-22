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
        <div className="min-h-screen relative">
            {/* background image container */}
            <div className="absolute inset-0">
                <Image
                    src='/login.jpg'
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            {/* login form overlay */}
            <div
                className="relative z-10 min-h-screen flex flex-col justify-center items-center p-6">
                {/* form container */}
                <div
                    className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-8 w-full max-w-md">
                    {/* icon */}
                    <div className="text-center mb-6">
                        <div
                            className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <AiOutlineUser
                                size={32} className="text-gray-600" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">
                        LOGIN</h1>
                    <p className="text-center text-gray-600 mb-6">
                        Enter your valid mobile number to continue
                    </p>


                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out active:scale-95"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage