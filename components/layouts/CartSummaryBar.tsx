import React from "react";
import { FaArrowRight } from "react-icons/fa";

type Props = {
    totalItems: number;
    totalPrice: number;
    onClick: () => void
}

export default function CartSummaryBar({ totalItems, totalPrice, onClick }: Props) {
    const offerThreshold = 499
    const discountValue = 50
    const amountNeeded = offerThreshold - totalPrice

    const offerText = amountNeeded > 0
        ? `Add items worth ₹${amountNeeded} more to get Flat ₹${discountValue} OFF`
        : `CONGRATS! You've unlocked Flat ₹${discountValue} OFF`

    return (
        <button
            onClick={onClick}
            className="fixed bottom-0 left-0 right-0 w-full bg-red-500 text-white p-3 shadow-md transition-transform duration-300 ease-in-out"
        >
            <div className="flex justify-between items-center max-w-screen-md mx-auto">
                <div className="flex flex-col items-start text-left">
                    <span className="font-bold text-md">
                        {totalItems} {totalItems > 1 ? 'items' : 'item'} added
                    </span>
                    <span className="text-xs font-light">
                        {offerText}
                    </span>
                </div>

                <div className="flex items-center gap-2">

                    <FaArrowRight />
                </div>

            </div>

        </button>
    )
}