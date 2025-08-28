import React, { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { MenuItem } from "@/data/menuData";
import { VscChromeClose } from 'react-icons/vsc';

type CartItem = MenuItem & { quantity: number }

type EditItemProps = {
    item: CartItem
    onClose: () => void
    onUpdate: (item: MenuItem, newQuantity: number) => void
}

export default function EditItemModal({ item, onClose, onUpdate }: EditItemProps) {
    const [tempQuantity, setTempQuantity] = useState(item.quantity)

    const handleUpdate = () => {
        onUpdate(item, tempQuantity)
        onClose()
    }

    const totalPrice = (item.price * tempQuantity).toFixed(2);

    return (
        // modal overlay
        <div
            onClick={onClose}
            className="fixed inset-0 backdrop-blur-xs z-40 flex items-end"
        >
            {/* Modal content */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white w-full rounded-t-2xl p-4 transform transition-transform duration-300 ease-in-out translate-y-0 animate-slideUp"
            >
                {/* close btn */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1">
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg">
                        <VscChromeClose size={20} />
                    </button>
                </div>

                {/* content */}
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(85vh - 80px)' }}>
                    {item.imageUrl && (
                        <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-56 object-cover"
                        />
                    )}
                    <div className="p-5">
                        <div className='flex items-center gap-2 mb-2'>
                            <span className={`w-4 h-4 rounded-full border ${item.isVeg ? 'bg-green-500 border-green-600' : 'bg-red-600 border-red-700'}`}></span>
                            <h2 className="text-2xl font-bold font-serif text-gray-800">{item.name}</h2>
                        </div>
                        <p className="text-gray-600 mt-2 mb-4">{item.description}</p>
                        <p className="text-xl font-semibold text-gray-800">₹{item.price}</p>

                        <div className="mt-6">
                            <label htmlFor="cooking-request" className="text-sm font-medium text-gray-700">Add a cooking request (optional)</label>
                            <textarea id="cooking-request" className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-500" placeholder="e.g. Don't make it too spicy"></textarea>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <div className="flex items-center border border-gray-300 rounded-lg text-red-500 font-bold text-lg">
                            <button onClick={() => setTempQuantity(q => Math.max(1, q - 1))} className="px-3 py-1">-</button>
                            <span className="px-4 text-sm text-black">{tempQuantity}</span>
                            <button onClick={() => setTempQuantity(q => q + 1)} className="px-3 py-1">+</button>
                        </div>
                        <button
                            onClick={handleUpdate}
                            className="bg-red-500 text-white font-bold py-3 px-8 rounded-lg"
                        >
                            Update item ₹{totalPrice}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}