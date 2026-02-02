import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { apiData, apiResponse } from './types';
const contactUser = async (data: apiData): Promise<AxiosResponse<apiResponse>> => {
    return fetcher
        ({
            url: '/api/v1/contact-us/',
            method: 'POST',
            data,
        });
};

function useContactMutation() {
    return useMutation({
        mutationFn: (data: apiData) => contactUser(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('ContactApiError', errr);
        },
    });
}

export default useContactMutation;
