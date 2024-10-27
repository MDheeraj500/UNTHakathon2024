
const CustomLink = ({ backgroundImage, overlayColor, title, description }) => {
    return (
        <div

            className="group rounded-lg p-9 flex flex-col items-center justify-center relative overflow-hidden transition duration-300 ease-in-out"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay with dynamic color and hover effect */}
            <div
                className={`absolute inset-0 ${overlayColor} opacity-90- group-hover:opacity-50 transition-opacity duration-300 ease-in-out rounded-lg`}
            ></div>

            {/* Content */}
            <h2 className="text-4xl font-semibold text-white relative z-10 group-hover:opacity-100">{title}</h2>
            <p className="text-white relative z-10 group-hover:opacity-100">{description}</p>
        </div>
    );
};

export default CustomLink;
