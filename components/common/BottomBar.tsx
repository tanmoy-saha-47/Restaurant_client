import React from "react";
import { FiSearch, FiMenu } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';


type BottomBarProps = {
    search: string
    setSearch: (value: string) => void
    onMenuClick: () => void
    onCloseClick: () => void
    isMenuOpen: boolean
    isCartVisible: boolean
}

function BottomBar({ search, setSearch, onMenuClick, onCloseClick, isMenuOpen, isCartVisible }: BottomBarProps) {
    return (
        // This container is fixed to the bottom of the screen
        <div className={`fixed left-0 right-0 p-3 z-50 transition-all duration-300 ${isCartVisible ? 'bottom-[76px]' : 'bottom-0'}`}>
            {/* This is the floating bar itself, centered with a max-width */}
            <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-2 max-w-lg mx-auto">
                <div className="flex-grow flex items-center">
                    <FiSearch className="text-gray-500 mx-3" />
                    <input
                        type="text"
                        placeholder="Search for any dish..."
                        className="bg-transparent focus:outline-none w-full text-gray-800"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {isMenuOpen ? (
                    <button
                        onClick={onCloseClick}
                        className="ml-2 bg-black text-white px-4 py-2 rounded-md flex items-center flex-shrink-0"
                    >
                        <IoClose className="mr-1.5" />
                        Close
                    </button>
                ) : (
                    <button
                        onClick={onMenuClick}
                        className="ml-2 bg-black text-white px-4 py-2 rounded-full flex items-center flex-shrink-0 "
                    >
                        <FiMenu className="mr-1.5" />
                        Menu
                    </button>
                )}

            </div>
        </div>
    );
}

export default BottomBar;