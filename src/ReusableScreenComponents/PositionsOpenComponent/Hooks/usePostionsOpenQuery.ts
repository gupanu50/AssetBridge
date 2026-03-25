import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';

const getOpenPostions = async (status: string, symbol?: string): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: symbol ? `/api/v1/positions/?status=${status}&symbol=${symbol}` : `/api/v1/positions/?status=${status}`,
        method: 'GET',
        // baseURL: NEW_BASE_URL_1,
    });
};

function usePostionsOpenQuery(status: string, symbol?: string) {
    return useQuery({
        queryKey: ['/api/v1/positions/', status, symbol],
        queryFn: () => getOpenPostions(status, symbol),
    });
}

export default usePostionsOpenQuery;