export type MenuItem = {
  name: string;
  price: number;
  isVeg: boolean;
  image?: string;
};

export const menuData: Record<string, Record<string, MenuItem[]>> = {
  Food: {
    Recommended: [
      { name: "Butter Garlic Naan", price: 99, isVeg: true },
      { name: "Butter Laccha Paratha", price: 89, isVeg: true },
    ],
    "TODAY SPECIAL": [{ name: "Chicken Biriyani", price: 399, isVeg: false }],
    "BAR BITES": [{ name: "Chicken lasagna", price: 629, isVeg: false }],
  },

  Liquor: {
    Recommended: [
      { name: "Old Monk", price: 150, isVeg: false },
      { name: "Kingfisher", price: 200, isVeg: false },
    ],
    "TODAY SPECIAL": [
      { name: "Whiskey Shots", price: 300, isVeg: false },
      { name: "Vodka shots Unlimited", price: 825, isVeg: false },
    ],
  },
  SoftDrink: {
    Recommended: [{ name: "Pepsi", price: 50, isVeg: true }],
    "TODAY SPECIAL": [{ name: "Fresh Lime Soda", price: 70, isVeg: true }],
  },
  Smokes: {
    Cigarettes: [
      { name: "Marlboro", price: 200, isVeg: false },
      { name: "Gold Flake Light", price: 150, isVeg: false },
    ],
    Organic: [
      { name: "OG Kush", price: 700, isVeg: true },
      { name: "Shillong Mango", price: 350, isVeg: true },
    ],
    "HOUSE SPECIAL": [{ name: "Mohini", price: 500, isVeg: true }],
  },
};
