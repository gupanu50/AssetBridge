const initialCompressState = {
    compressData: {}
};

export const compressReducer = (state = initialCompressState, action: any) => {
    switch (action.type) {
        case 'COMPRESS':
            return {
                ...state,
                compressData: action.payload,
            };
        default:
            return state;
    }
};

export const compress = (compressData: any) => ({
    type: 'COMPRESS',
    payload: compressData,
});

export const selectCompressData = (state: any) => state.compress.compressData;
