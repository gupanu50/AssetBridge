import { AxiosResponse } from 'axios';
import { fetcher, NEW_BASE_URL_1 } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';

const getLtpData = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/price/ltp?symbols=NIFTY50&symbols=SENSEX&symbols=NIFTYBANK`,
        method: 'GET',
        baseURL: NEW_BASE_URL_1
    });
};

function useGetLtpQuery() {
    return useQuery({
        queryKey: ['/price/ltp'],
        queryFn: () => getLtpData(),
    });
}

export default useGetLtpQuery;
