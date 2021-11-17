import Acct from '../components/account/AccountList.vue';

export const routes = [
	{ path: '/', component: Acct },
	{ path: '/account/:id', component: Acct },
];
