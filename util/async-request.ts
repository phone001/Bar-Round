import axios from 'axios';

interface RequestProps {
    data?: any;
    params?: any;
    headers?: any;
    timeout?: number;
}

interface RequestObj {
    handleGet: (url: string, options?: RequestProps) => Promise<any>;
    handlePost: (url: string, options?: RequestProps) => Promise<any>;
    handlePetch: (url: string, options?: RequestProps) => Promise<any>;
    handlePut: (url: string, options?: RequestProps) => Promise<any>;
    handleDelete: (url: string, options?: RequestProps) => Promise<any>;
}

const axiosInit = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    timeout: 10000, // Set a timeout for requests (optional)
    headers: {
        'Content-Type': 'application/json', // Set default headers (optional)
        credentials: 'true', 
    },
});

const axiosInstance =  () : RequestObj => {
    /** 조회 요청 */
    const handleGet = async (url: string, options?: RequestProps)=> {
        const response = await axiosInit.get(url, {
            ...options
        });
        return response.data;
    }

    /** 등록 요청 */
    const handlePost = async (url: string, options?: RequestProps) => {
        const response = await axiosInit.post(url, options?.data, {
            ...options
        });
        return response.data;
    }

    /** 일부 수정 요청 */
    const handlePetch = async (url: string, options?: RequestProps) => {
        const response = await axiosInit.patch(url, options?.data, {
            ...options
        });
        return response.data;
    }

    /** 수정 요청 */
    const handlePut = async (url: string, options?: RequestProps) => {
        const response = await axiosInit.put(url, options?.data, {
            ...options
        });
        return response.data;
    }

    /** 삭제 요청 */
    const handleDelete = async (url: string, options?: RequestProps) => {
        const response = await axiosInit.delete(url, {
            ...options
        });
        return response.data;
    }

    return {handleGet, handlePost, handlePetch,handlePut, handleDelete};
}

export default axiosInstance;