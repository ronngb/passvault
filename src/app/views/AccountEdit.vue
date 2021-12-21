<template>
	<form class="acct-info__form">
		<!-- Username Start -->
		<div class="form-row">
			<div class="form-group col-8 col-md-5">
				<label>Username</label>
				<input
					id="username"
					type="text"
					class="form-control"
					v-model="formData.username" />
			</div>
		</div>
		<!-- Password Start -->
		<div class="form-row">
			<div class="form-group col-8 col-md-5">
				<label>Password</label>
				<input
					id="password"
					type="password"
					:class="{ 'is-invalid': hasError, 'form-control': true }"
					v-model="formData.password" />
				<div v-if="hasError" class="invalid-feedback">
					Your password is required.
				</div>
			</div>
		</div>
		<!-- EDIT BUTTONS -->
		<div class="acct-edit_buttons">
			<button
				@click="updateAccount(account.id)"
				type="button"
				class="btn btn-default btn-light mr-1">
				Save
			</button>
			<button
				@click="$router.go(-1)"
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
			hasError: false,
			formData: { username: '', password: '' },
		};
	},
	mounted() {
		this.initFormData();
	},
	computed: {
		account() {
			return this.$store.getters.getAccount(this.$route.params.id);
		},
	},
	methods: {
		initFormData() {
			for (let prop in this.formData)
				this.formData[prop] = this.account[prop];
		},
		updateAccount(id) {
			if (this.formData.password == '') {
				this.hasError = true;
			} else {
				const accountObj = {
					...this.formData,
					accountId: id,
				};
				this.$store.dispatch('updateAccount', accountObj);
			}
		},
	},
};
</script>

<style></style>
