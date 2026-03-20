import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';

const getOpenBotPostions = async (status: string, bot_id: number): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/api/v1/positions/?status=${status}&bot_id=${bot_id}`,
        method: 'GET',
        // baseURL: NEW_BASE_URL_1,
    });
};

function usePostionsBotOpenQuery(status: string, bot_id: number) {
    return useQuery({
        queryKey: ['/api/v1/positions/', status, bot_id],
        queryFn: () => getOpenBotPostions(status, bot_id),
    });
}

export default usePostionsBotOpenQuery;