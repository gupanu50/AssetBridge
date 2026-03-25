import { AxiosResponse } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '../../../Utils/helper';
import { ExitApiProps } from './types';
const exitPositions = async (data: ExitApiProps): Promise<AxiosResponse<any>> => {
    // console.log('DataExitPositions', data)
    return fetcher
        ({
            url: '/api/v1/positions/exit-positions/',
            method: 'POST',
            data,
        });
};

function useExitPostionsMutation() {
    return useMutation({
        mutationFn: (data: ExitApiProps) => exitPositions(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('ExitPostionsApiError', errr)
        },
    });
}

export default useExitPostionsMutation;
