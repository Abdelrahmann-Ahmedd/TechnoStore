🛍️ Techno Store – Full-Featured E-commerce Web App

A modern, responsive, and high-performance e-commerce frontend built with Next.js (App Router) and TypeScript, designed for a seamless shopping experience.
The project follows clean architecture, scalable folder structure, state management best practices, and performance optimization techniques.

🚀 Live Demo

🔗 https://techno-store-33qe-mr07fo50p.vercel.app/

💡 Key Features

User Authentication: Login, signup, forget password, JWT handling, and logout.
Protected Routes: Secure pages accessible only for authenticated users.
Product Browsing: Category-based products, sliders, and product search with live filtering.
Cart Management: Add, remove, update products, and persistent cart state.
Checkout & Orders: Complete checkout flow and order history with status (Paid/Pending).
Form Handling: Efficient forms handled using Formik with validation via Yup.
Search Functionality: Live filtering of products as users type.
Responsive Design: Mobile-first layout optimized for all screen sizes.
Performance: Optimized API calls, lazy-loaded images, memoized components, and minimal re-renders.
Clean Architecture: Modular components and separation of concerns for maintainability.

🧩 Technologies & Libraries

| Category               | Tools / Libraries                             |
| ---------------------- | --------------------------------------------- |
| **Framework**          | Next.js (App Router), React                   |
| **Language**           | TypeScript                                    |
| **UI / Styling**       | Bootstrap 5, Custom CSS, React Slick Carousel |
| **State Management**   | Redux Toolkit (Slices & Async Thunks)         |
| **API Handling**       | Axios, Custom API Client                      |
| **Form Handling**      | Formik + Yup Validation                       |
| **Icons**              | FontAwesome                                   |
| **Notifications**      | React Hot Toast                               |
| **Image Optimization** | Next/Image                                    |
| **Performance**        | React.memo, Lazy loading, Memoized selectors  |
| **Version Control**    | Git & GitHub                                  |

🧠 Concepts Demonstrated

✅ React & Next.js 14 with App Router
✅ TypeScript interfaces for strong typing
✅ Clean Architecture & Component Reusability
✅ Redux Toolkit for state management (auth, cart, orders, products)
✅ Async Thunks and API handling
✅ Form handling with Formik and validation using Yup
✅ Protected routes for secure pages
✅ Search and filter logic (client-side)
✅ Responsive design using Bootstrap Grid and utilities
✅ Performance optimization: memoized components, lazy loading, minimized re-renders
✅ JWT Authentication with token persistence
✅ Sliders and carousels using React Slick

🧱 Architecture

  Presentation Layer → Components & Pages
      ↓
  State Layer → Redux Toolkit Slices
      ↓
  Service Layer → API Calls (Axios + apiClient)
      ↓
  Models → TypeScript Interfaces


✅ Each layer is independent for maintainability
✅ UI logic is separated from API and state
✅ Services handle all HTTP requests
✅ Redux slices handle global state
✅ Features folder contains complex view logic

📱 Responsive Design Strategy
  Bootstrap Grid for layout flexibility
  Adaptive Navbar and sliders
  Media queries for smaller screens
  Fluid typography and spacing
  Mobile-first design for optimal UX

⚡ Performance Enhancements

Lazy-loaded images with next/image
Memoized components with React.memo
Optimized Redux selectors to minimize re-renders
Efficient API calls via async thunks
Minimal DOM reflows and optimized CSS

🗂️ Folder Structure

📦 app/
├── cart/                  # Cart page
├── category/              # Category listing page
├── checkout/              # Checkout flow pages
├── forgotpassword/        # Forgot password page
├── login/                 # Login page
├── signup/                # Signup page
├── order/                 # Orders page
├── products/              # Product listing page
└── product/[id]/          # Product detail page

📦 components/
├── Ui/                    # Reusable UI elements
│   ├── Alerts.tsx
│   ├── Button.tsx
│   ├── Carousel.tsx
│   ├── CategorySlider.tsx
│   └── Loader.tsx
├── Product/               # Product-specific components
│   ├── ProductList.tsx
│   └── Card.tsx
└── Layout/                # Layout and page components
    ├── Navbar.tsx
    ├── Footer.tsx
    └── LoadingPage.tsx

📦 features/               # Complex view components
├── ProtectedRoute.tsx     # Secure route handling
├── CartView.tsx
├── CategorySection.tsx
├── CheckoutSection.tsx
├── CheckoutView.tsx
├── ForgetPasswordView.tsx
├── LoginView.tsx
├── SignupView.tsx
├── OrderView.tsx
├── ProductSection.tsx
├── ProductView.tsx
└── SearchView.tsx

📦 models/                 # TypeScript interfaces and models
├── AllProducts.ts
├── AllOrders.ts
└── Users.ts

📦 services/               # API calls and validation
├── apiClient.ts            # Axios wrapper
├── AuthServices.ts
├── CartServices.ts
├── OrderServices.ts
├── ProductServices.ts
└── Validation.ts           # YUP validation schemas

📦 store/                  # Redux Toolkit slices and hooks
├── slices/                 # auth, cart, orders, products
├── hooks.ts                # Custom hooks for Redux
└── index.ts                # Store setup



