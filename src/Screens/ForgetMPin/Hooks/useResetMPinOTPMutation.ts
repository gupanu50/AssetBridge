import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { apiData } from '../../ForgetPassword/Hooks/types';

const forgetUser = async (data: apiData): Promise<AxiosResponse<any>> => {
    console.log('DataResetMPINOtpData', data)
    return fetcher
        ({
            url: '/api/v1/accounts/auth/verify-forgot-mpin/',
            method: 'POST',
            data,
        });
};
function useResetLoginMpinOTPMutation() {
    return useMutation({
        mutationFn: (data: apiData) => forgetUser(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('ForgetMPinApiError', errr);
        },
    });
}
export default useResetLoginMpinOTPMutation;
