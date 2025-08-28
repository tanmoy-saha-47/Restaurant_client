'use client'
import React, { useState, } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { FcSalesPerformance } from "react-icons/fc";
import { menuData as initialMenuData, MenuItem } from "@/data/menuData";
import AddItemPage from '../pages/AddItemPage'
import EditMenuItemPage from "../pages/EditMenuItemPage";
import MenuManagementPage from "../pages/MenuManagementPage";
import SalesPage from "../pages/SalesPage";


type FlatMenuItem = MenuItem & {
    id: string; // Unique ID for React keys (e.g., "Food-Recommended-Butter Garlic Naan")
    mainCategory: string;
    subCategory: string;
};

export default function AdminLayout() {
    type Page = 'home' | 'menu' | 'settings' | 'editItem' | 'addItem' | 'sales'
    const [cureentPage, setCurrentPage] = useState<Page>('menu')
    const [currentItem, setCurrentItem] = useState<FlatMenuItem | null>(null)

    const handleEditItem = (item: FlatMenuItem) => {
        setCurrentItem(item)
        setCurrentPage('editItem')
    }

    const handleSaveItem = (updatedItem: FlatMenuItem) => {
        console.log('Saving item:', updatedItem)
        alert(`Item "${updatedItem.name}" saved!`)
        setCurrentPage('menu')
        setCurrentItem(null)
    }

    const handleAddItem = (newItem: Omit<FlatMenuItem, "id">) => {
        const itemWithId: FlatMenuItem = {
            ...newItem,
            id: `${newItem.mainCategory}-${newItem.subCategory}-${newItem.name}`,
        };
        // Save itemWithId to your data/store here
        alert(`Item "${itemWithId.name}" added!`);
        setCurrentPage('menu');
        setCurrentItem(null);
    };

    const renderContent = () => {
        switch (cureentPage) {
            case 'home':
                return <div>
                    <h1 className="text-3xl font-bold">Home</h1>
                </div>
            case 'menu':
                return <MenuManagementPage onAddItem={() => setCurrentPage('addItem')} onEditItem={handleEditItem} />
            case "settings":
                return <div>
                    <h1 className="text-3xl font-bold">Settings</h1>
                </div>
            case 'sales':
                return <SalesPage onBack={() => setCurrentPage('menu')} />
            case 'editItem':
                if (currentItem) {
                    return <EditMenuItemPage item={currentItem} onBack={() => setCurrentPage('menu')} onSave={handleSaveItem} />
                }
                return null
            case "addItem":
                return <AddItemPage onBack={() => setCurrentPage('menu')} onSave={handleAddItem} />
            default:
                return <div>Page not found</div>
        }
    }

    const NavLink = ({ icon: Icon, label, page }: { icon: React.ElementType, label: string, page: Page }) => (
        <button
            onClick={() => setCurrentPage(page)}
            className={`flex items-center w-full text-left px-4 py-2.5 rounded-lg transition-colors ${cureentPage === page ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
        >
            <Icon className="w-5 h-5 mr-3" />
            <span className="font-medium"> {label} </span>
        </button>
    )

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <aside className="w-64 bg-gray-800 text-white flex flex-col">
                <div className="px-6 py-4">
                    <h2 className="text-2xl font-bold"> Dashboard </h2>
                </div>
                <nav className="flex-1 px-4 py-2 space-y-2">
                    <NavLink icon={FaHome} label="Home" page="home" />
                    <NavLink icon={MdOutlineRestaurantMenu} label="Menu" page="menu" />
                    <NavLink icon={FcSalesPerformance} label="Sales" page="sales" />
                    <NavLink icon={IoIosSettings} label="Settings" page="settings" />
                </nav>
            </aside>
            <main className="flex-1 p-10 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    )
}