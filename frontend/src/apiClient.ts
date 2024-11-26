import axios from 'axios';

const apiClient = axios.create({
    baseURL:
        process.env.NODE_ENV === 'development' ? 'http://localhost:5050/' : '/',
    headers: {
        'Content-type': 'application/json',
    },
});

// Request Interceptor
apiClient.interceptors.request.use(
    async (config) => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const token = JSON.parse(userInfo).token;
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token is expired or invalid, prompt user to log in again
            localStorage.removeItem('userInfo');
            window.location.href = '/signin'; // Redirect to login page
        } else if (error.response && error.response.status === 403) {
            // Handle forbidden error (e.g., access denied for non-admin users)
            alert('Access denied.');
        } else {
            // Handle other errors
            console.error('API Error:', error.response || error.message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
