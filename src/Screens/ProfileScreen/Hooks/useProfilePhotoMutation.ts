import { useMutation } from '@tanstack/react-query';
import { NEW_BASE_URL } from '../../../Utils/helper';
import { store } from '../../../Redux/store';
const updateUserData = async (data: any) => {
    // console.log('dataProfilePic', data)
    const token = store.getState().auth?.userData?.access;
    const formData = new FormData();
    formData.append('profile_picture', {
        uri: data?.encodedImage?.path,
        type: data?.encodedImage?.mime,
        name: data?.encodedImage?.filename,
    })
    // console.log('FormData', formData, token)
    const response = await fetch(`${NEW_BASE_URL}/api/v1/accounts/user/upload-profile-picture/`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const json = await response.json();

    return {
        success: json.Status === 'Success',
        data: json,
        message: json.Message,
    };
};

function useProfilePhotoMutation() {
    return useMutation({
        mutationFn: (data: any) => updateUserData(data),
        onSuccess: () => { },
        onError: errr => {
            console.log('ProfilePhotoApiError', errr);
        },
    });
}

export default useProfilePhotoMutation;
