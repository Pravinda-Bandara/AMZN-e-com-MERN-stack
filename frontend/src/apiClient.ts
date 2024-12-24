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

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            if (status === 401) {
                if (data && data.message && data.message.includes('Invalid or expired token')) {
                    localStorage.removeItem('userInfo');
                    window.location.href = '/signin';
                } else {
                    console.error('Authentication error:', data.message || 'Invalid credentials');
                }
            }

            else if (status === 403) {
                alert('Access denied. You do not have permission to view this resource.');
            }

            else {
                console.error('API Error:', data.message || error.message);
            }
        } else {
            console.error('API Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default apiClient;
