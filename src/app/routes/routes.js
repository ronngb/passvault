import Acct from '../components/account/AccountList.vue';
import DetailsForm from '../components/information/DetailsForm.vue';
import Information from '../components/information/Information.vue';

export const routes = [
	// { path: '/', component: DetailsForm },
	{ path: '/account/:id', component: DetailsForm },
];
