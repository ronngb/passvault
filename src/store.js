import acctData from './app/data/acct.js';

export const store = {
    state: {
        acctData,
    },
    currentAcctId: 5,
    getIndexOfAcct(acctId) {
        return this.state.acctData.findIndex((acct) => acct.id === acctId);
    },
    sanitizeUrl(url) {
        const regex = /(http(s?)):\/\/|ww(w|3)./gi;
        return url.replace(regex, '');
    },
    getDateNow() {
        const format = { month: 'long', day: '2-digit', year: 'numeric' };
        return new Date().toLocaleString('en-us', format);
    },
    editAcct(acctId, newAcctInfo) {
        const acctObj = this.state.acctData.find((acct) => acct.id === acctId);
        acctObj.password = newAcctInfo.password;
        acctObj.username = newAcctInfo.username;
        acctObj.last_modified = this.getDate();
        return this.getIndexOfAcct(acctId);
    },
    removeAcct(acctId) {
        this.state.acctData.splice(this.getIndexOfAcct(acctId), 1);
    },
    generateAcctId(currentId) {
        this.currentAcctId += 1;
        return currentId;
    },
    storeAcct(infoAcctObj) {
        let newAcctObj = {
            id: this.generateAcctId(this.currentAcctId),
            domain: this.sanitizeUrl(infoAcctObj.url),
        };

        for (let info in infoAcctObj) {
            newAcctObj[info] = infoAcctObj[info];
        }

        const datesObj = {
            created: this.getDateNow(),
            last_modified: this.getDateNow(),
            last_used: this.getDateNow(),
        };
        newAcctObj = Object.assign(newAcctObj, datesObj);

        return this.state.acctData.push(newAcctObj) - 1;
    },
    sortAcct(sort) {
        this.state.acctData.sort((a, b) => {
            switch (sort) {
                case 'Name (A-Z)':
                    return a.domain > b.domain ? 1 : -1;
                case 'Name (Z-A)':
                    return a.domain < b.domain ? 1 : -1;
            }
        });
    },
};
