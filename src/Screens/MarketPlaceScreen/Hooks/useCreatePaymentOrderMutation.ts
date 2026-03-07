import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { apiData } from './types';
const subscribeBot = async (data: apiData): Promise<AxiosResponse<any>> => {
    return fetcher
        ({
            url: `api/v1/payments/order/create/`,
            method: 'POST',
            data,
        });
};

function useCreatePaymentOrderMutation() {
    return useMutation({
        mutationFn: (data: apiData) => subscribeBot(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('PaymentOrderCreateApiError', errr);
        },
    });
}

export default useCreatePaymentOrderMutation;
