import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { DeleteNotiProps, NOTI_COUNT_KEY, NOTI_LIST_KEY } from '../types';
const deleteNoti = async (data: DeleteNotiProps): Promise<AxiosResponse<any>> => {
    return fetcher
        ({
            url: `api/v1/notifications/delete-bulk/`,
            method: 'DELETE',
            data,
        });
};

function useDeleteNotiMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: DeleteNotiProps) => deleteNoti(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NOTI_COUNT_KEY });
            queryClient.invalidateQueries({ queryKey: NOTI_LIST_KEY });
        },
        onError: errr => {
            console.log('DeleteNotiApiError', errr);
        },
    });
}

export default useDeleteNotiMutation;
