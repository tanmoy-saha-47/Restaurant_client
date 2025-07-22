import React from 'react'

type SubMenuTabsProps = {
    subMenus: string[],
    activeTab: string,
    setActiveTab: (tab: string) => void;
    subMenuItemCounts: Record<string, number>
};

function SubMenuTabs({
    subMenus,
    activeTab,
    setActiveTab,
    subMenuItemCounts
}: SubMenuTabsProps) {

    return (
        <div className='flex gap-2 px-4 py-2 bg-white border-b overflow-x-auto'>
            {subMenus.map((sub) => (
                <button
                    key={sub}
                    onClick={() => setActiveTab(sub)}
                    className={`px-3 py-1 text-md font-medium rounded-full whitespace-nowrap hover:scale-105 duration-200 ease-in-out ${activeTab === sub ? 'text-lg font-black text-black' : ' text-gray-500'
                        }`}
                >
                    {sub} ({subMenuItemCounts[sub] || 0})
                </button>
            ))}
        </div>
    )

}
export default SubMenuTabs