import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { StartStopApiProps } from '../types';
import { TRADING_BOT_KEY, TRADING_USER_BOTS } from '../../NotificationScreen/types';
const startStopBot = async (data: StartStopApiProps): Promise<AxiosResponse<any>> => {
    console.log('DataStartStop', `/api/v1/strategy/user-bots/${data?.instance_id}/${data?.type}/`)
    return fetcher
        ({
            url: `/api/v1/strategy/user-bots/${data?.instance_id}/${data?.type}/`,
            method: 'POST',
        });
};

function useStartStopBotMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: StartStopApiProps) => startStopBot(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TRADING_USER_BOTS });
            queryClient.invalidateQueries({ queryKey: TRADING_BOT_KEY });
        },
        onError: errr => {
            console.log('StartStopBotApiError', errr)
        },
    });
}

export default useStartStopBotMutation;
