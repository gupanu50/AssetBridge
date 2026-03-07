import { AxiosResponse } from 'axios';
import { fetcher, NEW_BASE_URL_1 } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';
import { optionApiDataProps } from './types';

const getOptionChainData = async (params: optionApiDataProps): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/price/contracts/option-chain?symbol=${params.symbol}&expiry=${params.expiry}`,
        method: 'GET',
        baseURL: NEW_BASE_URL_1
    });
};
function useOptionChainDataQuery(params: optionApiDataProps) {
    return useQuery({
        queryKey: ['price/contracts/option-chain', params],
        queryFn: () => getOptionChainData(params),
    });
}

export default useOptionChainDataQuery;
