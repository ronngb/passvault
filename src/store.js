import {
    acctData
} from './data/acct.js';

export const store = {
    state: {
        acctData
    },
    getTotalAcct() {
        return this.state.acctData.length;
    }
}