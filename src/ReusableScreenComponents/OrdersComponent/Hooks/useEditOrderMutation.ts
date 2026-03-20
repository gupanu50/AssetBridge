import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { CancelOrderApiProp, EditOrderApiProp } from '../types';
import { ORDERS_KEY } from '../../../Screens/NotificationScreen/types';
const editOrder = async (data: EditOrderApiProp): Promise<AxiosResponse<any>> => {
    return fetcher
        ({
            url: `/api/v1/orders/${data?.id}/`,
            method: 'PATCH',
            data
        });
};

function useEditOrderMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: EditOrderApiProp) => editOrder(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ORDERS_KEY });
        },
        onError: errr => {
            console.log('EditApiError', errr)
        },
    });
}

export default useEditOrderMutation;
