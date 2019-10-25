import { GetterTree } from 'vuex';

import { ErrorsState, RootState } from '../types';

export const getters: GetterTree<ErrorsState, RootState> = {
    getErrorName: (state) => state.name,
    // getErrorData: (state, getters) => {
    //     const errorName = getters.getErrorName
    //     const btcAmount = getters.getBtcAmount
    //
    //     return ERRORS[ errorName ] ? { ...ERRORS[ errorName ] } : ERRORS.DEFAULT
    // },
};
