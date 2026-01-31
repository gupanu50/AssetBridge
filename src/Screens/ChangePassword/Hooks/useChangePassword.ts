import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { apiData } from './types';

const changePasswordUser = async (data: apiData): Promise<AxiosResponse<apiData>> => {
    return fetcher
        ({
            url: '/api/v1/accounts/user/change-forgot-password/',
            method: 'POST',
            data,
        });
};

function useChangePasswordMutation() {
    return useMutation({
        mutationFn: (data: apiData) => changePasswordUser(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('ChangePasswordApiError', errr);
        },
    });
}

export default useChangePasswordMutation;
