import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { resetLoginMpinProps } from './types';

const resetMPin = async (data: resetLoginMpinProps): Promise<AxiosResponse<any>> => {
    console.log('Data', data)
    return fetcher
        ({
            url: '/api/v1/accounts/auth/reset-mpin/',
            method: 'POST',
            data,
        });
};

function useResetLoginMPinMutation() {
    return useMutation({
        mutationFn: (data: resetLoginMpinProps) => resetMPin(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('resetloginMPinApiError', errr);
        },
    });
}

export default useResetLoginMPinMutation;
