import { AxiosResponse } from 'axios';
import { fetcher, NEW_BASE_URL_1 } from '../../../Utils/helper';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const getProfileData = async (params: any): Promise<AxiosResponse<any>> => {
    console.log('FetchingCandleStickDataWithParams', params);
    return fetcher({
        url: `/price/historical/prices?market=index&symbol=${params?.symbol}&exchange=${params?.exchange}&timeframe=1m&from_date=${params?.fromDate}&to_date=${params?.toDate}&segment=${params?.segment}`,
        method: 'GET',
        baseURL: NEW_BASE_URL_1
    });
};
type CandleStickQueryOptions = UseQueryOptions<AxiosResponse<any>, Error>;
function useCandleStickQuery(params: any) {
    return useQuery({
        queryKey: ['api/v1/accounts/user/', params],
        queryFn: () => getProfileData(params),
    });
}

export default useCandleStickQuery;
