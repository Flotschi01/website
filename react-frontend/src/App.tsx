import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdminDashboard from "./admin/AdminDashboard";
import News from "./pages/News";
export default function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-bg text-gray-900 dark:text-fg">
        <main className="">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<News />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
