import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Posts from "./pages/Posts";
import Cv from "./pages/Cv";
export default function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-bg text-gray-900 dark:text-fg">
        <Navbar />
        <main className="p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/cv" element={<Cv />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
