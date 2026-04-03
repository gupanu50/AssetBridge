import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { loginMpinProps } from './types';

const createMPin = async (data: loginMpinProps): Promise<AxiosResponse<any>> => {
    return fetcher
        ({
            url: '/api/v1/accounts/auth/login-with-mpin/',
            method: 'POST',
            data,
        });
};

function useLoginMPinMutation() {
    return useMutation({
        mutationFn: (data: loginMpinProps) => createMPin(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('loginMPinApiError', errr);
        },
    });
}

export default useLoginMPinMutation;
