import { FaUserCircle } from 'react-icons/fa'; // Import a user icon from React Icons
import { Link } from "react-router-dom"; // Correct import for Link component

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-10 py-4 bg-transparent text-white z-[500]">
            <div className="flex items-center z-[500]">
                {/* Uncomment and replace with your logo's path if needed */}
                {/* <img
                    src="path/to/your/logo.png" // Replace with your logo's path
                    alt="Logo"
                    className="h-8 mr-4"
                /> */}
                <span className="text-4xl font-bold griffy-regular z-[500]">ClearCash</span>
            </div>
            <div className="flex items-center z-[500]">
                <Link to="/dashboard" className="text-4xl font-bold griffy-regular">
                    Dashboard
                </Link>
                <FaUserCircle className="h-8 w-8 ml-4" />
            </div>
        </nav>
    );
};

export default Navbar;
