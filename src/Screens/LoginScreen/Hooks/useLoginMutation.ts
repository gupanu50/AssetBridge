import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { apiData } from './types';

const loginUser = async (data: apiData): Promise<AxiosResponse<apiData>> => {
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
