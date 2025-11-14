import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import ListPage from "./pages/ListPage";
import CheckoutPage from "./pages/CheckoutPage";
import CategoryPage from "./pages/CategoryPage";
import CafePage from "./pages/CafePage";
import ToysPage from "./pages/ToysPage";
import FreshPage from "./pages/FreshPage";
import ElectronicsPage from "./pages/ElectronicsPage";
import MobilesPage from "./pages/MobilesPage";
import BeautyPage from "./pages/BeautyPage";
import FashionPage from "./pages/FashionPage";
import HomeKitchenPage from "./pages/HomeKitchenPage";
import RicePage from "./pages/RicePage";
import DalPulsesPage from "./pages/DalPulsesPage";
import SpicesSeasoningsPage from "./pages/SpicesSeasoningsPage";
import ChipsCrispsPage from "./pages/ChipsCrispsPage";
import JuicesHealthyDrinksPage from "./pages/JuicesHealthyDrinksPage";
import CafeBestsellersPage from "./pages/CafeBestsellersPage";
import CafeSnacksPage from "./pages/CafeSnacksPage";
import DairyPage from "./pages/DairyPage";
import AttaRiceOilDalsPage from "./pages/AttaRiceOilDalsPage";
import MasalaDryFruitsPage from "./pages/MasalaDryFruitsPage";
import BreakfastSaucesPage from "./pages/BreakfastSaucesPage";
import PackagedFoodPage from "./pages/PackagedFoodPage";
import TeaCoffeeMorePage from "./pages/TeaCoffeeMorePage";
import IceCreamsMorePage from "./pages/IceCreamsMorePage";
import FrozenFoodPage from "./pages/FrozenFoodPage";
import Header from "./components/Header";
import SubHeader from "./components/SubHeader";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";
import CartDrawer from "./components/CartDrawer";
import { CartProvider, useCart } from "./contexts/CartContext";
import type { ReactNode } from 'react';
import React from 'react';

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

  return (
    <>
      <Header />
      <SubHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cafe" element={<CafePage />} />
        <Route path="/home-kitchen" element={<HomeKitchenPage />} />
        <Route path="/toys" element={<ToysPage />} />
        <Route path="/fresh" element={<FreshPage />} />
        <Route path="/electronics" element={<ElectronicsPage />} />
        <Route path="/mobiles" element={<MobilesPage />} />
        <Route path="/beauty" element={<BeautyPage />} />
        <Route path="/fashion" element={<FashionPage />} />
        <Route path="/rice" element={<RicePage />} />
        <Route path="/dal-pulses" element={<DalPulsesPage />} />
        <Route path="/spices-seasonings" element={<SpicesSeasoningsPage />} />
        <Route path="/chips-crisps" element={<ChipsCrispsPage />} />
        <Route path="/juices-healthy-drinks" element={<JuicesHealthyDrinksPage />} />
        <Route path="/cafe-bestsellers" element={<CafeBestsellersPage />} />
        <Route path="/cafe-snacks" element={<CafeSnacksPage />} />
        <Route path="/dairy" element={<DairyPage />} />
        <Route path="/atta-rice-oil-dals" element={<AttaRiceOilDalsPage />} />
        <Route path="/masala-dry-fruits" element={<MasalaDryFruitsPage />} />
        <Route path="/breakfast-sauces" element={<BreakfastSaucesPage />} />
        <Route path="/packaged-food" element={<PackagedFoodPage />} />
        <Route path="/tea-coffee-more" element={<TeaCoffeeMorePage />} />
        <Route path="/ice-creams-more" element={<IceCreamsMorePage />} />
        <Route path="/frozen-food" element={<FrozenFoodPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
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
