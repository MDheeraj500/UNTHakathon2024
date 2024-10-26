// src/app/components/Navbar.js
import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <nav className="bg-white shadow-lg text-black">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-xl font-bold">App</div>
                {/* Navigation Items */}
                <div className="space-x-8 flex">
                    <Link to="/">Home</Link>
                    <Link to="/quiz">Quiz</Link>
                    <Link to="/flashcard">Flashcard</Link>
                    <Link to="/summarizer">Summarizer</Link>
                </div>
            </div>
        </nav>
    );
}
