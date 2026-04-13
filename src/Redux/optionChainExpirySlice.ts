const initialCompressState = {
    expiry50Data: [],
    expiryBankData: [],
};

export const expiryDataReducer = (state = initialCompressState, action: any) => {
    switch (action.type) {
        case 'EXRIRY50DATES':
            return {
                ...state,
                expiry50Data: action.payload,
            };
        case 'EXRIRYBANKDATES':
            return {
                ...state,
                expiryBankData: action.payload,
            };
        default:
            return state;
    }
};

export const expiry50Data = (expiry50Data: any) => ({
    type: 'EXRIRY50DATES',
    payload: expiry50Data,
});
export const expiryBankData = (expiryBankData: any) => ({
    type: 'EXRIRYBANKDATES',
    payload: expiryBankData,
});
export const selectExpiry50Data = (state: any) => state.expiryData.expiry50Data;
export const selectExpiryBankData = (state: any) => state.expiryData.expiryBankData;