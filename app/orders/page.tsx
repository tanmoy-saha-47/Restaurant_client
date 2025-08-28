'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
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



function OrdersPage() {
    const [orders, setOrders] = useState<OrderProps[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedOrder = localStorage.getItem("Order");
        console.log(savedOrder);

        if (savedOrder) {
            setOrders(JSON.parse(savedOrder));
        }
        setLoading(false)
    }, []);
    // useEffect(() => {

    //     // async function fetchOrder() {
    //     //     try {
    //     //         const res = await fetch("/api/orders")
    //     //         const data: Order[] = await res.json()
    //     //         setOrders(data)

    //     //     } catch (err) {
    //     //         console.error("Error fetching orders:", err);

    //     //     } finally {
    //     //         setLoading(false)
    //     //     }
    //     // }
    //     // fetchOrder()
    // }, [])

    if (loading) return <p> Loading orders. . .</p>
    if (orders.length === 0) return <p>No orders found</p>
    return (
        <div className='p-4'>
            <h1 className='text-xl font-bold mb-4'>My Orders</h1>
            <ul className='space-y-3'>
                {orders.map((order) => (
                    <li
                        key={order.id}
                        className='border p-4 rounded-lg shadow-sm flex justify-between items-center'
                    >
                        <div>
                            <p className='font-medium'>Order #{order.id}</p>
                            <p className='text-md font-medium'>
                                {order.items.map((item) => item.name).join(', ')}
                            </p>
                            <p className='text-sm text-gray-700'>
                                Table {order.tableNumber} • {order.status}
                            </p>
                            <p className='text-sm text-gray-600'>
                                {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>
                        <div className='text-right'>
                            <p className='font-bold'>₹{order.total}</p>
                            <Link
                                href={`/orders/${order.id}`}
                                className='text-blue-500 underline text-sm'
                            >
                                View More
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OrdersPage