<template>
	<form class="acct-info__form">
		<!-- Username Start -->
		<div class="form-row">
			<div class="form-group col-8 col-md-5">
				<label>Username</label>
				<input
					id="username"
					type="text"
					class="form-control-plaintext"
					:value="account.username"
					placeholder="notSure"
					readonly />
			</div>
			<!-- If this div is false the copied button is undisplay -->
			<!-- @click="toClipboard(account.username, 'isUser')" -->
			<div class="form-group col-4 col-md-5 align-self-end">
				<button
					@click="toClipboard($event.target)"
					type="button"
					class="btn btn-default btn-light px-lg-4">
					<font-awesome-icon icon="copy" class="mr-1" />
					<!-- 					<span v-if="isUser" class="text-muted">Copied!</span>
					<span v-if="!isUser" class="text-muted">Copy</span>
 -->
				</button>
			</div>
		</div>
		<!-- Password Start -->
		<div class="form-row">
			<div class="form-group col-8 col-md-5">
				<label>Password</label>
				<input
					id="password"
					class="form-control-plaintext"
					type="text"
					@input="inputForm.password = $event.target.value"
					:value="account.password"
					readonly />
			</div>
			<div class="form-group col-4 col-md-5 align-self-end">
				<!-- TODO: Try passing $event as 2nd arguement toClipboard()-->
				<button
					@click="toClipboard(account.password, 'isPass')"
					type="button"
					class="btn btn-default btn-light px-lg-4">
					<font-awesome-icon icon="copy" class="mr-1" />
					<!-- <span v-if="isPass" class="text-muted">Copied!</span>
					<span v-if="!isPass" class="text-muted">Copy</span> -->
				</button>
			</div>
		</div>
	</form>
</template>

<script>
export default {
	computed: {
		account() {
			return this.$store.getters.getAccount(this.$route.params.id);
		},
	},
};
</script>

<style></style>
