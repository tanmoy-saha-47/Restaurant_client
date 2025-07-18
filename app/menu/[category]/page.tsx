'use client'
import React, { useState, useEffect, use } from 'react'
import { menuData, MenuItem } from '@/data/menuData'
import MenuItemCard from '@/components/MenuItemCard'
import CategoryTabs from '@/components/CategoryTabs'
import SubMenuTabs from '@/components/SubMenuTabs'
import Image from 'next/image'

type PageProps = {
    params: Promise<{
        category: string

    }>
}

function MenuPage({ params }: PageProps) {
    const { category } = use(params)
    console.log("cateogory:", category);

    const decodedCategory = decodeURI(category || '')
    console.log("decoded.category:", decodedCategory)

    const subMenus = menuData[decodedCategory] ? Object.keys(menuData[decodedCategory]) : []
    console.log("submenus:", subMenus)

    const [activeTab, setActiveTab] = useState(subMenus[0] || "")
    const [search, setSearch] = useState("")
    const [showOnlyVeg, setShowOnlyVeg] = useState(false)

    useEffect(() => {
        if (subMenus.length > 0 && (!subMenus.includes(activeTab) || activeTab === "")) {
            setActiveTab(subMenus[0])
        }

        if (subMenus.length === 0 && activeTab !== "") {
            setActiveTab('')
        }
    }, [decodedCategory, subMenus])


    const allItems: MenuItem[] = (menuData[decodedCategory]?.[activeTab] || []) as MenuItem[]


    const filteredItems = allItems.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase())
        const matchesVeg = showOnlyVeg ? item.isVeg : true
        return matchesSearch && matchesVeg;
    })


    const handleRefresh = () => {
        setSearch("")
        setShowOnlyVeg(false)
        setActiveTab(subMenus[0] || "")
    }


    return (
        <div className='min-h-screen bg-gray-100'>
            <div className='bg-white shadow p-4 text-xl font-bold items-center'>
                Welcome to Groot
            </div>


            <div className='relative w-full h-auto mt-4 px-4'>
                <div className='relative w-full aspect-[16/9] md:aspect-[4/1] overflow-hidden rounded-lg shadow-md'>
                    <Image
                        src='/login.jpg'
                        alt='Image'
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        priority
                        className='object-cover object-center'
                    />
                </div>
            </div>


            <div className='p-1 text-center text-gray-600 font-semibold'>Table No : 1 </div>


            <div className='flex flex-col md:flex-row items-center p-4 gap-3'>
                <div className='flex items-center gap-3 w-full md:w-auto'>
                    <input
                        type="text"
                        placeholder='Start typing to search'
                        className='flex-grow px-4 py-2 border border-gray-300 rounded'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <label className='flex items-center gap-2 cursor-pointer'>
                        <input
                            type="checkbox"
                            checked={showOnlyVeg}
                            onChange={() => setShowOnlyVeg(!showOnlyVeg)}
                            className='sr-only peer'
                        />
                        <div className='w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative transition-all'>
                            <div className='absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5'></div>
                        </div>
                        <span className='text-sm font-medium'> Veg Only</span>
                    </label>

                    <button
                        onClick={handleRefresh}
                        className='p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none'
                        aria-label='Refresh'
                    >
                        &#x21BB;
                    </button>

                </div>
            </div>

            <CategoryTabs categories={Object.keys(menuData)} />

            {subMenus.length > 0 && (
                <SubMenuTabs subMenus={subMenus} setActiveTab={setActiveTab} activeTab={activeTab} />

            )}

            <div className='p-4'>
                <h2 className="text-xl font-bold mb-4 uppercase">{activeTab} {decodedCategory} </h2>

                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        <MenuItemCard key={index} item={item} />
                    ))
                ) : (
                    <p className='text-center text-gray-500'>
                        No items match your search.
                    </p>
                )}

            </div>
        </div>
    )
}

export default MenuPage