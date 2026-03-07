import { AxiosResponse } from 'axios';
import { fetcher } from '../../../Utils/helper';
import { useMutation, useQuery } from '@tanstack/react-query';

const deleteWatchlistItemData = async (id: number): Promise<AxiosResponse<any>> => {
    return fetcher({
        url: `api/v1/accounts/watchlist-items/${id}/`,
        method: 'DELETE',
    });
};
function useDeleteItemWatchlistMutation() {
    return useMutation({
        mutationFn: (id: number) => deleteWatchlistItemData(id),
        onSuccess: () => { },
        onError: errr => {
            console.log('DeleteItemsWatchlistApiError', errr);
        },
    });
}

export default useDeleteItemWatchlistMutation;
