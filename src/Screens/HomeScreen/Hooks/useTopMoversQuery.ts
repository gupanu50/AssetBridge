import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';
import { TopMoversProps } from './commonHooksType';

const getTopMovers = async (params: TopMoversProps): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `price/market/movers?exchange=${params?.exchange}&type=${params?.type}&timeframe=${params?.time}&limit=${params?.limit}`,
        method: 'GET',
    });
};

function useTopMoversQuery(params: TopMoversProps) {
    return useQuery({
        queryKey: ['/price/market/movers',],
        queryFn: () => getTopMovers(params),
    });
}

export default useTopMoversQuery;
