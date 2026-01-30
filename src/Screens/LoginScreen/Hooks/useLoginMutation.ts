import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { apiData, apiResponse } from './types';
const loginUser = async (data: apiData): Promise<AxiosResponse<apiResponse>> => {
    return fetcher
        ({
            url: '/api/v1/accounts/auth/verify-login/',
            method: 'POST',
            data,
        });
};

function useLoginMutation() {
    return useMutation({
        mutationFn: (data: apiData) => loginUser(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('LoginApiError', errr);
        },
    });
}

export default useLoginMutation;
