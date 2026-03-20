import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';
import { ORDERS_KEY } from '../../../Screens/NotificationScreen/types';

const getOrders = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/api/v1/orders/`,
        method: 'GET',
    });
};

function useOrdersQuery() {
    return useQuery({
        queryKey: ORDERS_KEY,
        queryFn: () => getOrders(),
    });
}

export default useOrdersQuery;