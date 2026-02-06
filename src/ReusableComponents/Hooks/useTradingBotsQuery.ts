import { AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetcher } from '../../Utils/helper';

const getTradingBotsList = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/api/v1/strategy/bots/`,
        method: 'GET',
    });
};
type TradingBotsQueryOptions = UseQueryOptions<AxiosResponse<any>, Error>;
function useTradingBotsQuery(options?: TradingBotsQueryOptions) {
    return useQuery({
        queryKey: ['/api/v1/strategy/bots/'],
        queryFn: () => getTradingBotsList(),
        ...options
    });
}

export default useTradingBotsQuery;
