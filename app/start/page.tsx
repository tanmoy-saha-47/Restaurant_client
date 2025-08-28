'use client'
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useUser } from "@/contexts/UserContext"

export default function StartPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { login } = useUser()
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const tableNumberStr = searchParams.get('table')

        if (tableNumberStr) {
            const tableNumber = parseInt(tableNumberStr, 10)

            const initialUserData = {
                name: '',
                phone: '',
                tableNumber: tableNumber
            }
            login(initialUserData)
            localStorage.setItem('userData', JSON.stringify(initialUserData))

            router.push('/login')
        } else {
            console.error("No table number found in URL.Please scan again.")
            setError("Invalid URL. No table number was found. Please scan a valid QR code at your table.");

        }
    }, [searchParams])

    if (error) {
        return (
            <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
                <h1 style={{ color: 'red' }}>Error</h1>
                <p>{error}</p>
                <a href="/" style={{ color: '#0070f3' }}>Go to Homepage</a>
            </div>
        );
    }

    return (
        <div>
            <p>Please wait.</p>
        </div>
    )
}