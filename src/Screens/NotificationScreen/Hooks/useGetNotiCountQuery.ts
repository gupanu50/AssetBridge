import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';
import { NOTI_COUNT_KEY } from '../types';

const getNotiCountData = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `api/v1/notifications/count`,
        method: 'GET',
    });
};
function useNotiCountQuery() {
    return useQuery({
        queryKey: NOTI_COUNT_KEY,
        queryFn: () => getNotiCountData(),
    });
}

export default useNotiCountQuery;
