'use client'
import React, { useState, useEffect, use } from 'react'
import { menuData, MenuItem } from '@/data/menuData'
import { Header, CategoryTabs, SubMenuTabs, MenuFilterBar, MenuDisplay, OfferBox } from '@/components'
import Image from 'next/image'
import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import { CgLogOut } from 'react-icons/cg';
import UseMenuFilters from '@/hooks/useMenuFilters'

type PageProps = {
    params: Promise<{
        category: string
    }>
}

function MenuPage({ params }: PageProps) {
    const { user, logout } = useUser()
    const router = useRouter()
    const { category } = use(params)

    const decodedCategory = decodeURI(category || '')
    const subMenus = menuData[decodedCategory] ? Object.keys(menuData[decodedCategory]) : []

    const {
        activeTab,
        setActiveTab,
        search,
        setSearch,
        showOnlyVeg,
        setShowOnlyVeg,
        handleRefresh,
        filteredItems
    } = UseMenuFilters(decodedCategory, subMenus, menuData)

    const handleLogout = () => {
        logout()
        router.push('/login')
    }

    useEffect(() => {
        if (subMenus.length > 0 && (!subMenus.includes(activeTab) || activeTab === "")) {
            setActiveTab(subMenus[0]);
        }
        if (subMenus.length === 0 && activeTab !== "") {
            setActiveTab('');
        }
    }, [decodedCategory, subMenus, activeTab, setActiveTab]);


    return (
        <div className='min-h-screen bg-gray-100 relative' >
            <Header user={user} onLogout={handleLogout} />

            <OfferBox />


            <div className='p-1 text-center text-gray-600 font-semibold'>
                {user?.tableNumber && (
                    <p className='mt-2 text-gray-400'>
                        🪑Table Number : {user.tableNumber}
                    </p>
                )}
            </div>
            <MenuFilterBar
                search={search}
                setSearch={setSearch}
                showOnlyVeg={showOnlyVeg}
                setShowOnlyVeg={setShowOnlyVeg}
                onRefresh={handleRefresh}
            />

            <CategoryTabs categories={Object.keys(menuData)} />

            {subMenus.length > 0 && (
                <SubMenuTabs
                    subMenus={subMenus}
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
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