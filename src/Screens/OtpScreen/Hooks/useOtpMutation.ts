import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { apiData } from './type';

const otpLogin = async (data: apiData): Promise<AxiosResponse<any>> => {
    return fetcher
        ({
            url: '/api/v1/accounts/auth/verify-otp/',
            method: 'POST',
            data,
        });
};

function useOtpMutation() {
    return useMutation({
        mutationFn: (data: apiData) => otpLogin(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('OtpApiError', errr);
        },
    });
}

export default useOtpMutation;
