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
					:value="account.username | usernameValidate"
					readonly />
			</div>
			<div class="form-group col-4 col-md-5 align-self-end">
				<button
					@click="toClipboard(account.username, $event.target)"
					type="button"
					class="btn btn-default btn-light px-lg-4">
					<font-awesome-icon icon="copy" class="mr-1" />
					<span class="text-muted">Copy</span>
				</button>
			</div>
		</div>
		<!-- Password Start -->
		<div class="form-row">
			<div class="form-group col-8 col-md-5">
				<label>Password</label>
				<input
					id="password"
					type="password"
					class="form-control-plaintext"
					:value="account.password"
					readonly />
			</div>
			<div class="form-group col-4 col-md-5 align-self-end">
				<button
					@click="toClipboard(account.password, $event.target)"
					type="button"
					class="btn btn-default btn-light px-lg-4">
					<font-awesome-icon icon="copy" class="mr-1" />
					<span class="text-muted">Copy</span>
				</button>
			</div>
		</div>
	</form>
</template>

<script>
export default {
	name: 'AccountDetail',
	props: {
		account: {
			type: Object,
			required: true,
		},
	},
	filters: {
		usernameValidate(value) {
			return value ? value : '(no username)'
		},
	},
	methods: {
		toClipboard(txtCopied, evt) {
			evt.disabled = true
			evt.children[1].innerText = 'Copied'
			navigator.clipboard.writeText(txtCopied).then(
				setTimeout(() => {
					evt.disabled = false
					evt.children[1].innerText = 'Copy'
				}, 4000)
			)
		},
	},
}
</script>

<style></style>
