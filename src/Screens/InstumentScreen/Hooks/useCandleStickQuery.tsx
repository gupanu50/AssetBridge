import { AxiosResponse } from 'axios';
import { fetcher, NEW_BASE_URL_1 } from '../../../Utils/helper';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const getProfileData = async (params: any): Promise<AxiosResponse<any>> => {
    // console.log('FetchingCandleStickDataWithParams', params);
    // console.log('FetchingCandleStickDataURL', `/price/historical/prices?market=${params?.index}&symbol=${params?.symbol}&exchange=${params?.exchange}&timeframe=1m&from_date=${params?.fromDate}&to_date=${params?.toDate}&segment=${params?.segment}`);
    return fetcher({
        url: `/price/historical/prices?market=${params?.index}&symbol=${params?.symbol}&exchange=${params?.exchange}&timeframe=${params?.timeframe}&from_date=${params?.fromDate}&to_date=${params?.toDate}&segment=${params?.segment}`,
        method: 'GET',
        baseURL: NEW_BASE_URL_1
    });
};
type CandleStickQueryOptions = UseQueryOptions<AxiosResponse<any>, Error>;
function useCandleStickQuery(params: any) {
    return useQuery({
        queryKey: ['candles', params.symbol, params.timeframe, params.fromDate, params.toDate],
        queryFn: () => getProfileData(params),
        staleTime: 1000 * 30,
    });
}

export default useCandleStickQuery;
