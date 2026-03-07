import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { verifyPaymentProps } from './types';
import { TRADING_BOT_KEY, TRADING_USER_BOTS } from '../../NotificationScreen/types';
const verifyPaymentBot = async (data: verifyPaymentProps): Promise<AxiosResponse<any>> => {
    return fetcher
        ({
            url: `api/v1/payments/payment/verify/`,
            method: 'POST',
            data,
        });
};

function useVerifyPaymentMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: verifyPaymentProps) => verifyPaymentBot(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: TRADING_BOT_KEY });
            queryClient.invalidateQueries({ queryKey: TRADING_USER_BOTS });
        },
        onError: errr => {
            console.log('VerifyPaymentApiError', errr);
        },
    });
}

export default useVerifyPaymentMutation;
