<template>
	<form class="acct-info__form">
		<!-- Username Start -->
		<div class="form-row">
			<div class="form-group col-8 col-md-5">
				<label>Username</label>
				<input
					type="text"
					class="form-control"
					@input="
						$emit('update', [$event.target]),
							(inputForm.username = $event.target.value)
					"
					:value="account.username"
					id="username" />
			</div>
		</div>
		<!-- Password Start -->
		<div class="form-row">
			<div class="form-group col-8 col-md-5">
				<label>Password</label>
				<input
					type="password"
					:class="{ 'is-invalid': isError, 'form-control': true }"
					@input="inputForm.password = $event.target.value"
					:value="account.password"
					id="password" />
				<div v-if="isError" class="invalid-feedback">
					Your password is required.
				</div>
			</div>
		</div>
		<!-- EDIT BUTTONS -->
		<div class="acct-edit_buttons">
			<button
				@click="editAcct(account.id)"
				type="button"
				class="btn btn-default btn-light mr-1">
				Save
			</button>
			<button
				@click="onEdit(account.id)"
				type="button"
				class="btn btn-default btn-light ml-1">
				Cancel
			</button>
		</div>
	</form>
</template>

<script>
export default {
	data() {
		return {
			isError: false,
			formData: { username: '', password: '' },
		};
	},

	computed: {
		account() {
			return this.$store.getters.getAccount(this.$route.params.id);
		},
	},
};
</script>

<style></style>
