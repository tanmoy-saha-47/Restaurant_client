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
  }, [subMenus, activeTab]);

  const allItems: MenuItem[] = useMemo(() => {
    return (menuData[decodedCategory]?.[activeTab] || []) as MenuItem[];
  }, [decodedCategory, activeTab, menuData]);

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
  };
}
