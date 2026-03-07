import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';
import { NOTI_LIST_KEY } from '../types';

const getNotiData = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `api/v1/notifications`,
        method: 'GET',
    });
};
function useNotiDataQuery() {
    return useQuery({
        queryKey: NOTI_LIST_KEY,
        queryFn: () => getNotiData(),
    });
}

export default useNotiDataQuery;
