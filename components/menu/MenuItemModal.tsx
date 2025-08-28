import React, { useMemo } from "react";
import { useCart } from "@/contexts/CartContext";
import { MenuItem } from "@/data/menuData";
import { useEffect } from "react";

type Props = {
    item: MenuItem | null
    isOpen: boolean
    onClose: () => void
}

export default function MenuItemModal({ item, isOpen, onClose }: Props) {
    const { cartItems, addToCart, increment, decrement } = useCart();


    // Prevents scrolling of the background page when modal is open
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

    if (!isOpen || !item) return null;

    const foundItem = cartItems.find(i => i.name === item.name);

    const quantity = foundItem ? foundItem.quantity : 0;
    const itemTotal = foundItem ? foundItem.price * foundItem.quantity : 0;

    return (
        // Backdrop
        <div
            className="fixed inset-0 backdrop-blur-xs z-40 flex justify-center items-end"
            onClick={onClose}
        >
            {/* Modal Panel */}
            <div
                className={`w-full bg-white rounded-t-2xl shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0 ' : 'translate-y-full'}`}
                style={{ maxHeight: '85vh' }}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-3 right-3 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-300 z-10">
                    ✕
                </button>

                {/* Content */}
                <div className="overflow-y-auto animate-slideUp" style={{ maxHeight: 'calc(85vh - 80px)' }}>
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
                </div>

                {/* Footer with action buttons */}
                <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200 flex items-center justify-between gap-4">
                    {quantity > 0 ? (
                        <div className='flex items-stretch w-32 rounded-lg shadow-md overflow-hidden bg-white border border-gray-300'>
                            <button
                                onClick={() => decrement(item)}
                                className='w-1/3 h-12 flex items-center justify-center text-red-500 text-2xl hover:bg-gray-100 transition-colors'
                                aria-label='Decrement item'
                            >
                                -
                            </button>
                            <span className='flex-grow text-center text-xl font-bold text-red-600 flex items-center justify-center'>
                                {quantity}
                            </span>
                            <button
                                onClick={() => increment(item)}
                                className='w-1/3 h-12 flex items-center justify-center text-red-500 text-2xl hover:bg-gray-100 transition-colors'
                                aria-label='Increment item'
                            >
                                +
                            </button>
                        </div>
                    ) : (
                        // This empty div keeps the layout consistent when there's no quantity selector
                        <div className="w-32"></div>
                    )}

                    <button
                        onClick={() => addToCart(item)}
                        className="flex-grow h-12 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition-colors text-lg"
                    >
                        Add item ₹{itemTotal}
                    </button>
                </div>
            </div>
        </div>
    );
}