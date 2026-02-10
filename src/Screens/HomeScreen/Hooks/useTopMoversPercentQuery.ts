import { AxiosResponse } from 'axios';
import { fetcher, NEW_BASE_URL_1 } from '../../../Utils/helper';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { TopMoversPercentageProps } from './commonHooksType';

const getTopMovers = async (params: TopMoversPercentageProps): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/price/market/move?segment=${params?.exchange}&symbol=${params?.name}`,
        method: 'GET',
        baseURL: NEW_BASE_URL_1
    });
};
type TopMoversDetailsQueryOptions = UseQueryOptions<AxiosResponse<any>, Error>;
function useTopMoversPercentageQuery(params: TopMoversPercentageProps, options: TopMoversDetailsQueryOptions) {
    return useQuery({
        queryFn: () => getTopMovers(params),
        ...options,
        queryKey: ['/price/market/move', params],
    });
}

export default useTopMoversPercentageQuery;
