import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { apiData, mpinProps } from './types';

const createMPin = async (data: mpinProps): Promise<AxiosResponse<any>> => {
    return fetcher
        ({
            url: '/api/v1/accounts/auth/set-mpin/',
            method: 'POST',
            data,
        });
};

function useCreateMPinMutation() {
    return useMutation({
        mutationFn: (data: mpinProps) => createMPin(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('CreateMPinApiError', errr);
        },
    });
}

export default useCreateMPinMutation;
