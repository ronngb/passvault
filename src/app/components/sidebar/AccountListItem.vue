<template>
	<router-link
		:to="{ name: 'account-detail', params: { id: account.id } }"
		tag="li"
		class="acct-list-item"
		active-class="active">
		<img v-if="account.favicon" :src="account.favicon" alt="" />
		<BaseIcon v-else icon="globe" class="icon-md" />
		<h2 class="secondary-heading">
			<span class="secondary-heading-main">{{ domain }}</span>
			<span class="secondary-heading-sub">{{ username }}</span>
		</h2>
	</router-link>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'AccountListItem',
	props: { account: Object },
	computed: {
		domain() {
			let domain = this.account.domain
			return (
				domain.charAt(0).toUpperCase() + domain.slice(1, domain.indexOf('.'))
			)
		},
		username() {
			return this.account.username ? this.account.username : '(no username)'
		},
	},
	mounted() {
		if (!this.account.favicon) this.getFavicon(this.account)
	},
	methods: mapActions(['getFavicon']),
}
</script>

<style lang="scss" scoped>
img {
	height: 3.2rem;
}

.acct-list-item {
	display: flex;
	column-gap: 10px;
	margin: 10px 0;
	padding: 1.2rem 1.25rem;
	border-radius: 10px;
	transition: all 0.5s ease;

	&:hover {
		@include neumorp-shadow(2);
		transition: box-shadow 0.6s cubic-bezier(0.49, 0.04, 0, 1.14);
	}
}
</style>
