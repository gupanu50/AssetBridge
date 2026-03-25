import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';
import { ORDERS_KEY } from '../../../Screens/NotificationScreen/types';

const getOrders = async (symbol?: string): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: symbol ? `/api/v1/orders/?symbol=${symbol}` : `/api/v1/orders/`,
        method: 'GET',
    });
};

function useOrdersQuery(symbol?: string) {
    return useQuery({
        queryKey: ORDERS_KEY,
        queryFn: () => getOrders(symbol),
    });
}

export default useOrdersQuery;