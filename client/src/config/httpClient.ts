import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/v1';

export const httpClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

httpClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await axios.post(
                    `${API_BASE_URL}/auth/refresh-token`,
                    {},
                    {
                        withCredentials: true,
                    }
                );


                const newAccessToken = res.data.token;
                localStorage.setItem('token', newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return httpClient(originalRequest);
            } catch (refreshError) {
                console.error("Token yenileme başarısız:", refreshError);
                localStorage.removeItem('token');
                window.location.href = '/giris';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
