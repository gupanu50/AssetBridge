import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';

const getProfileData = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/api/v1/accounts/user/`,
        method: 'GET',
    });
};

function useProfileQuery() {
    return useQuery({
        queryKey: ['api/v1/accounts/user/',],
        queryFn: () => getProfileData(),
    });
}

export default useProfileQuery;
