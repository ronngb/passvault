<template>
	<router-link
		:to="{ name: 'account-info', params: { id: account.id } }"
		tag="li"
		class="account-item"
		active-class="active">
		<img
			v-if="account.favicon"
			:src="account.favicon"
			:alt="`${domain} favicon`" />
		<BaseIcon v-else icon="globe" class="icon-md" />
		<h2 class="secondary-heading">
			<span class="secondary-heading-main">{{ domain }}</span>
			<span class="secondary-heading-sub">{{ username }}</span>
		</h2>
		<BaseIcon icon="chevron-right" class="icon-sm" />
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

h2 {
	flex-grow: 2;
}

svg {
	opacity: 0;
	transform: translateX(-20px);
}

.account-item {
	display: flex;
	column-gap: 10px;
	margin: 10px 0;
	padding: 1.2rem 1.25rem;
	border-radius: 10px;
	align-items: center;
	transition: all 0.5s ease;

	&:hover {
		box-shadow: 4px 4px 6px rgba(163, 177, 198, 0.6),
			-4px -4px 6px rgba(255, 255, 255, 0.6);
		transition: box-shadow 0.6s cubic-bezier(0.49, 0.04, 0, 1.14);
	}

	&.active {
		box-shadow: 4px 4px 6px rgba(163, 177, 198, 0.6),
			-4px -4px 6px rgba(255, 255, 255, 0.6);

		svg {
			opacity: 1;
			transform: translateX(0);
			transition: opacity 140ms ease-out 60ms, transform 200ms ease-in-out;
		}
	}
}
</style>
