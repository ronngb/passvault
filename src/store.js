import { acctData } from './data/acct.js';

export const store = {
    state: {
        acctData,
    },
    sanitizeUrl(url) {
        const regex = /(http(s?)):\/\/|ww(w|3)./gi
        return url.replace(regex, '')
    },
    getDate() {
        const format = { month: 'long', day: '2-digit', year: 'numeric' }
        return new Date().toLocaleString('en-us', format)
    },
    editAcct(id, newAcctInfo) {
        const acctObj = this.state.acctData.find((acct) => acct.id === id)
        acctObj.password = newAcctInfo.password
        acctObj.username = newAcctInfo.username
        acctObj.last_modified = this.getDate()
    },
    storeAcct(newAcct) {
        const acctArr = [['url', newAcct.inputWebsite], ['domain', this.sanitizeUrl(newAcct.inputWebsite)], ['username', newAcct.inputUsername], ['password', newAcct.inputPassword]]

        const datesArr = [['created', this.getDate()], ['last_modified', this.getDate()], ['last_used', this.getDate()]]

        this.state.acctData.push(Object.assign(Object.fromEntries(acctArr), Object.fromEntries(datesArr)));

        return this.state.acctData.length - 1

    },
    sortAcct(sort) {
        this.state.acctData.sort((a, b) => {
            switch (sort) {
                case 'Name (A-Z)':
                    return (a.domain > b.domain) ? 1 : -1;
                case 'Name (Z-A)':
                    return (a.domain < b.domain) ? 1 : -1;
            }
        })
    },
}