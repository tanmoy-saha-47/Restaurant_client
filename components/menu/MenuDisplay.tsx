import React, { useState } from 'react'
import MenuItemCard from '@/components/menu/MenuItemCard'
import { MenuItem, } from '@/data/menuData'

type MenuDisplayProps = {
    menuData: Record<string, Record<string, MenuItem[]>>;
    search: string
    onSelectItem: (item: MenuItem | null) => void
}

function MenuDisplay({ menuData, search, onSelectItem }: MenuDisplayProps) {
    return (
        <div className='p-4 pb-24'>
            {Object.entries(menuData).map(([category, subMenus]) => {
                const categoryId = category.replace(/\s+/g, '-').toLowerCase();

                const visibleSubMenus = Object.entries(subMenus)
                    .map(([subMenu, items]) => {
                        const visibleItems = items
                            .filter(item => item.available)
                            .filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
                        return { subMenu, visibleItems }
                    })
                    .filter(sm => sm.visibleItems.length > 0)

                if (visibleSubMenus.length === 0) {
                    return null
                }

                return (
                    <div key={category} id={categoryId}>
                        <h2 className='text-2xl font-bold mt-6 mb-4'> {category} </h2>

                        {visibleSubMenus.map(({ subMenu, visibleItems }) => (
                            <div key={subMenu}>
                                <h3 className='text-xl font-semibold my-3'> {subMenu} </h3>
                                {visibleItems.map((item) => (
                                    <MenuItemCard
                                        key={item.name}
                                        item={item}
                                        onSelect={onSelectItem}
                                    />
                                ))}
                            </div>
                        ))}




                    </div>
                )
            })}
        </div>
    )
}

export default MenuDisplay