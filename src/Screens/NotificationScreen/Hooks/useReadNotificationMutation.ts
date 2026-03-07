import { AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { NOTI_COUNT_KEY, NOTI_LIST_KEY, ReadNotiProps } from '../types';
const readNoti = async (data: ReadNotiProps): Promise<AxiosResponse<any>> => {
    return fetcher
        ({
            url: `api/v1/notifications/${data.id}/read/`,
            method: 'POST',
            data,
        });
};

function useReadNotiMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ReadNotiProps) => readNoti(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NOTI_COUNT_KEY });
            queryClient.invalidateQueries({ queryKey: NOTI_LIST_KEY });
        },
        onError: errr => {
            console.log('ContactApiError', errr);
        },
    });
}

export default useReadNotiMutation;
