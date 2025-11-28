import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ListPage from "./pages/ListPage";
import CategoryPage from "./pages/CategoryPage";
import CafePage from "./pages/CafePage";
import ToysPage from "./pages/ToysPage";
import FreshPage from "./pages/FreshPage";

import RicePage from "./pages/RicePage";
import DalPulsesPage from "./pages/DalPulsesPage";
import SpicesSeasoningsPage from "./pages/SpicesSeasoningsPage";
import ChipsCrispsPage from "./pages/ChipsCrispsPage";
import JuicesHealthyDrinksPage from "./pages/JuicesHealthyDrinksPage";
import CafeBestsellersPage from "./pages/CafeBestsellersPage";
import CafeSnacksPage from "./pages/CafeSnacksPage";
import Header from "./components/Header";
// import SubHeader from "./components/SubHeader";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import CartDrawer from "./components/CartDrawer";
import { CartProvider, useCart } from "./contexts/CartContext";
import type { ReactNode } from 'react';
import React from 'react';
import SaltSugarPage from "./pages/SaltSugar";
import ResetPassword from "./components/ResetPassword";
import CheckoutPage from "./pages/CheckoutPage";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error("ErrorBoundary caught an error", error);
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

function AppContent() {
  const { isCartOpen, closeCart } = useCart();
  const path = window.location.pathname;

  // Only show ResetPassword without layout on /reset-password
  if (path === "/reset-password") {
    return <ResetPassword />;
  }

  return (
    <>
      <Header />
      {/* <SubHeader /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cafe" element={<CafePage />} />
        <Route path="/toys" element={<ToysPage />} />
        <Route path="/fresh" element={<FreshPage />} />
        <Route path="/rice" element={<RicePage />} />
        <Route path="/dal-pulses" element={<DalPulsesPage />} />
        <Route path="/spices-seasonings" element={<SpicesSeasoningsPage />} />
        <Route path="/chips-crisps" element={<ChipsCrispsPage />} />
        <Route path="/juices-healthy-drinks" element={<JuicesHealthyDrinksPage />} />
        <Route path="/cafe-bestsellers" element={<CafeBestsellersPage />} />
        <Route path="/cafe-snacks" element={<CafeSnacksPage />} />
        <Route path="/salt-sugar-jaggery" element={<SaltSugarPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/payment-success" element={<div>Payment Success!</div>} />

      </Routes>
      <Footer />
      <BottomNav />
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
