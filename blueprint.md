# Zepto Clone Blueprint

## Overview

This document outlines the blueprint for a Zepto-like grocery delivery application. The application will feature a modern, clean, and intuitive user interface, focusing on a seamless user experience. The primary goal is to create a fast, responsive, and visually appealing application that allows users to browse products, add them to their cart, and check out with ease.

## Project Outline

### Styling and Design

- **Styling:** The application will be styled using Tailwind CSS, a utility-first CSS framework that allows for rapid UI development.
- **Component Library:** No component library will be used. All components will be custom-built using Tailwind CSS.
- **Icons:** The `lucide-react` library will be used for all icons, ensuring a consistent and modern look.
- **Visual Design:** The application will follow a modern design aesthetic with a focus on clean layouts, balanced spacing, and a vibrant color palette. Interactive elements will feature subtle animations and hover effects to enhance the user experience.

### Features

- **Header:** A sticky header containing the logo, location selector, search bar, and user profile/cart buttons.
- **SubHeader:** A scrollable subheader for navigating through different product categories.
- **Home Page:** The main landing page featuring a hero banner, promotional sections, and carousels of popular products.
- **Product Card:** A reusable component to display product information, including name, price, image, and an "Add to Cart" button.
- **Product Carousel:** A horizontal scrolling container for showcasing a list of products.
- **List Page:** A page displaying a grid of products for a specific category.
- **Checkout Page:** A page for users to review their cart, enter their delivery address, and place an order.
- **Footer:** A footer containing navigation links and other relevant information.

## Current Plan

- **Refactor from Material-UI to Tailwind CSS:** The entire application will be refactored to remove all Material-UI components and replace them with custom-built components styled with Tailwind CSS.
  - Replace all `<Box>`, `<Grid>`, `<Card>`, `<Typography>`, etc. with `div`, `h1`, `p`, etc. and apply Tailwind classes.
  - Replace all `@mui/icons-material` icons with `lucide-react` icons.
  - Uninstall all `@mui` and `@emotion` packages.