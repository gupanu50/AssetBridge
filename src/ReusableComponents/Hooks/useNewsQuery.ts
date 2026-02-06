import { AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetcher } from '../../Utils/helper';

const getNewsList = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/api/v1/news/`,
        method: 'GET',
    });
};
type NewsQueryOptions = UseQueryOptions<AxiosResponse<any>, Error>;
function useNewsQuery(options?: NewsQueryOptions) {
    return useQuery({
        queryKey: ['/api/v1/news/',],
        queryFn: () => getNewsList(),
    });
}

export default useNewsQuery;
