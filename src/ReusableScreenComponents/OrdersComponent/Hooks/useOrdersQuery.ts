import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';

const getOrders = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/api/v1/orders/`,
        method: 'GET',
        // baseURL: NEW_BASE_URL_1,
    });
};

function useOrdersQuery() {
    return useQuery({
        queryKey: ['/api/v1/orders/',],
        queryFn: () => getOrders(),
    });
}

export default useOrdersQuery;