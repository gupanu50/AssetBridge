import { AxiosResponse } from 'axios';
import { fetcher, NEW_BASE_URL_1 } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';
import { optionApiDatesDataProps } from './types';

const getOptionChainDatesData = async (params: optionApiDatesDataProps): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `price/contracts/expiry-dates?symbol=${params.symbol}`,
        method: 'GET',
        baseURL: NEW_BASE_URL_1
    });
};
function useOptionChainDatesDataQuery(params: optionApiDatesDataProps) {
    return useQuery({
        queryKey: ['price/contracts/expiry-dates', params],
        queryFn: () => getOptionChainDatesData(params),
    });
}

export default useOptionChainDatesDataQuery;
