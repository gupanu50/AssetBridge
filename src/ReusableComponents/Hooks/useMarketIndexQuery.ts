import { AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetcher, NEW_BASE_URL_1 } from '../../Utils/helper';

const getIndexList = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/dashboard/indices`,
        method: 'GET',
        baseURL: NEW_BASE_URL_1
    });
};
type MarketindicesQueryOptions = UseQueryOptions<AxiosResponse<any>, Error>;
function useMarketIndexQuery(options?: MarketindicesQueryOptions) {
    return useQuery({
        queryKey: ['/dashboard/indices'],
        queryFn: () => getIndexList(),
        ...options
    });
}

export default useMarketIndexQuery;
