import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useQuery } from '@tanstack/react-query';

const getIIFLLoginData = async (): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `/api/v1/accounts/auth/login-url`,
        method: 'GET',
    });
};

function useIIFLLoginQuery() {
    return useQuery({
        queryKey: ['/api/v1/accounts/auth/login-url'],
        queryFn: () => getIIFLLoginData(),
    });
}

export default useIIFLLoginQuery;
