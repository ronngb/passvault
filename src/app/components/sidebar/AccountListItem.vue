<template>
	<router-link
		:to="{ name: 'account-detail', params: { id: accountItem.id } }"
		tag="li"
		class="pv-acct-list-item"
		active-class="active">
		<font-awesome-icon :icon="['fas', 'globe']" class="globe-icon" />
		<div class="acct-info">
			<span class="acct-domain">{{ accountItem.domain }}</span>
			<span class="acct-username">
				<small>{{ accountItem.username | usernameValidate }}</small>
			</span>
		</div>
	</router-link>
</template>

<script>
export default {
	name: 'AccountListItem',
	props: { accountItem: Object },
	filters: {
		usernameValidate(value) {
			return value ? value : '(no username)'
		},
	},
}
</script>

<style lang="scss" scoped>
.pv-acct-list-item {
	padding: 0.75rem 1.25rem;
	margin: 10px 0;
	display: flex;
	column-gap: 10px;
	// width: 280px;
}

.pv-acct-list-item:hover {
	border-radius: 10px;
	box-shadow: 4px 4px 8px rgba(163, 177, 198, 0.8),
		-4px -4px 8px rgba(255, 255, 255, 0.9);
	transition: box-shadow 0.6s cubic-bezier(0.49, 0.04, 0, 1.14);
	cursor: pointer;
}

.globe-icon {
	font-size: 2.5em;
	color: $color-light-grey;
}

.acct-info {
	color: $color-dark-grey;
	line-height: 1.2;
}

.acct-domain {
	display: block;
	font-size: 18px;
	font-weight: 700;
}

.acct-username {
	font-family: 'Nunito Sans', sans-serif;
	font-weight: bold;
}
/*TODO:
		
*/
</style>
