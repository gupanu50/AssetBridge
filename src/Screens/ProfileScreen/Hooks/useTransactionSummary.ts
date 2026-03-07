import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';

const getTransactionData = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `api/v1/payments/`,
        method: 'GET',
    });
};

function useTransactionQuery() {
    return useQuery({
        queryKey: ['api/v1/payments/',],
        queryFn: () => getTransactionData(),
    });
}

export default useTransactionQuery;
