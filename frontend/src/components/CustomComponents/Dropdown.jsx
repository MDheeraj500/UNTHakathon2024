import React from 'react';

const Dropdown = ({ label, options, value, onChange }) => {
    return (
        <div className="mb-6">
            <label className="block text-lg font-medium text-ghost-white text-left">
                {label}:
            </label>
            <select
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 mt-2 mb-4 text-gray-200 bg-dark-gray bg-opacity-70 rounded focus:outline-none focus:ring-2 focus:ring-neon-orange"
            >
                <option value="" disabled>Select {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;

