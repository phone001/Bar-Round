import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../util/async-request';

const {handleGet} = axiosInstance();
export default function useGetTable(){
    const { data, isLoading, error } = useQuery({
        queryKey: ['tableList'],
        queryFn: async () => {
            const response = await handleGet('table');
            if(response.status !== 200) {
                throw new Error('Failed to fetch table list');
            }
            return response.data;
        }
    });
    console.log('useGetTable', data);
    return { tables: data, isLoading, error };
}