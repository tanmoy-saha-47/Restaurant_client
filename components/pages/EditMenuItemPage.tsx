import React, { useMemo, useState } from 'react'
import { menuData as initialMenuData, MenuItem } from '@/data/menuData'

type FlatMenuItem = MenuItem & {
    id: string; // Unique ID  (e.g., "Food-Recommended-Butter Garlic Naan")
    mainCategory: string;
    subCategory: string;
};

type EditMenuItemPageProps = {
    item: FlatMenuItem
    onBack: () => void
    onSave: (item: FlatMenuItem) => void
}

function EditMenuItemPage({ item, onBack, onSave }: EditMenuItemPageProps) {
    const [formData, setFormData] = useState<FlatMenuItem>(item);

    const mainCategories = Object.keys(initialMenuData)
    const subCategories = formData.mainCategory ? Object.keys(initialMenuData[formData.mainCategory]) : []

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }))
    }

    const handleMainCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newMainCategory = e.target.value
        const newSubCategory = Object.keys(initialMenuData[newMainCategory])[0]; //default to first sub ctegory
        setFormData(prev => ({
            ...prev,
            mainCategory: newMainCategory,
            subCategory: newSubCategory,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <div>
            <button
                onClick={onBack}
                className='flex items-center  text-gray-600 hover:text-gray-900 mb-6'
            >
                Back to Menu
            </button>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>Edit: {item.name}</h1>
            <div className='bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto'>
                <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                    <div className='md:col-span-1'>
                        <img src={formData.imageUrl} alt={formData.name} className='w-full h-auto object-cover rounded-lg shadow-sm' onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/CCCCCC/FFFFFF?text=No+Image'; }} />
                    </div>
                    <div className='md:col-span-2 space-y-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                            <input name='name' type="text" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                            <input name='description' type="text" value={formData.description || ''} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
                                <select name="mainCategory" value={formData.mainCategory} onChange={handleMainCategoryChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    {mainCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Sub-Category</label>
                                <select name="subCategory" value={formData.subCategory} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    {subCategories.map(subCat => <option key={subCat} value={subCat}> {subCat} </option>)}
                                </select>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Price</label>
                                <input name='price' type="number" step='0.01' value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>Veg/Non-Veg</label>
                                <select name='isVeg' value={String(formData.isVeg)} onChange={(e) => setFormData(prev => ({ ...prev, isVeg: e.target.value === 'true' }))} className='"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"'>
                                    <option value="true">Veg</option>
                                    <option value="false"> Non-Veg</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex items-center justify-between'>
                            <label className='block text-sm font-medium text-gray-700'>Available</label>
                            <input type="checkbox" checked={formData.available} onChange={e => setFormData(prev => ({ ...prev, available: e.target.checked }))}
                            />
                        </div>
                        <div className='text-right'>
                            <button type='submit' className='bg-blue-500 text-white px-3 py-2 hover:bg-gray-600 hover:text-white'> Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditMenuItemPage