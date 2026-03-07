import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { updateApiData } from './types';
const updateUserData = async (data: updateApiData): Promise<AxiosResponse<any>> => {
    console.log('UpdateData', data)
    return fetcher
        ({
            url: '/api/v1/accounts/user/update-profile/',
            method: 'PATCH',
            data,
        });
};

function useUpdateProfileMutation() {
    return useMutation({
        mutationFn: (data: updateApiData) => updateUserData(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('UpdateProfileApiError', errr);
        },
    });
}

export default useUpdateProfileMutation;
