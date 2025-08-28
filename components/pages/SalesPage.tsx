'use client'
import React, { useState } from "react"
import { salesData, Sale } from "@/data/salesData";

export default function SalesPage({ onBack }: { onBack: () => void }) {
    const [currentPage, setCurrentPage] = useState(1)
    const rowsPerPage = 10

    //Slice data for currnt page
    const indexOfLastRow = currentPage * rowsPerPage
    const indexOfFirstRow = indexOfLastRow - rowsPerPage
    const currentRows = salesData.slice(indexOfFirstRow, indexOfLastRow)

    const totalPages = Math.ceil(salesData.length / rowsPerPage)
    return (
        <div>
            <main className="flex-1 bg-gray-50">
                <header className="mb-3 px-3 py-1">
                    <h1 className="text-4xl font-medium text-gray-600 tracking-wide">Sales</h1>
                </header>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 border text-sm text-left font-semibold text-gray-600 ">Date</th>
                                <th className="px-4 py-2 border text-sm text-left font-semibold text-gray-600 ">Order ID</th>
                                <th className="px-4 py-2 border text-sm text-left font-semibold text-gray-600 ">Customer</th>
                                <th className="px-4 py-2 border text-sm text-left font-semibold text-gray-600 ">Amount</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {currentRows.map((sale: Sale, index) => (
                                <tr key={index} className="hover:bg-gray-100 text-md">
                                    <td className="px-4 py-2 text-gray-700 "> {sale.date} </td>
                                    <td className="px-4 py-2 text-gray-700 "> {sale.orderId} </td>
                                    <td className="px-4 py-2 text-gray-700 "> {sale.customer} </td>
                                    <td className="px-4 py-2 text-gray-700 ">${sale.total.toFixed(2)}  </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="flex justify-center items-center gap-2 mt-4 mb-4">
                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600' : ''}`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            className="px-3 py-1 border rounded disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}