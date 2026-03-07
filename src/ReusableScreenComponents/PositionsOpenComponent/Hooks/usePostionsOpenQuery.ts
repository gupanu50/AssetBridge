import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';

const getOpenPostions = async (status: string): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/api/v1/positions/?status=${status}`,
        method: 'GET',
        // baseURL: NEW_BASE_URL_1,
    });
};

function usePostionsOpenQuery(status: string) {
    return useQuery({
        queryKey: ['/api/v1/positions/', status],
        queryFn: () => getOpenPostions(status),
    });
}

export default usePostionsOpenQuery;