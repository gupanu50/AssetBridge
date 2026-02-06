import { AxiosResponse } from 'axios';
import { fetcher, NEW_BASE_URL_1 } from '../../../Utils/helper';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const getCompressedData = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/price/contracts/compressed`,
        method: 'GET',
        baseURL: NEW_BASE_URL_1
    });
};

type CompressQueryOptions = UseQueryOptions<AxiosResponse<any>, Error>;
function useCompressQuery(options?: CompressQueryOptions) {
    return useQuery({
        queryKey: ['price/contracts/compressed',],
        queryFn: () => getCompressedData(),
        ...options
    });
}

export default useCompressQuery;
