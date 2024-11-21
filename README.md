# E-Commerce Platform

An e-commerce platform built using **Vue 3** and **TypeScript**, powered by **Vite** for fast development and build processes. This application showcases a product catalog and shopping cart functionality, designed with modular components for easy maintenance.

## Overview

This project is a responsive-oriented e-commerce website that displays a selection of products with options to add items to a cart. While it currently supports a desktop layout, responsive design for tablet and mobile views is planned for future updates.

## Features

- **Product Catalog**: A clean, grid-based layout showing available products with descriptions and prices.
- **Shopping Cart**: Allows adding/removing products and viewing items in the cart.
- **Modular Components**: Reusable components for `Header`, `Footer`, `Cart`, and `Shop`.
- **TypeScript Support**: Ensures type safety and enhances code quality.
- **SCSS Styling**: Custom styles in SCSS for a modular and consistent design.
- **Development Powered by Vite**: Fast builds and HMR (Hot Module Replacement).

## Tech Stack

- **Vue 3**
- **TypeScript**
- **Vite** - For faster build and development process
- **SCSS** - For modular and reusable styling

## API Integration

The platform uses https://restapi.fr/api/projetproducts to store and retrieve product data. This is a free REST API service that holds the data temporarily.

Note: Since this is a free service, data (including products) is only stored for up to 10 hours. This means that product information may be cleared after this period, requiring re-seeding or re-adding of products for consistent data display.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
