import { acctData } from './data/acct.js';

export const store = {
    state: {
        acctData,
    },
    getDate() {
        const format = { month: 'long', day: '2-digit', year: 'numeric' }
        return new Date().toLocaleString('en-us', format)

    },
    storeAcct(newAcct) {
        const acctArr = [['website', newAcct.inputWebsite], ['username', newAcct.inputUsername], ['password', newAcct.inputPassword]]

        const datesArr = [['created', this.getDate()], ['last_modified', this.getDate()], ['last_used', this.getDate()]]

        this.state.acctData.push(Object.assign(Object.fromEntries(acctArr), Object.fromEntries(datesArr)));

        return this.state.acctData.length - 1

    }



}