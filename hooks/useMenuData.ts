"use client";
import { useEffect, useState } from "react";
import { MenuItem, menuData } from "@/data/menuData";

type DataSource = "Static" | "api";

export function useMenuData(
  category: string,
  subCategory: string,
  source: DataSource = "Static"
): {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
} {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (source === "Static") {
          const decodedCategory = decodeURI(category || "");
          const menuItems = menuData?.[decodedCategory]?.[subCategory] ?? [];
          setItems(menuItems);
        } else if (source === "api") {
          const res = await fetch(
            `/api/menu?category=${category}&subCategory=${subCategory}`
          );
          if (!res.ok) throw new Error(`ERROR ${res.status}`);
          const json = await res.json();
          setItems(json.items);
        }
      } catch (err: unknown) {
        const errorMsg =
          err instanceof Error ? err.message : "Something went wrong";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [category, subCategory, source]);

  return { items, loading, error };
}
