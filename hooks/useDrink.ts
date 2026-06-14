import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../util/async-request';

const { handleGet } = axiosInstance();

export const useGetDrinkList = (type: string) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['drinkList', type],
        queryFn: async () => {
            const response = await handleGet(`/drink`);
            if(response.status !== 200) {
                throw new Error('Failed to fetch drink list');
            }
            return response.data;
        }
    });
    return { drinkList: data, isLoading, error };
}
   