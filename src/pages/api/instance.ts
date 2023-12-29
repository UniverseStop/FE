import axios from 'axios';
import Cookies from 'js-cookie';

export const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 요청 인터셉터 설정
instance.interceptors.request.use(config => {
    const accessToken = Cookies.get('access_Token');
    if (accessToken) {
        config.headers.Authorization = `${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 응답 인터셉터 설정
instance.interceptors.response.use(response => {
    return response;
}, async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = Cookies.get('refresh_Token');
        if (refreshToken) {
            try {
                // 새로운 엑세스 토큰을 요청하는 로직
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/refresh-token`, {
                    headers: { 'Refresh-Token': refreshToken }
                });

                const newAccessToken = response.data.accessToken;
                Cookies.set('access_Token', newAccessToken, { expires: 1/48 }); // 30분 만료
                instance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return instance(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
    }
    return Promise.reject(error);
});
