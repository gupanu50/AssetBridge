import { AxiosResponse } from 'axios';
import { fetcher, NEW_BASE_URL_1 } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';

const getWatchlist = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/api/v1/accounts/watchlist/`,
        method: 'GET',
        baseURL: NEW_BASE_URL_1,
    });
};

function useWatchlistQuery() {
    return useQuery({
        queryKey: ['/api/v1/accounts/watchlist/',],
        queryFn: () => getWatchlist(),
    });
}

export default useWatchlistQuery;
