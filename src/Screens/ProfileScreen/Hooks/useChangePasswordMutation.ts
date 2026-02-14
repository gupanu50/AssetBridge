import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { apiData } from './types';
const changePasswordUser = async (data: apiData): Promise<AxiosResponse<any>> => {
    return fetcher
        ({
            url: '/api/v1/accounts/user/change-password/',
            method: 'POST',
            data,
        });
};

function useChangePasswordProfileMutation() {
    return useMutation({
        mutationFn: (data: apiData) => changePasswordUser(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('ChangePasswordApiError', errr);
        },
    });
}

export default useChangePasswordProfileMutation;
