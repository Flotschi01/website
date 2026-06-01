import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdminDashboard from "./admin/AdminDashboard";
import News from "./pages/News";
import Offers from "./pages/Offers";
import ThemeProvider from "./lib/ThemeProvider";
import Impressum from "./pages/impressum";
// 1. Create a Layout component for your standard pages
function UserLayout() {
  return (
    <>
      <Navbar />
      {/* Outlet renders the matching child route component */}
      <Outlet /> 
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-bg text-gray-900 dark:text-fg">
        <main className="">
          <ThemeProvider>
          <Routes>
            {/* 2. Nest the public routes inside the UserLayout */}
            <Route element={<UserLayout />}>
              <Route path="/" element={<Offers />} />
              <Route path="/news" element={<News />} />
              <Route path="/verein" element={<Home />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>

            {/* 3. This route sits outside the UserLayout and won't have the Navbar/Footer */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
          </ThemeProvider>
        </main>
      </div>
    </Router>
  );
}