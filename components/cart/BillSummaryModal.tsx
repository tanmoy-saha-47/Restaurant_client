'use client'
import React, { useEffect } from "react"
import { MenuItem } from '@/data/menuData'

type CartItem = MenuItem & { quantity: number }
type OrderProps = {
    id: number;
    tableNumber: number | null;
    total: number;
    status: string;
    items: CartItem[];
    createdAt: string;
}

type BillModalProps = {
    isOpen: boolean
    onClose: () => void
    details: OrderProps
}

export default function BillSummaryModal({ isOpen, onClose, details }: BillModalProps) {
    useEffect(() => {
        const body = document.body;
        const originalOverflow = window.getComputedStyle(body).overflow;

        if (isOpen) {
            // When the modal opens, hide the scrollbar
            body.style.overflow = 'hidden';
        }

        // This is the cleanup function
        return () => {
            // When the modal closes, restore the original overflow style
            body.style.overflow = originalOverflow;
        };
    }, [isOpen]); // This effect depends ONLY on the isOpen state

    if (!isOpen) {
        return null;
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };



    return (
        <div
            className="fixed inset-0 backdrop-blur-sm flex justify-center items-end sm:items-center z-50"
            onClick={handleOverlayClick}
        >
            {/* Modal content */}
            <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-lg p-5 shadow-xl animate-slideUp">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Bill Summary</h2>
                    <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-800">
                        &times;
                    </button>
                </div>

                {/* Modal Body */}
                <div className="space-y-3 text-gray-700">

                    <div className="flex justify-between">
                        <span>Table Number</span>
                        <span>{details.tableNumber}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Items</span>
                        <span>
                            {details.items.map((item: CartItem) => (
                                <div key={item.name}>
                                    {item.name} X {item.quantity}
                                </div>
                            ))}
                        </span>
                    </div>

                    <hr className="my-3 border-dashed" />

                    <div className="flex justify-between font-bold text-lg text-black">
                        <span>To Pay</span>
                        <span>₹{details.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}