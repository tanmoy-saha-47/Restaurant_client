import { useState, useEffect, useMemo } from "react";
import { MenuItem, menuData as MenuDataType } from "@/data/menuData"; //menudata is passed as a prop.. to avoid conflicts used alias

export default function UseMenuFilters(
  decodedCategory: string,
  subMenus: string[],
  menuData: typeof MenuDataType
) {
  const [activeTab, setActiveTab] = useState(subMenus[0] || "");
  const [search, setSearch] = useState("");
  const [showOnlyVeg, setShowOnlyVeg] = useState(false);

  //Reset active tab if new category is selected
  useEffect(() => {
    if (
      subMenus.length > 0 &&
      (!subMenus.includes(activeTab) || activeTab === "")
    ) {
      setActiveTab(subMenus[0]);
    }

    if (subMenus.length === 0 && activeTab !== "") {
      setActiveTab("");
    }
  }, [decodedCategory, subMenus]);

  const allItems: MenuItem[] = useMemo(() => {
    return (menuData[decodedCategory]?.[activeTab] || []) as MenuItem[];
  }, [decodedCategory, activeTab, menuData]);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesVeg = showOnlyVeg ? item.isVeg : true;
      return matchesSearch && matchesVeg;
    });
  }, [allItems, search, showOnlyVeg]);

  const handleRefresh = () => {
    setSearch("");
    setShowOnlyVeg(false);
    setActiveTab(subMenus[0] || "");
  };

  return {
    activeTab,
    setActiveTab,
    search,
    setSearch,
    showOnlyVeg,
    setShowOnlyVeg,
    handleRefresh,
    filteredItems,
  };
}
