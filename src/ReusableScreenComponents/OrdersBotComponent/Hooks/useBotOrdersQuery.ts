import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';

const getBotOrders = async (bot_id: number): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/api/v1/orders/?bot_id=${bot_id}`,
        method: 'GET',
        // baseURL: NEW_BASE_URL_1,
    });
};

function useBotOrdersQuery(bot_id: number) {
    return useQuery({
        queryKey: ['/api/v1/orders/',],
        queryFn: () => getBotOrders(bot_id),
    });
}

export default useBotOrdersQuery;