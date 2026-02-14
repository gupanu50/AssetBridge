import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';

const getOpenPostions = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/api/v1/positions/`,
        method: 'GET',
        // baseURL: NEW_BASE_URL_1,
    });
};

function usePostionsOpenQuery() {
    return useQuery({
        queryKey: ['/api/v1/positions/',],
        queryFn: () => getOpenPostions(),
    });
}

export default usePostionsOpenQuery;