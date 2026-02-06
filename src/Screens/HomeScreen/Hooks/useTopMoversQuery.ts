import { AxiosResponse } from 'axios';
import { fetcher, NEW_BASE_URL_1 } from '../../../Utils/helper';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { TopMoversProps } from './commonHooksType';

const getTopMovers = async (params: TopMoversProps): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `price/market/movers?exchange=${params?.exchange}&type=${params?.type}&timeframe=${params?.time}&limit=${params?.limit}`,
        method: 'GET',
        baseURL: NEW_BASE_URL_1
    });
};

type TopMoversQueryOptions = UseQueryOptions<AxiosResponse<any>, Error>;
function useTopMoversQuery(params: TopMoversProps, options?: TopMoversQueryOptions) {
    return useQuery({
        queryKey: ['/price/market/movers', params],
        queryFn: () => getTopMovers(params),
        ...options
    });
}

export default useTopMoversQuery;
