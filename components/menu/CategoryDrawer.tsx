import React from "react";

const BOTTOM_BAR_HEIGHT = '76px'
const TOP_BAR_HEIGHT = '100px'

type CategoryDrawerProps = {
    isOpen: boolean
    categories: Record<string, number>
    onClose: () => void
    onCategoryClick: (category: string) => void
}

function CategoryDrawer({ isOpen, onClose, categories, onCategoryClick }: CategoryDrawerProps) {
    return (
        // Main container for the overlay, which provides the dimming effect
        <div
            className={`fixed inset-0 z-40 transition-colors duration-300 ${isOpen ? 'bg-opacity-40' : 'bg-transparent pointer-events-none'
                }`}
            onClick={onClose}
        >
            {/* The drawer panel itself */}
            <div
                className={`absolute  right-0 bg-white rounded-t-2xl shadow-2xl p-4 transition-transform duration-300 ease-in-out w-80 max-w-[80vw] flex flex-col ${isOpen ? 'transform translate-x-0' : 'transform translate-x-full'
                    }`}
                style={{
                    top: TOP_BAR_HEIGHT,
                    height: `calc(100% - ${BOTTOM_BAR_HEIGHT})`
                }} // Prevents the drawer from covering the whole screen
                onClick={(e) => e.stopPropagation()} // Prevents closing the drawer when clicking inside it
            >
                {/* Handle for visual cue */}
                <div className="w-16 h-1.5 bg-gray-300 rounded-full mx-auto mb-4 flex-shrink-0"></div>

                <h2 className="text-xl font-bold mb-4">All Categories</h2>

                {/* Scrollable list of categories */}
                <ul className="overflow-y-auto"  >
                    {Object.entries(categories).map(([category, count]) => (
                        <li
                            key={category}
                            className="flex justify-between items-center py-3.5 border-b border-gray-100"
                        >
                            <button
                                onClick={() => {
                                    onCategoryClick(category);
                                    onClose();
                                }}
                                className="w-full text-left text-base text-gray-800 hover:text-red-500"
                            >
                                {category}
                            </button>
                            <span className="text-gray-500 font-medium">{count}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CategoryDrawer;