import axios from "axios";
import { getSession } from "next-auth/react";

const customAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});

customAxios.interceptors.request.use(async (config) => {
    const session: any = await getSession();
    if (session && session.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
});

export default customAxios;
