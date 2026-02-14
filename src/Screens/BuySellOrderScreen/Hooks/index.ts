import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { BuySellProps } from './types';
const buySellOrders = async (data: BuySellProps): Promise<AxiosResponse<any>> => {
    console.log('DataBuySell', data)
    return fetcher
        ({
            url: '/api/v1/orders/',
            method: 'POST',
            data,
        });
};

function useBuySellMutation() {
    return useMutation({
        mutationFn: (data: BuySellProps) => buySellOrders(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('BuySellOrdersApiError', errr)
        },
    });
}

export default useBuySellMutation;
