import React, { useMemo, useState } from 'react'
import { menuData as initialMenuData, MenuItem } from '@/data/menuData'
import Image from 'next/image';
import { Switch } from '../ui/switch';
import { MdEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";



type FlatMenuItem = MenuItem & {
    id: string; // Unique ID for React keys (e.g., "Food-Recommended-Butter Garlic Naan")
    mainCategory: string;
    subCategory: string;
};

function MenuManagementPage({ onAddItem, onEditItem }: { onAddItem: () => void, onEditItem: (item: FlatMenuItem) => void }) {

    const [menuData, setMenuData] = useState(initialMenuData)

    const flatMenuItems: FlatMenuItem[] = useMemo(() => {
        const items: FlatMenuItem[] = []
        for (const mainCategory in menuData) {
            for (const subCategory in menuData[mainCategory]) {
                menuData[mainCategory][subCategory].forEach(item => {
                    items.push({
                        ...item,
                        id: `${mainCategory}-${subCategory}-${item.name}`,
                        mainCategory,
                        subCategory
                    })
                })
            }
        }
        return items
    }, [menuData])

    const handleDelete = (itemToDelete: FlatMenuItem) => {
        if (confirm(`Are you sure you want to delete "${itemToDelete.name}"?`)) {
            console.log('Deleting:', itemToDelete)
            alert(`"${itemToDelete.name}" has been deleted.`)
        }
    }

    const handleToggle = (name: string) => {
        setMenuData(prevMenuData => {
            const newMenuData: Record<string, Record<string, MenuItem[]>> = {}

            for (const mainCategory in prevMenuData) {
                newMenuData[mainCategory] = {}
                for (const subCategory in prevMenuData[mainCategory]) {
                    newMenuData[mainCategory][subCategory] = prevMenuData[mainCategory][subCategory].map(item =>
                        item.name === name ? { ...item, available: !item.available } : item
                    )
                }
            }
            return newMenuData
        })
        //api call to update db here!
    }


    return (
        <div>
            <div className='flex justify-between items-center mb-6'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-800'>Menu Management</h1>
                    <p className='text-sm text-gray-500'>Home &gt; Menu</p>
                </div>
                <button onClick={onAddItem} className='inline-block border px-3 py-3 transition-colors bg-blue-500 text-white hover:bg-blue-800 hover:text-gray-300'>
                    Add New Item
                </button>
            </div>
            <div className='bg-white shadow-md rounded-lg overflow-hidden'>
                <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                        {flatMenuItems.map(item => (
                            <tr key={item.id} className='hover:bg-gray-100'>
                                <td className="border px-6 py-4">
                                    <Image src={item.imageUrl || '/offer.jpg'} alt={item.name} width={64} height={50} className='rounded object-cover' />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 align-middle">
                                    <div className="flex flex-col space-y-2">
                                        {/* --- HEADING: NAME & VEG/NON-VEG --- */}
                                        <div className="flex items-center">
                                            <div className="text-xl font-semibold tracking-wide">{item.name}</div>
                                            <span
                                                className={`rounded-full h-3 w-3 ml-3 inline-block ${item.isVeg ? "bg-green-500" : "bg-red-500"
                                                    }`}
                                            />
                                        </div>

                                        {/* --- METADATA: CATEGORY & DESCRIPTION --- */}
                                        <div className="text-muted-foreground">
                                            {/* Category and Sub-Category */}
                                            <div className="flex items-center gap-5 text-sm font-medium mb-2">
                                                <span>• Category: {item.mainCategory}</span>
                                                <span>• Sub-Category: {item.subCategory}</span>
                                            </div>

                                            {/* Description with Hover Tooltip */}
                                            <div className="max-w-xs relative group">
                                                <p className="truncate">{item.description}</p>
                                                <div
                                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max  bg-gray-800 text-white text-sm p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
                                                >
                                                    {item.description}
                                                </div>
                                            </div>
                                        </div>

                                        {/* --- STATUS: AVAILABILITY (MOVED OUTSIDE THE GROUP) --- */}
                                        {!item.available && (
                                            <div className="text-sm font-medium text-red-600 pt-1">
                                                Currently Unavailable
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap font-medium  align-middle'>
                                    <div className='text-md font-semibold tracking-wider' >
                                        ₹{item.price.toFixed(2)}
                                    </div>
                                </td>
                                <td className='px-6 py-4 whitespace-nowrap font-medium  align-middle'>
                                    <div className='flex flex-col items-center gap-2'>
                                        <div>
                                            <Switch checked={item.available} onCheckedChange={() => handleToggle(item.name)} />
                                        </div>
                                        <div className='flex items-center gap-6'>
                                            <MdEditNote size={30} onClick={() => onEditItem(item)} className="cursor-pointer text-blue-500 hover:text-blue-800" />
                                            <MdDelete size={30} onClick={() => handleDelete(item)} className="cursor-pointer text-red-500 hover:text-red-800" />
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    )
}

export default MenuManagementPage