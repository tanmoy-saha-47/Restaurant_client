'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

type CategoryTabsProps = {
    categories: string[];
    categoryItemCount: Record<string, number>
};

function CategoryTabs({ categories, categoryItemCount }: CategoryTabsProps) {

    const pathname = usePathname()
    const currentCategory = decodeURI(pathname.split('/').pop() || "")


    return (
        <div className='flex gap-3 px-4 py-2 bg-white border-b overflow-x-auto'>

            {categories.map((category) => (
                <Link
                    key={category}
                    href={`/menu/${encodeURIComponent(category)}`}
                    className={`px-4 py-2 rounded-full text-lg font-stretch-90% whitespace-nowrap hover:scale-110 active:scale-125 duration-200 ease-in-out ${category === currentCategory ? 'text-lg font-extrabold text-black' : 'font-medium text-gray-700 hover:text-black'
                        }`}
                >
                    {category} ({categoryItemCount[category] || 0})
                </Link>
            ))}
        </div>
    )
}

export default CategoryTabs