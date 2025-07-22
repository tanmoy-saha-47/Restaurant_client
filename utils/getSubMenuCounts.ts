import { MenuItem } from "@/data/menuData";

export default function getSubMenuCounts(
  categoryData: Record<string, MenuItem[]>
): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const subMenuName in categoryData) {
    counts[subMenuName] = categoryData[subMenuName].length;
  }
  return counts;
}
