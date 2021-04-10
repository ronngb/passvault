import { acctData } from './data/acct.js';

export const store = {
    state: {
        acctData,
    },
    getTotalAcct() {
        return this.state.acctData.length;
    },

    setIsOpen() {
        this.state.isOpen = !this.state.isOpen;
    },
    getDate() {
        const format = { month: 'long', day: '2-digit', year: 'numeric' }
        return new Date().toLocaleString('en-us', format)

    },
    storeAcct(newAcct) {

        const datesArr = [['created', this.getDate()], ['last_modified', this.getDate()], ['last_used', this.getDate()]]

        this.state.acctData.push(Object.assign(newAcct, Object.fromEntries(datesArr)));

    }



}