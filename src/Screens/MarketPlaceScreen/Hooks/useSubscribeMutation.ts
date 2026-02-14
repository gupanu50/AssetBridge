import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { apiData, apiResponse } from './types';
const subscribeBot = async (params: apiData): Promise<AxiosResponse<apiResponse>> => {
    return fetcher
        ({
            url: `api/v1/strategy/user-bots/${params?.id}/${params?.type}/`,
            method: 'POST',
        });
};

function useSubscriptionMutation() {
    return useMutation({
        mutationFn: (data: apiData) => subscribeBot(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('SubscriptionApiError', errr);
        },
    });
}

export default useSubscriptionMutation;
