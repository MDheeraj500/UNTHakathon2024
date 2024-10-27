import React from 'react';
import { format } from 'date-fns';

const DatePicker = ({ label, selectedDate, onDateChange }) => {
    return (
        <div className="mb-6">
            <label className="block text-lg font-medium text-ghost-white text-left">
                {label}:
            </label>
            <input
                type="date"
                value={selectedDate ? format(new Date(selectedDate), 'yyyy-MM-dd') : ''}
                onChange={(e) => onDateChange(e.target.value)}
                className="w-full px-3 py-2 mt-2 mb-4 text-gray-200 bg-dark-gray bg-opacity-70 rounded focus:outline-none focus:ring-2 focus:ring-neon-orange"
            />
        </div>
    );
};

export default DatePicker;
