import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsPage from "./pages/DetailsPage";
import CategoryPage from "./pages/CategoryPage";
import MyCartPage from "./pages/MyCartPage";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import OrderFinishedPage from "./pages/OrderFinishedPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import MyOrderDetailsPage from "./pages/MyOrderDetailsPage";
import BrowsePage from "./pages/BrowsePage";
import HomePage from "./pages/HomePage";
import HelpPage from "./pages/HelpPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<BrowsePage />} />
        <Route path="/product/:slug" element={<DetailsPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/cart" element={<MyCartPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-finished" element={<OrderFinishedPage />} />
        <Route path="/check-order" element={<MyOrdersPage />} />
        <Route path="/my-order" element={<MyOrderDetailsPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
