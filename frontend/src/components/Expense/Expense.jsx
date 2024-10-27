import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categoryOptions } from '../../utils/constants';
import DatePicker from '../CustomComponents/DatePicker';
import Dropdown from '../CustomComponents/Dropdown';
import TextInput from '../CustomComponents/TextInput';

const Expense = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(
            description.trim() !== '' &&
            parseFloat(amount) > 0 &&
            category !== '' &&
            date !== ''
        );
    }, [description, amount, category, date]);

    const handleSubmitExpense = async () => {
        if (!isFormValid) return; // Prevent submission if form is invalid
        const user_id = Cookies.get("user_id");
        const expenseData = {
            user_id,
            description,
            amount: parseFloat(amount),
            category,
            date,
        };

        try {
            const response = await axios.post("http://127.0.0.1:5000/expense", expenseData);
            if (response.status === 201) {
                alert("Expense added successfully!");
                // Reset form fields after successful submission
                setDescription('');
                setAmount('');
                setCategory('');
                setDate('');
                navigate("/log-analysis");
            } else {
                alert("Error adding expense. Please try again.");
            }
        } catch (error) {
            console.error("Error adding expense:", error);
            alert("An error occurred while adding the expense.");
        }
    };
    return (
        <div
            className="h-screen w-full flex items-center justify-center relative font-inter bg-login-background bg-cover bg-center"
        >

            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className="relative z-10 rounded-xl shadow-[0_0_20px_10px_rgba(0,0,0,0.8)] shadow-black text-center w-full max-w-md bg-dark-gray bg-opacity-80 overflow-hidden">

                <div className="p-8">
                    <h2 className="text-6xl font-bold   mb-6 griffy-regular">Add Expense</h2>
                    <div className="mb-6">
                        {/* Description Input */}
                        <TextInput
                            label="Description"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        {/* Amount Input */}
                        <TextInput
                            label="Amount ($)"
                            placeholder="Enter Amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        {/* Custom Dropdown Component for Category */}
                        <Dropdown
                            label="Category"
                            options={categoryOptions}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />

                        {/* Custom Date Picker Component */}
                        <DatePicker
                            label="Select Date"
                            selectedDate={date}
                            onDateChange={setDate}
                        />

                        <button
                            onClick={handleSubmitExpense}
                            className="poison-button relative w-[16rem] px-4 py-2 bg-neon-orange text-white font-bold rounded shadow-black hover:bg-purple-700 transition duration-150 ease-in-out overflow-hidden"
                        >
                            <span className="relative z-10">Add Expense</span>

                            <div className="bubble"></div>
                            <div className="bubble"></div>
                            <div className="bubble"></div>
                            <div className="bubble"></div>
                            <div className="bubble"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Expense
