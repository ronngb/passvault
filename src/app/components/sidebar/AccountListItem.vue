<template>
	<router-link
		:to="{ name: 'account-detail', params: { id: account.id } }"
		tag="li"
		class="acct-list-item"
		active-class="active">
		<BaseIcon :icon="'globe'" :indefault="false" />
		<h2 class="acct-list-item-heading">
			<span>{{ account.domain }}</span>
			<span>{{ account.username | usernameValidate }}</span>
		</h2>
	</router-link>
</template>

<script>
export default {
	name: 'AccountListItem',
	props: { account: Object },
	filters: {
		usernameValidate(value) {
			return value ? value : '(no username)'
		},
	},
}
</script>

<style lang="scss" scoped>
svg {
	font-size: 4rem !important;
}

span {
	&:nth-child(1) {
		font-size: 1.8rem;
	}
	&:nth-child(2) {
		display: block;
		font-family: $nunito-sans;
	}
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
