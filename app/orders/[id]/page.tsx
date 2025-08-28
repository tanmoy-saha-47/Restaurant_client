"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

export default function OrderDetailsPage() {
    const { id } = useParams(); // get orderId from URL
    const [order, setOrder] = useState<OrderProps | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrder() {
            try {
                const localOrders = localStorage.getItem("Order")
                if (localOrders) {
                    const parsedOrders: OrderProps[] = JSON.parse(localOrders)
                    const localOrder = parsedOrders.find(
                        (ord) => ord.id.toString() === id?.toString()
                    )
                    if (localOrder) {
                        setOrder(localOrder)
                        setLoading(false)
                        return;
                    }
                }
                //if not in localstorage fetch from server
                if (id) {
                    const res = await fetch(`/api/orders/${id}`);
                    const data: OrderProps = await res.json();
                    setOrder(data);
                }
            } catch (err) {
                console.error("Error fetching order:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchOrder();
    }, [id]);

    if (loading) return <p>Loading order...</p>;
    if (!order) return <p>Order not found</p>;

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-2">Order #{order.id}</h1>
            <p className="text-gray-600 mb-4">
                Table {order.tableNumber} • {order.status}
            </p>

            <ul className="space-y-2 mb-4">
                {order.items.map((item) => (
                    <li
                        key={item.name}
                        className="flex justify-between border-b pb-1 text-sm"
                    >
                        <span>
                            {item.name} × {item.quantity}
                        </span>
                        <span>₹{item.price * item.quantity}</span>
                    </li>
                ))}
            </ul>

            <div className="text-right font-bold text-lg">
                Total: ₹{order.total}
            </div>

            <p className="text-xs text-gray-500 mt-2">
                Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
        </div>
    );
}
