import React from 'react'

type SubMenuTabsProps = {
    subMenus: string[],
    activeTab: string,
    setActiveTab: (tab: string) => void;
};

function SubMenuTabs({
    subMenus,
    activeTab,
    setActiveTab
}: SubMenuTabsProps) {

    // const [active, setActive] = useState(subMenus[0])

    // useEffect(() => {
    //     if (subMenus.length > 0 && !subMenus.includes(activeTab)) {
    //         setActiveTab(subMenus[0])
    //     } else if (subMenus.length > 0 && activeTab === '') {
    //         setActiveTab(subMenus[0])
    //     }
    // }, [subMenus, activeTab, setActiveTab])


    return (
        <div className='flex gap-2 px-4 py-2 bg-white border-b'>
            {subMenus.map((sub) => (
                <button
                    key={sub}
                    onClick={() => setActiveTab(sub)}
                    className={`px-3 py-1 text-sm rounded-full ${activeTab === sub ? 'bg-blue-600 text-white' : 'bg-gray-200'
                        }`}
                >
                    {sub}
                </button>
            ))}
        </div>
    )

}
export default SubMenuTabs