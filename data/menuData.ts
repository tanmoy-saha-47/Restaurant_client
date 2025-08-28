export type MenuItem = {
  name: string;
  price: number;
  isVeg: boolean;
  imageUrl?: string;
  description?: string;
  available: boolean;
};

export const menuData: Record<string, Record<string, MenuItem[]>> = {
  Food: {
    Recommended: [
      {
        name: "Butter Garlic Naan",
        price: 99,
        isVeg: true,
        available: true,
        imageUrl: "/naan.jpg",
        description:
          "The Butter Garlic Naan served with green chutney & onions. A classic and highly reordered favorite.",
      },
      {
        name: "Butter Laccha Paratha",
        price: 89,
        available: true,
        isVeg: true,
      },
      {
        name: "Mutton Keema",
        price: 340,
        available: true,

        isVeg: false,
        imageUrl: "/muttonKeema.jpg",
      },
    ],
    "TODAY SPECIAL": [
      {
        name: "Chicken Biriyani",
        price: 399,
        available: true,

        isVeg: false,
        imageUrl: "/biriyani.jpg",
        description:
          "Chicken Biriyani served with green chutney & onions. A classic and highly reordered favorite.",
      },
    ],
    "BAR BITES": [
      { name: "Chicken lasagna", price: 629, available: true, isVeg: false },
    ],
  },

  Liquor: {
    Recommended: [
      { name: "Old Monk", price: 150, available: true, isVeg: false },
      { name: "Kingfisher", price: 200, available: true, isVeg: false },
    ],
    "TODAY SPECIAL": [
      { name: "Whiskey Shots", price: 300, available: true, isVeg: false },
      {
        name: "Vodka shots Unlimited",
        price: 825,
        available: true,
        isVeg: false,
      },
    ],
  },
  SoftDrink: {
    Recommended: [{ name: "Pepsi", price: 50, available: true, isVeg: true }],
    "TODAY SPECIAL": [
      { name: "Fresh Lime Soda", price: 70, available: true, isVeg: true },
    ],
  },
  Smokes: {
    Cigarettes: [
      { name: "Marlboro", price: 200, available: true, isVeg: false },
      { name: "Gold Flake Light", price: 150, available: true, isVeg: false },
    ],
    Organic: [
      { name: "OG Kush", price: 700, available: true, isVeg: true },
      { name: "Shillong Mango", price: 350, available: true, isVeg: true },
    ],
    "HOUSE SPECIAL": [
      { name: "Mohini", price: 500, available: true, isVeg: true },
    ],
  },
};
