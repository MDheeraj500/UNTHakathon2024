import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate();
    const email = useRef("");
    const password = useRef("");
    const [isChecked, setIsChecked] = useState(false);

    const emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordValid = /^(?=.*\d)(?=.*[A-Z])(.{6,50})$/;

    const handleSubmitLogin = async () => {
        const data = {
            email: email.current?.value,
            password: password.current?.value,
        };

        if (!emailValid.test(data.email)) {
            alert("Please enter a valid email address!");
        } else if (!passwordValid.test(data.password)) {
            alert("Please enter a strong password!");
        } else if (!isChecked) {
            alert("Please read the terms & conditions!");
        } else {
            try {
                const response = await axios.post("http://localhost:8080/api/login", data);
                const reply = response.status;

                if (reply === 209) {
                    alert("Invalid Credentials!");
                } else if (reply === 200)
                    Cookies.set('userId', response.data.userId, { expires: 7 }); {
                    navigate("/dashboard"); // Navigate to the dashboard on successful login
                }
            } catch (error) {
                console.error("Error logging in:", error);
            }
        }
    };

    return (
        <div
            className="h-screen w-full flex items-center justify-center relative font-inter bg-login-background bg-cover bg-center"
        >

            <div className="absolute inset-0 bg-black opacity-70"></div> {/* Dark overlay for a more intense look */}
            <div className="relative z-10 rounded-xl shadow-[0_0_20px_10px_rgba(0,0,0,0.8)] shadow-black text-center w-full max-w-md bg-dark-gray bg-opacity-80 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 400 400" className="absolute">
                    <path className="web" fill="none" stroke="#979797" d="M0,-5.68434189e-14 L400,121.306344 L0,-5.68434189e-14 L400,285.26053 L0,-5.68434189e-14 L227.648438,393.011063 L0,-5.68434189e-14 C1.47046727e-13,17.8535169 2.25196019e-13,25.2141586 2.34447878e-13,22.0819253 C-2.77555756e-15,14.1807654 8.41705907,14.1807654 11.640625,19.7157991 C8.28763081,14.1807654 15.0848911,10.5067251 19.8417969,14.1807654 C14.945707,10.8607743 23.4522008,7.0949205 28.0325521,8.50884303 C23.6102464,7.06995139 28.0325521,5.49661259e-14 31.5846354,9.29745535e-14 C38.4281568,5.49661259e-14 48.5195313,1.29789891e-13 54.4309896,5.49661259e-14 C46.5294557,4.8813185 46.5294557,8.50884303 48.5195313,14.1807654 C41.2105393,16.9519563 36.6946615,21.3136859 36.6946615,26.7802753 C28.0325521,23.9497513 22.1319025,23.9497513 18.8763021,33.1155318 C11.640625,30.7950863 3.78385417,30.7950863 2.34447878e-13,38.0384047 C2.2057009e-13,43.821629 2.2057009e-13,59.215202 2.34447878e-13,64.1860499 C7.4343148,56.7320168 25.1874502,54.4555577 34.4010417,59.215202 C36.6946615,48.5065074 53.7838542,41.5162712 61.3177083,43.821629 C61.3177083,33.9969921 68.2590957,23.9497513 79.1119792,23.9497513 C73.6378482,16.671534 77.3216758,4.8813185 83.8352865,-2.03689637e-14 C90.7457934,1.24335767e-13 112.134766,1.29108126e-13 119.268229,-2.03689637e-14 C108.727867,4.8813185 105.728516,27.8357249 112.134766,33.9969921 C97.8988189,35.8004323 85.2695313,40.5574112 85.2695313,60.9512567 C71.4511719,64.1860499 55.4628906,70.0888918 49.6686198,85.5867304 C31.5846354,79.6449067 7.1953125,86.916597 3.71057352e-13,97.3367633 C5.22238502e-13,107.998724 2.2057009e-13,129.283495 4.88498131e-13,136.360254 C8.22909541,116.886012 63.0292969,112.004315 71.4511719,123.825351 C71.4511719,97.3367633 109.494031,83.7641694 132.746094,94.1614591 C119.268229,76.5474568 143.167493,47.3233558 166.335286,50.4428164 C149.11599,33.9969921 156.222187,8.50884303 180.297145,9.97922086e-14 C205.828125,8.61568983e-14 227.648438,-2.03689637e-14 242.993758,1.05587216e-13 C219.701873,14.1807654 212.533298,45.331624 233.265175,70.6457839 C198.588806,79.5347866 194.428319,119.622371 199.141641,141.995972 C166.335286,139.080349 115.655857,167.385074 112.134766,196.505531 C83.8352865,174.387949 11.0260417,192.607919 0,213.056775 C5.6673416e-13,235.770982 0,276.619163 1.47885176e-13,296.257687 C19.8417969,264.374056 138.786022,256.312929 156.189667,270.093903 C151.31562,231.430198 250.553612,178.478312 270.46507,192.09809 C253.214038,169.143156 275.925719,90.5672912 298.183531,90.5672912 C273.481594,64.1860499 287.900813,4.8813185 314.979288,-5.68434189e-14 C331.131155,1.28767243e-13 392.408609,9.22225724e-14 400,-5.68434189e-14 C366.203125,11.0387592 367.959025,104.10567 400,121.306344 C357.488994,136.360254 375.213512,258.948717 400,285.26053 C351.686185,275.946918 227.648438,374.936648 227.648438,393.011063 C185.794269,373.603023 15.6760986,362.422132 0,400" />
                </svg>
                <div className="p-8">


                    <h2 className="text-[3rem] font-bold text-purple mb-6">Log In</h2>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-lg font-medium text-ghost-white">
                            Email Address:
                        </label>
                        <input
                            type="email"
                            ref={email}
                            className="w-full px-3 py-2 mt-2 mb-4 text-gray-200 bg-dark-gray bg-opacity-70 rounded focus:outline-none focus:ring-2 focus:ring-neon-orange"
                            placeholder="Enter your email"
                        />
                        <label htmlFor="password" className="block text-lg font-medium text-ghost-white">
                            Password:
                        </label>
                        <input
                            type="password"
                            ref={password}
                            className="w-full px-3 py-2 mt-2 mb-6 text-gray-200 bg-dark-gray bg-opacity-70 rounded focus:outline-none focus:ring-2 focus:ring-neon-orange"
                            placeholder="Enter your password"
                        />
                        <div className="flex items-center justify-center mb-4">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => setIsChecked(!isChecked)}
                                className="form-checkbox h-5 w-5 text-neon-green bg-dark-gray rounded focus:ring-neon-green focus:outline-none"
                            />
                            <label className="ml-3 text-sm text-ghost-white">
                                By clicking here, I state that I have read and understood the terms and conditions.
                            </label>
                        </div>
                        {/* <button
                        onClick={handleSubmitLogin}
                        className="w-full px-4 py-2 bg-neon-orange text-white font-bold rounded shadow-neon hover:bg-purple-700 transition duration-150 ease-in-out"
                    >
                        Submit
                    </button> */}

                        <button
                            onClick={handleSubmitLogin}
                            className="poison-button relative w-[16rem] px-4 py-2 bg-neon-orange text-white font-bold rounded shadow-black hover:bg-purple-700 transition duration-150 ease-in-out overflow-hidden"
                        >
                            <span class="relative z-10">Submit</span>

                            <div class="bubble"></div>
                            <div class="bubble"></div>
                            <div class="bubble"></div>
                            <div class="bubble"></div>
                            <div class="bubble"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
