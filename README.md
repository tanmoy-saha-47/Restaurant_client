## Restaurant Menu Display App
This is a dynamic and responsive web application designed to display a restaurant's menu. It features category-based navigation, sub-category filtering, search functionality, and a vegetarian-only toggle, providing a user-friendly experience for browsing menu items.

## Features
Category-based Navigation: Easily switch between main menu categories like "Food," "Liquor," and "SoftDrink" using interactive tabs.

Sub-Menu Filtering: Within each category, filter items by sub-menus such as "Recommended" or "Today Special."

Search Functionality: Quickly find menu items by typing in the search bar.

Vegetarian Toggle: Filter menu items to show only vegetarian options.

Refresh Button: Clear the search query and reset the vegetarian filter with a single click.

Responsive Design: Optimized for various screen sizes, from mobile to desktop, ensuring a consistent user experience.

Dynamic Content: Menu data is loaded from a local data file (menuData.ts), making it easy to update.

Promotional Image Display: Features a dedicated section for displaying promotional images or offers.

Login Functionality: Stores the login credentials in UserContext

Table Selection : User can select their table and the tableNumber is stored in UserContext


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
