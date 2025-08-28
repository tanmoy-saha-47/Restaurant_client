import React, { useState } from 'react'
import { menuData as initialMenuData, MenuItem } from '@/data/menuData'
import { Switch } from '../ui/switch';

type FlatMenuItem = MenuItem & {
    id: string; // Unique ID  (e.g., "Food-Recommended-Butter Garlic Naan")
    mainCategory: string;
    subCategory: string;
};

function AddItemPage({ onBack, onSave }: { onBack: () => void, onSave: (newItem: Omit<FlatMenuItem, 'id'>) => void }) {
    const mainCategories = Object.keys(initialMenuData);
    const [mainCategory, setMainCategory] = useState(mainCategories[0])
    const subCategories = Object.keys(initialMenuData[mainCategory])

    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        isVeg: true,
        available: true,
        description: '',
        imageUrl: '',
        mainCategory: mainCategories[0],
        subCategory: subCategories[0],
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleMainCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMainCategory = e.target.value
        const newSubCategory = Object.keys(initialMenuData[newMainCategory])[0]
        setMainCategory(newMainCategory)
        setFormData(prev => ({
            ...prev,
            mainCategory: newMainCategory,
            subCategory: newSubCategory,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newItem = {
            ...formData,
            price: parseFloat(String(formData.price))
        }
        onSave(newItem)
    }

    return (
        <div>
            <button onClick={onBack} >
                Back to  Menu
            </button>
            <h1 className='text-3xl font-bold text-gray-800 mb-6'>Add New Menu Item</h1>
            <div className='bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto'>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                        <input name='name' type="text" value={formData.name} onChange={handleChange} placeholder='e.g., Paneer masala' required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                        <input name='description' type="text" value={formData.description} onChange={handleChange} placeholder='A short description'
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Image URL</label>
                        <input name='imageUrl' value={formData.imageUrl} onChange={handleChange} placeholder='e.g., /images/paneer.jpg'
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Category</label>
                            <select name="mainCategory" value={formData.mainCategory} onChange={handleMainCategoryChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                {mainCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-1'>Sub-Category</label>
                            <select name="subCategory" value={formData.subCategory} onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                {subCategories.map(subCat => <option key={subCat} value={subCat}> {subCat}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input name='price' type="number" step="0.01" value={formData.price} onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Veg/Non-Veg</label>
                            <select name="isVeg" value={String(formData.isVeg)} onChange={(e) => setFormData(prev => ({ ...prev, isVeg: e.target.value === 'true' }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="true">Veg</option>
                                <option value="false">Non-Veg</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Available</label>
                        <Switch checked={formData.available} onChange={(checked) => setFormData(prev => ({ ...prev, available: !prev.available }))} />
                    </div>
                    <div className='text-right'>
                        <button type='submit' className='bg-blue-600 text-white hover:bg-gray-800 hover:text-white px-3 py-1'> Add Item </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddItemPage