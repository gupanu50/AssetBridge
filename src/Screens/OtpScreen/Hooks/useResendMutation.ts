import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { apiData, resendApiData } from './type';

const otpResend = async (data: resendApiData): Promise<AxiosResponse<resendApiData>> => {
    return fetcher
        ({
            url: '/api/v1/accounts/auth/resend-otp/',
            method: 'POST',
            data,
        });
};

function useResendMutation() {
    return useMutation({
        mutationFn: (data: resendApiData) => otpResend(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('ResendOtpApiError', errr);
        },
    });
}

export default useResendMutation;
