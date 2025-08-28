'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import { MenuItem } from '@/data/menuData'
import Image from 'next/image'
import { RiArrowRightSLine } from 'react-icons/ri'
import EditItemModal from '@/components/menu/EditItemModal'
import BillSummaryModal from '@/components/cart/BillSummaryModal'
import { useUser } from '@/contexts/UserContext'

type CartItem = MenuItem & { quantity: number }

type OrderProps = {

    id: number;
    tableNumber: number | null;
    total: number;
    status: string;
    items: CartItem[];
    createdAt: string;
}

function ViewBillPage() {
    const { cartItems, increment, decrement, setItemQuantity, clearCart } = useCart()
    const user = useUser()

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter()

    const [editingItem, setEditingItem] = useState<CartItem | null>(null);
    const [isBillModalOpen, setIsBillModalOpen] = useState(false);

    const handleOpenEditModal = (item: CartItem) => {
        setEditingItem(item);
    };

    const handleCloseEditModal = () => {
        setEditingItem(null);
    };

    const handleOpenBillModal = () => setIsBillModalOpen(true);
    const handleCloseBillModal = () => setIsBillModalOpen(false);


    const itemTotal = useMemo(() =>
        cartItems.reduce((acc, item) => {
            return (acc + (item.price * item.quantity))
        }, 0), [cartItems])

    const orderDetails: OrderProps = {
        total: itemTotal,
        tableNumber: user.tableNumber,
        id: 0,
        status: '',
        items: cartItems,
        createdAt: ''
    }

    // This is the function that calls the API
    const handlePlaceOrder = async () => {
        const tableNumber = user?.tableNumber

        if (!tableNumber) {
            alert("Error: Table number not found! Please try again.")
            return
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tableNumber: tableNumber,
                    items: cartItems,

                }),
            });

            // The 'ok' property is true if the HTTP status code is 200-299
            if (!response.ok) {
                // If the server returns an error, we throw an error to be caught by the catch block
                throw new Error('Failed to place order. Please try again.');
            }

            const result = await response.json();

            //complete order object frm bckend
            const newOrderData = result.order;
            console.log('Success:', newOrderData);

            const existingOrdersRaw = localStorage.getItem("Order")
            const existingOrders = existingOrdersRaw ? JSON.parse(existingOrdersRaw) : []

            const updatedOrders = [...existingOrders, newOrderData]
            localStorage.setItem("Order", JSON.stringify(updatedOrders))


            alert('Your order has been placed successfully!');
            // Here you might want to clear the cart or redirect the user
            // e.g., setCartItems([]);
            clearCart()
            router.push('/menu/category')
            // e.g., router.push('/thank-you');

        } catch (err: any) {
            console.error(err);
            setError(err.message);
            alert(err.message); // Show error to the user
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 font-sans'>
            <div className='max-w-auto mx-auto bg-white'>
                <header className="p-3 flex justify-between items-center shadow-sm">
                    <h1 className="text-xl font-bold text-gray-800">Groot</h1>
                </header>
            </div>

            <main className='bg-gray-100 p-2'>
                {cartItems.length === 0 ? (
                    <div className='text-center py-20 px-4 bg-white rounded-lg'>
                        <h2 className="mt-4 text-xl font-semibold text-gray-700">Your cart is empty</h2>
                        <p className="mt-2 text-sm text-gray-500">Looks like you haven't added anything to your cart yet.</p>
                        <button
                            onClick={() => router.push('/menu/category')}
                            className='mt-6 bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600'
                        >
                            Browse Menu
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="bg-white rounded-lg p-3 flex justify-between items-center mb-2 shadow-sm">
                            <div>
                                <p className="font-bold text-sm">Get Gold for 3 months</p>
                                <p className="text-xs text-gray-500">Special Offers & more benefits</p>
                            </div>
                            <button className="text-red-500 font-bold border border-red-400 bg-red-50 text-xs py-2 px-5 rounded-lg">
                                <span className='line-through text-gray-500 mr-1'>₹99</span> ADD
                            </button>
                        </div>

                        <div className='bg-white rounded-lg mb-2 p-4 shadow-sm'>
                            {cartItems.map((item) => (
                                <div key={item.name} className='flex justify-between items-start py-4 border-b border-gray-100'>
                                    <div>
                                        <p className='font-semibold text-gray-800'>{item.name}</p>
                                        <p
                                            onClick={() => handleOpenEditModal(item)}
                                            className='text-sm text-red-500 cursor-pointer mt-3'>Edit</p>
                                    </div>


                                    <div className="flex flex-col items-end">
                                        <div className="flex items-center border border-gray-200 rounded-lg text-red-500 font-bold">

                                            <button onClick={() => decrement(item)} className="px-2 py-1">-</button>

                                            <span className="px-3 text-sm">{item.quantity}</span>

                                            <button onClick={() => increment(item)} className="px-2 py-1">+</button>
                                        </div>

                                        <p className="mt-1 font-semibold text-gray-800 ">₹{(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="text-red-500 font-semibold py-3 text-sm cursor-pointer" onClick={() => router.push('/menu/category')}>
                                + Add more items
                            </div>

                        </div>
                        <div
                            className="bg-white rounded-lg mb-2 p-3 flex justify-between items-center shadow-sm"
                            onClick={handleOpenBillModal}
                        >
                            <div>
                                <h3 className="font-bold text-gray-800">Total Bill</h3>
                                <p className="text-xs text-gray-500">Incl. taxes and charges</p>
                            </div>
                            <div className="flex items-center">
                                <p className="font-bold mr-1">₹{orderDetails.total.toFixed(2)}</p>
                                <RiArrowRightSLine size={24} className="text-gray-500" />
                            </div>
                        </div>
                    </>
                )}
            </main>

            {cartItems.length > 0 && (
                <footer className='sticky bottom-0 bg-white p-3 border-t border-gray-200'>
                    <button
                        onClick={handlePlaceOrder} disabled={isLoading}
                        className='w-full bg-red-600 text-white font-bold py-3 rounded-lg text-lg hover:bg-red-700'
                    >
                        {isLoading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </footer>
            )}
            {editingItem && (
                <EditItemModal
                    item={editingItem}
                    onClose={handleCloseEditModal}
                    onUpdate={setItemQuantity}
                />
            )}
            <BillSummaryModal
                isOpen={isBillModalOpen}
                onClose={handleCloseBillModal}
                details={orderDetails}
            />

        </div>
    )
}

export default ViewBillPage