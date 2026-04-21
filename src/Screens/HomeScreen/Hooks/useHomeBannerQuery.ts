import { AxiosResponse } from 'axios';
import { fetcher, NEW_BASE_URL_1 } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';

const getHomeBanners = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `api/v1/banners/`,
        method: 'GET',
        // baseURL: NEW_BASE_URL_1
    });
};

function useHomeBannersQuery() {
    return useQuery({
        queryKey: ['api/v1/banners/'],
        queryFn: () => getHomeBanners(),
    });
}

export default useHomeBannersQuery;
