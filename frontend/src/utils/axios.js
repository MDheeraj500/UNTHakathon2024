import { BASE_DEV_URL } from "@/constants/apis";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";

const api = axios.create({
    baseURL: BASE_DEV_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const accessToken = getCookie("accessToken");

        // Check if the access token exists; if not, redirect to login
        if (!accessToken) {
            deleteCookie("accessToken");
            if (
                typeof window !== "undefined" &&
                window.location.href !== "/login"
            ) {
                window.location.href = "/login";
            }
            return Promise.reject("Access token is invalid or missing");
        }

        // Set the access token in the headers
        config.headers["x-fae-internal-jwt"] = accessToken;

        return config;
    },
    (error) => {
        console.log("Error in request interceptor", error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        // Return the response if it's successful
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized response
        if (error.response && error.response.status === 401) {
            // Token is expired or invalid, clear cookies and redirect to login
            deleteCookie("accessToken");
            if (
                typeof window !== "undefined" &&
                window.location.href !== "/login"
            ) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error); // Reject the error to handle it downstream
    }
);

export default api;
