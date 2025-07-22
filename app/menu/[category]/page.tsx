'use client'
import { useParams } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import { menuData } from '@/data/menuData'
import { Header, CategoryTabs, SubMenuTabs, MenuFilterBar, MenuDisplay, OfferBox } from '@/components'
import UseMenuFilters from '@/hooks/useMenuFilters'
import getCategoryCounts from '@/utils/getCategoryCounts'
import getSubMenuCounts from '@/utils/getSubMenuCounts'
import { useMenuData } from '@/hooks/useMenuData'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";




function MenuPage() {
    const { user, logout } = useUser()
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
                <p className='mt-2 text-black bg-gray-500 p-1 text-center  font-semibold'>
                    🪑Table Number : {user.tableNumber}
                </p>
            )}


            <MenuFilterBar
                search={search}
                setSearch={setSearch}
                showOnlyVeg={showOnlyVeg}
                setShowOnlyVeg={setShowOnlyVeg}
                onRefresh={handleRefresh}
            />

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
        </div>
    )
}

export default MenuPage