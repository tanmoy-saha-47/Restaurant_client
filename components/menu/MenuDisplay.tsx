import React from 'react'
import MenuItemCard from './MenuItemCard'
import { MenuItem } from '@/data/menuData'

type MenuDisplayProps = {
    activeTab: string
    decodedCategory: string
    filteredItems: MenuItem[]
}

function MenuDisplay({ activeTab, decodedCategory, filteredItems }: MenuDisplayProps) {
    return (
        <div className='p-4'>
            <h2 className="text-xl font-bold font-stretch-50% mb-4 uppercase">{activeTab} {decodedCategory} </h2>

            {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                    <MenuItemCard
                        key={index}
                        item={item}
                    />
                ))
            ) : (
                <p className='text-center text-gray-500'>
                    No items match your search.
                </p>
            )}

        </div>
    )
}

export default MenuDisplay