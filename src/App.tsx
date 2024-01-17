import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { lazy, Suspense } from "react";
import Loader from "./components/Loader";

const Home = lazy(() => import("./components/Home"));
const Learning = lazy(() => import("./components/Learning"));
const Quiz = lazy(() => import("./components/Quiz"));
const Result = lazy(() => import("./components/Result"));

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/learn" element={<Learning />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/result" element={<Result />} />
                    </Routes>
                </Suspense>

                <Footer />
            </Router>
        </>
    );
}

export default App;
