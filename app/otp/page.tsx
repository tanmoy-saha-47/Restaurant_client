'use client'
import React, { useState, useEffect, useRef } from "react";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoMdKey } from "react-icons/io";


export default function OtpPage() {
    const [otp, setOtp] = useState<string[]>(new Array(4).fill(""))
    const [error, setError] = useState('')
    const router = useRouter()
    const user = useUser()

    const inputRefs = useRef<(HTMLInputElement | null)[]>([])//Refs to control focus on input boxes

    useEffect(() => {
        //automatic focus on first box whn page loads
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus()
        }
    }, [])

    const handleChange = (element: HTMLInputElement, index: number) => {
        //only numbers allowed
        if (isNaN(Number(element.value))) return;

        //state update
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        //moving to next box
        if (element.nextSibling && element.value) {
            (element.nextSibling as HTMLInputElement).focus()
        }
    }

    //handles backspace key focus
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredOtp = otp.join('')

        if (enteredOtp.length !== 4) {
            setError("Please enter a valid 4-digit OTP")
            return;
        }
        console.log("Verifying OTP:", enteredOtp);
        setError('')
        router.push("/menu/Food")
    }

    return (
        <div className="min-h-screen relative font-sans">
            {/* //background container */}
            <div className="absolute inset-0">
                <Image
                    src='/otp.jpg'
                    alt='Background'
                    fill
                    className='object-cover w-full h-full'
                    priority
                />
            </div>
            {/* //OTP form overlay */}
            <div className="relative z-10 min-h-screen  flex flex-col justify-center items-center p-6">
                {/* //form container */}
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-xl p-8 w-full max-w-md">
                    <div className="text-center mb-6">
                        <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                            <IoMdKey size={32} className="text-gray-600" />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-center mb-2 text-gray-800 ">
                        Enter Verification Code
                    </h1>
                    <p className="text-center text-gray-600 mb-6">
                        A 4-Digit OTP was sent to {user?.user?.phone ? `+91${user.user.phone}` : 'your phone'}
                    </p>

                    {error && <p className="text-center text-red-500 mb-4">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex justify-center space-x-2" aria-label="OTP input">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    ref={el => { if (el) inputRefs.current[index] = el }}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="\d{1}"
                                    maxLength={1}
                                    value={data}
                                    onChange={e => handleChange(e.target, index)}
                                    onKeyDown={e => handleKeyDown(e, index)}
                                    className="w-12 h-12 text-center text-2xl border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none"
                                    required
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out active:scale-95"
                        >
                            Verify & Continue
                        </button>

                        <div className="text-center mt-4">
                            <button className="text-sm text-gray-600 hover:text-orange-500 hover:underline">
                                Didn't receive code? Resend
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}
