<template>
	<form class="acct-detail-form">
		<BaseInput v-model="account.url" label="Website" readonly />
		<div>
			<BaseInput v-model="account.username" label="Username" readonly />
			<button
				class="btn-sm"
				type="button"
				@click="toClipboard(account.username, $event)">
				<font-awesome-icon :icon="['fas', 'copy']" class="icons copy-icon" />
			</button>
		</div>
		<div>
			<BaseInput
				v-model="account.password"
				label="Password"
				:type="'password'"
				readonly />
			<button
				class="btn-sm"
				type="button"
				@click="toClipboard(account.password, $event)">
				<font-awesome-icon :icon="['fas', 'copy']" class="icons copy-icon" />
			</button>
		</div>
	</form>
</template>

<script>
import BaseInput from '../components/base/BaseInput.vue'

export default {
	name: 'AccountDetail',
	components: { BaseInput },
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
		toClipboard(txtCopied, event) {
			let evt = event.currentTarget
			evt.disabled = true
			evt.classList.toggle('active')
			navigator.clipboard.writeText(txtCopied).then(
				setTimeout(() => {
					evt.disabled = false
					evt.classList.toggle('active')
				}, 4000)
			)
		},
	},
}
</script>

<style lang="scss" scoped>
.acct-detail-form {
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
}

input {
	display: inline-block;
	text-indent: 0;
}
button {
	margin: 0 20px;
}

.btn-sm:hover .copy-icon {
	color: $color-primary;
}

.btn-sm.active .copy-icon {
	color: $color-primary;
}
.slide-fade-enter {
	transform: translateX(-10px);
	opacity: 0;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
	transition: all 250ms ease;
}

.slide-fade-leave-to {
	transform: translateX(-10px);
	opacity: 0;
}
</style>
