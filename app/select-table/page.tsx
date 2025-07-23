'use client'
import React, { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import { GiWoodenChair } from 'react-icons/gi';
import Image from 'next/image';


const availableTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function SelectTablePage() {
    const router = useRouter()
    const { user, login } = useUser()

    const [selectedTable, setSelectedTable] = useState<number | null>(null)

    useEffect(() => {
        if (user && user.tableNumber) {
            setSelectedTable(user.tableNumber)
        }
    }, [user])

    const handleSelect = (table: number) => {
        setSelectedTable(table)
    }

    const handleConfirmSelection = () => {
        if (!selectedTable) return;

        if (!user) {
            router.push('/login')
            return;
        }

        login(
            {
                ...user,
                tableNumber: selectedTable,
            }
        )
        router.push("/menu/category")
    }

    return (
        <>



            <div className='min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 relative'>
                <div className='absolute inset-0'>
                    <Image
                        src='/food.jpg'
                        alt='Background'
                        fill
                        className='object-cover'
                        priority
                    />
                </div>

                <div className='max-w-md w-full text-center relative z-10 backdrop-blur-sm bg-opacity-95'>
                    <h1 className='text-3xl font-extrabold text-gray-800 mb-8'>Select Your Table</h1>
                    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 '>
                        {availableTables.map((table) => (
                            <button
                                key={table}
                                onClick={() => handleSelect(table)}
                                className={`flex items-center justify-center p-6 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg ${selectedTable === table ? 'bg-red-600 border-red-600 text-black shadow-xl scale-105' : ''
                                    }
                            `}
                            >
                                <span className='text-xl font-semibold'> <GiWoodenChair /> {table}</span>
                            </button>
                        ))}
                    </div>

                    {selectedTable && (
                        <button
                            onClick={handleConfirmSelection}
                            className='mt-8 bg-blue-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105 duration-200'
                        >
                            Confirm Table {selectedTable}
                        </button>
                    )}

                </div>
            </div>
        </>
    )
}

export default SelectTablePage