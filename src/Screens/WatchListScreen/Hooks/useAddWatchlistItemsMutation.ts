import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { addApiData } from './types';
const updateUserData = async (data: addApiData): Promise<AxiosResponse<any>> => {
    console.log('DataWatchlistItem', data)
    return fetcher
        ({
            url: '/api/v1/accounts/watchlist-items/',
            method: 'POST',
            data,
        });
};

function useAddItemsWatchlistMutation() {
    return useMutation({
        mutationFn: (data: addApiData) => updateUserData(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('AddItemsWatchlistApiError', errr);
        },
    });
}

export default useAddItemsWatchlistMutation;
