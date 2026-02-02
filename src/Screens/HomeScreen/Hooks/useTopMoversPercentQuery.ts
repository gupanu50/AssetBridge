import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';
import { TopMoversPercentageProps } from './commonHooksType';

const getTopMovers = async (params: TopMoversPercentageProps): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/price/market/move?segment=${params?.exchange}&symbol=${params?.name}`,
        method: 'GET',
    });
};

function useTopMoversPercentageQuery(params: TopMoversPercentageProps) {
    return useQuery({
        queryKey: ['/api/v1/accounts/watchlist/',],
        queryFn: () => getTopMovers(params),
    });
}

export default useTopMoversPercentageQuery;
