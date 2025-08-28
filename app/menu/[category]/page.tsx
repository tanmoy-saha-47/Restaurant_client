'use client'
import { useParams } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { menuData, MenuItem } from '@/data/menuData'
import Header from '@/components/layouts/Header'
import BottomBar from '@/components/common/BottomBar'
import CategoryDrawer from '@/components/menu/CategoryDrawer'
import MenuDisplay from '@/components/menu/MenuDisplay'
import CartSummaryBar from '@/components/layouts/CartSummaryBar'
import MenuItemModal from '@/components/menu/MenuItemModal'
import { useMenuData } from '@/hooks/useMenuData'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";


function MenuPage() {
    const { user, logout, } = useUser()
    const { cartItems } = useCart()
    const router = useRouter()
    const params = useParams()
    const category = params.category as string

    const [search, setSearch] = useState('')
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleSelectItem = (item: MenuItem | null) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Delay clearing item to allow for closing animation
        setTimeout(() => setSelectedItem(null), 300);
    };


    const categoryItemCount = useMemo(() => {
        const counts: Record<string, number> = {}
        for (const category in menuData) {
            let total = 0
            const subMenus = menuData[category]
            for (const subMenu in subMenus) {
                total += subMenus[subMenu].length
            }
            counts[category] = total
        }
        return counts
    }, [])

    const decodedCategory = useMemo(() => decodeURI(category || ''), [category])

    const { items: menuItems, loading, error } = useMenuData(
        category,
        // activeTab,
        "api"
    )

    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0)

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    const handleCategoryClick = (category: string) => {
        const element = document.getElementById(category.replace(/\s+/g, '-').toLowerCase())
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    if (loading) {
        return <div className='flex justify-center text-center items-center' >
            <AiOutlineLoading3Quarters /> Loading....
        </div>
    }

    if (error) {
        return <div className='flex justify-center text-center items-center'  >
            <RiErrorWarningLine /> Error : {error}
        </div>
    }

    return (
        <div className='min-h-screen bg-gray-50 relative pb-28' >
            <Header user={user} onLogout={handleLogout} decodedCategory={decodedCategory} />



            {user?.tableNumber && (
                <div className='pt-2 text-center '>
                    <span className='bg-gray-200 text-black px-3 py-1 rounded font-semibold'>
                        Table No: {user.tableNumber}
                    </span>
                </div>
            )}

            <div className="flex gap-4 px-4 py-2 mt-3 -mb-6">
                <button onClick={() => router.push('/view-bill')} className="text-md font-md hover:underline">
                    View Bill {totalCount > 0 && <span className='text-gray-500 font-light'>({totalCount})</span>}
                </button>
                <button onClick={() => router.push('/orders')} className="text-md font-md hover:underline">
                    Order History
                </button>
            </div>

            <MenuDisplay
                menuData={menuData}
                search={search}
                onSelectItem={handleSelectItem}
            />
            {!isModalOpen &&
                <BottomBar
                    search={search}
                    setSearch={setSearch}
                    onMenuClick={() => setIsDrawerOpen(true)}
                    onCloseClick={() => setIsDrawerOpen(false)}
                    isMenuOpen={isDrawerOpen}
                    isCartVisible={totalCount > 0}
                />}


            <CategoryDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                categories={categoryItemCount}
                onCategoryClick={handleCategoryClick}

            />

            {totalCount > 0 && (
                <CartSummaryBar
                    totalItems={totalCount}
                    totalPrice={totalPrice}
                    onClick={() => router.push('/view-bill')}
                />
            )}
            <MenuItemModal
                item={selectedItem}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>

    )
}

export default MenuPage