import { AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { fetcher } from '../../Utils/helper';

const getIndexList = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/dashboard/indices`,
        method: 'GET',
    });
};

function useMarketIndexQuery() {
    return useQuery({
        queryKey: ['/dashboard/indices'],
        queryFn: () => getIndexList(),
    });
}

export default useMarketIndexQuery;
