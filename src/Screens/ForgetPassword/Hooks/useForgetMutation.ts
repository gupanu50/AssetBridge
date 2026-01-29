import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { apiData } from './types';

const forgetUser = async (data: apiData): Promise<AxiosResponse<apiData>> => {
    return fetcher
        ({
            url: '/api/v1/accounts/user/verify-forgot-password/',
            method: 'POST',
            data,
        });
};

function useForgetMutation() {
    return useMutation({
        mutationFn: (data: apiData) => forgetUser(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('ForgetApiError', errr);
        },
    });
}

export default useForgetMutation;
