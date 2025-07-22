'use client'
import React, { useState, createContext, useContext, ReactNode } from 'react'
import { MenuItem } from '@/data/menuData'

type CartItem = MenuItem & {
    quantity: number
}

type CartContexttype = {
    cartItems: CartItem[]
    addToCart: (item: MenuItem) => void
    removeFromCart: (item: MenuItem) => void
    increment: (item: MenuItem) => void
    decrement: (item: MenuItem) => void
    clearCart: () => void
}

const CartContext = createContext<CartContexttype | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])

    const addToCart = (item: MenuItem) => {
        setCartItems(prev => {
            const found = prev.find(i => i.name === item.name)
            if (found) {
                return prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i)
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (item: MenuItem) => {
        setCartItems(prev => prev.filter(i => i.name === item.name))
    }

    const increment = (item: MenuItem) => {
        setCartItems(prev =>
            prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i)
        )
    }

    const decrement = (item: MenuItem) => {
        setCartItems(prev =>
            prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity - 1 } : i)
                .filter(i => i.quantity > 0)
        )
    }

    const clearCart = () => {
        setCartItems([])
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increment, decrement, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error(`UseCart must be used inside provider`)
    return context
}

