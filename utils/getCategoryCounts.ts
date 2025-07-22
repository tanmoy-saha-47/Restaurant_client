import { MenuItem, menuData } from "@/data/menuData";

export default function getCategoryCounts(
  data: Record<string, Record<string, MenuItem[]>>
): Record<string, number> {
  const counts: Record<string, number> = {};

  Object.keys(data).forEach((category) => {
    const subCategories = data[category];
    let total = 0;

    Object.keys(subCategories).forEach((sub) => {
      total += subCategories[sub].length;
    });
    counts[category] = total;
  });
  return counts;
}
