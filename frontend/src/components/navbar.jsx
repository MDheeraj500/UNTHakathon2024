import { FaUserCircle } from 'react-icons/fa'; // Import a user icon from React Icons

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-10 py-4 bg-transparent text-white">
            <div className="flex items-center">
                {/* <img
                    src="path/to/your/logo.png" // Replace with your logo's path
                    alt="Logo"
                    className="h-8 mr-4"
                /> */}
                <span className="text-4xl font-bold  griffy-regular">ClearCash</span>
            </div>
            <div className="flex items-center">
                <span className="text-lg px-4">User Name</span>
                <FaUserCircle className="h-8 w-8 mr-2" />

            </div>
        </nav>
    );
};

export default Navbar;