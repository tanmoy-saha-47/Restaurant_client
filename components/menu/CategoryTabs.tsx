'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

type CategoryTabsProps = {
    categories: string[];
};

function CategoryTabs({ categories }: CategoryTabsProps) {

    const pathname = usePathname()
    const currentCategory = decodeURI(pathname.split('/').pop() || "")


    return (
        <div className='flex gap-3 px-4 py-2 bg-white border-b overflow-x-auto'>

            {categories.map((category) => (
                <Link
                    key={category}
                    href={`/menu/${encodeURIComponent(category)}`}
                    className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${category === currentCategory ? 'bg-blue-500 ' : 'bg-gray-200'
                        }`}
                >
                    {category}
                </Link>
            ))}
        </div>
    )
}

export default CategoryTabs