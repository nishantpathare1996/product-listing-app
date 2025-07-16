# 🛍️ Product Listing App

This is a responsive product listing application built with **React**, **TypeScript**, and **Tailwind CSS**. It allows users to:

- View a list of products
- Sort products by price (ascending or descending)
- Search products by name or description
- Load fallback data from a local JSON file if the API fails

---

## 🚀 Features

- ✅ Responsive design for desktop and mobile
- ✅ Product search (case-insensitive and partial match)
- ✅ Sorting: low to high & high to low price
- ✅ Graceful fallback to local JSON data on API failure
- ✅ Fixed footer showing total count and average price
- ✅ Spinner while data is loading
- ✅ Clean and modular code structure

---

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🧑‍💻 Getting Started

### 1. Clone the repo

git clone https://github.com/your-username/product-listing-app.git
cd product-listing-app

### 2. Install dependencies

npm install

### 3. Run the development server

npm run dev

### 4. Run the development server

---

## 🧪 Testing the App

You can test the fallback behavior by temporarily disconnecting from the internet or changing the fetch URL to an invalid one. The app will load from products.json located in /public/products.json.
