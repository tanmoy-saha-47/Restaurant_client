'use client'
import { useParams } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import { menuData } from '@/data/menuData'
import { Header, CategoryTabs, SubMenuTabs, MenuFilterBar, MenuDisplay, OfferBox, Footer } from '@/components'
import UseMenuFilters from '@/hooks/useMenuFilters'
import getCategoryCounts from '@/utils/getCategoryCounts'
import getSubMenuCounts from '@/utils/getSubMenuCounts'
import ViewBillPage from '@/app/view-bill/page'
import { useMenuData } from '@/hooks/useMenuData'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import { Span } from 'next/dist/trace'




function MenuPage() {
    const { user, logout, } = useUser()
    const { cartItems } = useCart()
    const router = useRouter()

    const params = useParams()
    const category = params.category as string

    const categoryItemCount = useMemo(() => getCategoryCounts(menuData), [menuData])
    const decodedCategory = useMemo(() => decodeURI(category || ''), [category])

    const subMenus = useMemo(() => {
        return menuData[decodedCategory] ? Object.keys(menuData[decodedCategory]) : []
    }, [decodedCategory])



    const subMenuItemCount = useMemo(() =>
        getSubMenuCounts(menuData[decodedCategory] || {})
        , [decodedCategory])

    const {
        activeTab,
        setActiveTab,
        search,
        setSearch,
        showOnlyVeg,
        setShowOnlyVeg,
        handleRefresh,
    } = UseMenuFilters(decodedCategory, subMenus, menuData)


    const { items: menuItems, loading, error } = useMenuData(
        category,
        activeTab,
        "Static"
    )
    const filteredItems = useMemo(() => {
        if (!menuItems.length) return []

        return menuItems.filter((item) => {
            const matchesSearch = item.name
                .toLowerCase()
                .includes(search.toLowerCase())
            const matchesVeg = showOnlyVeg ? item.isVeg : true
            return matchesSearch && matchesVeg
        })
    }, [menuItems, search, showOnlyVeg])


    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    if (loading) {
        return <div className='flex justify-center text-center items-center' > <AiOutlineLoading3Quarters /> Loading....</div>
    }

    if (error) {
        return <div className='flex justify-center text-center items-center'  > <RiErrorWarningLine /> Error : {error} </div>
    }

    return (
        <div className='min-h-screen bg-gray-100 relative' >
            <Header user={user} onLogout={handleLogout} />

            <OfferBox />


            {user?.tableNumber && (
                <div className='pt-2 text-center bg-yellow-200'>
                    <span className='bg-gray-500 text-white px-3 py-1 rounded font-semibold'>
                        Table No: {user.tableNumber}
                    </span>
                </div>
            )}

            <div className='bg-yellow-200'>
                <MenuFilterBar
                    search={search}
                    setSearch={setSearch}
                    showOnlyVeg={showOnlyVeg}
                    setShowOnlyVeg={setShowOnlyVeg}
                    onRefresh={handleRefresh}
                />

                <div className='flex gap-2 ml-3  '>
                    <button
                        onClick={() => router.push('/view-bill')}
                        className=' ml-5 text-lg font-medium transform   hover:underline-offset-auto hover:scale-105 transition active:scale-105 duration-200 ease-in-out mb-2'
                    >
                        View Bill {totalCount > 0 && <span className='text-zinc-500 font-bold'> ({totalCount})</span>}
                    </button>
                    <button
                        onClick={() => router.push('/orderHistory')}
                        className=' ml-5 text-lg font-medium transform  hover:underline-offset-auto hover:scale-105 transition active:scale-105 duration-200 ease-in-out mb-2'
                    >
                        Order History
                    </button>
                </div>
            </div>

            <CategoryTabs categories={Object.keys(menuData)} categoryItemCount={categoryItemCount} />

            {subMenus.length > 0 && (
                <SubMenuTabs
                    subMenus={subMenus}
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                    subMenuItemCounts={subMenuItemCount}
                />
            )}

            <MenuDisplay
                activeTab={activeTab}
                decodedCategory={decodedCategory}
                filteredItems={filteredItems}
            />
            <Footer />
        </div>
    )
}

export default MenuPage