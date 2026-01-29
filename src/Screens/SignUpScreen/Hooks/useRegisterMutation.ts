import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { apiData } from './types';

const registerUser = async (data: apiData): Promise<AxiosResponse<apiData>> => {
    return fetcher
        ({
            url: '/api/v1/accounts/auth/verify-registration/',
            method: 'POST',
            data,
        });
};

function useRegisterMutation() {
    return useMutation({
        mutationFn: (data: apiData) => registerUser(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('RegisterApiError', errr);
        },
    });
}

export default useRegisterMutation;
