<template>
	<router-link
		:to="{ name: 'detail', params: { id: accountItem.id } }"
		tag="li"
		class="acct-item d-flex justify-content-start"
		active-class="active">
		<font-awesome-icon icon="globe" class="align-self-center mr-3" />
		<div class="d-flex flex-column">
			<span>{{ accountItem.domain }}</span>
			<span class="text-muted">
				{{ accountItem.username | usernameValidate }}
			</span>
		</div>
	</router-link>
</template>

<script>
export default {
	props: { accountItem: Object },
	filters: {
		usernameValidate(value) {
			return value ? value : '(no username)'
		},
	},
}
</script>

<style scoped></style>
