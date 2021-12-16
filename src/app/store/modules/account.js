import dayjs from 'dayjs';

const state = {
	accounts: [],
	toSearch: '',
};

const mutations = {
	SET_ACCOUNTS: (state, payload) => {
		state.accounts = payload;
	},
	STORE_ACCOUNTS: (state, payload) => {
		const regex = /(http(s?)):\/\/|ww(w|3)./gi;

		const accountObj = {
			...payload,
			id: state.accounts.length + 1,
			domain: payload.url.replace(regex, ''),
			created: dayjs().format('MMMM, D YYYY'),
			last_modified: dayjs().format('MMMM, D YYYY'),
			last_used: dayjs().format('MMMM, D YYYY'),
		};
		state.accounts.push(accountObj);
	},
	SEARCH_ACCOUNT: (state, payload) => {
		state.toSearch = payload;
	},
};

const actions = {
	storeAccount: ({ commit }, account) => {
		commit('STORE_ACCOUNTS', account);
	},
};

const getters = {
	accountCount: (state) => state.accounts.length,

	searchResult: (state) => {
		return state.accounts.filter((obj) => {
			if (
				obj.domain.match(state.toSearch) ||
				obj.username.match(state.toSearch)
			)
				return true;
		});
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
