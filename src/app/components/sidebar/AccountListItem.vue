<template>
	<router-link
		:to="{ name: 'account-detail', params: { id: account.id } }"
		tag="li"
		class="account-item"
		active-class="active">
		<div class="icon-container">
			<img
				class="test-img"
				v-if="account.favicon"
				:src="account.favicon"
				:alt="`${domain} favicon`" />
			<BaseIcon v-else icon="globe" class="icon-md globe-icon" />
		</div>
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
.icon-container {
	position: relative;
	height: 4.2rem;
	width: 4.2rem;
	border-radius: 50%;
	background-color: $primary-bg-color;
	transition: box-shadow 180ms ease-out;
	box-shadow: 4px 4px 7px rgba($bot-shadow-color, 0.6),
		-4px -4px 7px rgba($top-shadow-color, 0.9);
}
img {
	height: 3.2rem;
	width: 3.2rem;
	position: absolute;
	top: 50%;
	left: 50%;
	padding: 1px;
	border-radius: 50%;
	transform: translate(-50%, -50%);
}

h2 {
	flex-grow: 2;
}

.fa-chevron-right {
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

		.icon-container {
			box-shadow: 4px 4px 4px $bot-shadow-color, -4px -4px 4px $top-shadow-color;
			transition: box-shadow 180ms ease-in-out;
		}
	}

	&.active {
		box-shadow: 4px 4px 6px rgba(163, 177, 198, 0.6),
			-4px -4px 6px rgba(255, 255, 255, 0.6);

		.fa-chevron-right {
			opacity: 1;
			transform: translateX(0);
			transition: opacity 140ms ease-in-out 60ms, transform 200ms ease-in-out;
		}

		.icon-container {
			box-shadow: 4px 4px 4px $bot-shadow-color, -4px -4px 4px $top-shadow-color;
			transition: box-shadow 180ms ease-in-out;
		}
	}
}
</style>
