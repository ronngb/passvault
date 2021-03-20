import {
    acctData
} from './data/acct.js';

export const store = {
    state: {
        acctData,
        isOpen: true
    },
    getTotalAcct() {
        return this.state.acctData.length;
    },

    setIsOpen() {
        this.state.isOpen = !this.state.isOpen;
    }



}