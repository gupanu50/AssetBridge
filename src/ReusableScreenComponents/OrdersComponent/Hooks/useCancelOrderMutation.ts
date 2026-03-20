import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { CancelOrderApiProp } from '../types';
import { ORDERS_KEY } from '../../../Screens/NotificationScreen/types';
const cancelOrder = async (data: CancelOrderApiProp): Promise<AxiosResponse<any>> => {
    return fetcher
        ({
            url: `/api/v1/orders/${data?.id}/cancel/`,
            method: 'POST',
        });
};

function useCancelOrderMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: CancelOrderApiProp) => cancelOrder(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ORDERS_KEY });
        },
        onError: errr => {
            console.log('CancelApiError', errr)
        },
    });
}

export default useCancelOrderMutation;
