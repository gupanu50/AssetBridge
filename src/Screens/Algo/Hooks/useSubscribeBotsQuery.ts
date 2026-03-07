import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';
import { TRADING_USER_BOTS } from '../../NotificationScreen/types';

const getSubscribeBotsData = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/api/v1/strategy/user-bots/`,
        method: 'GET',
    });
};
function useSubscribeBotsQuery() {
    return useQuery({
        queryKey: TRADING_USER_BOTS,
        queryFn: () => getSubscribeBotsData(),
    });
}

export default useSubscribeBotsQuery;
