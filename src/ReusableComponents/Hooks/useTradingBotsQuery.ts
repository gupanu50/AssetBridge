import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../Utils/helper';

const getTradingBotsList = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/api/v1/strategy/bots/`,
        method: 'GET',
    });
};

function useTradingBotsQuery() {
    return useQuery({
        queryKey: ['/api/v1/strategy/bots/',],
        queryFn: () => getTradingBotsList(),
    });
}

export default useTradingBotsQuery;
