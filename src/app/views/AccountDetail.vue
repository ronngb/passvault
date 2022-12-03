<template>
	<form class="acct-detail-form">
		<!-- NOTE: possible 2 scenario regarding on input -->
		<!-- 1: while in readonly mode the background color on input should be darer compared to original -->
		<!-- 2: while in readonly mode the box-shadow will be outside the input -->
		<NeumorpInput
			id="website"
			type="text"
			label="Website"
			v-model="account.url">
			<BaseIcon icon="globe" class="input-type-icon" />
		</NeumorpInput>
		<!-- <BaseInput v-model="account.url" label="Website" readonly /> -->
		<div>
			<NeumorpInput
				id="website"
				type="text"
				label="Website"
				v-model="account.username">
				<BaseIcon icon="user" class="input-type-icon" />
			</NeumorpInput>
			<!-- <BaseInput v-model="account.username" label="Username" readonly /> -->
			<button
				class="btn-sm"
				type="button"
				@click="toClipboard(account.username, $event)">
				<font-awesome-icon :icon="['fas', 'copy']" class="icons copy-icon" />
			</button>
		</div>
		<div>
			<NeumorpInput
				id="password"
				type="password"
				label="Password"
				v-model="account.password"
				maxlength="22">
				<BaseIcon icon="lock" class="input-type-icon" />
			</NeumorpInput>
			<!-- <BaseInput
				v-model="account.password"
				label="Password"
				:type="'password'"
				readonly /> -->
			<button
				class="btn-sm"
				type="button"
				@click="toClipboard(account.password, $event)">
				<font-awesome-icon :icon="['fas', 'copy']" class="icons copy-icon" />
			</button>
		</div>
		<div class="buttons-container">
			<button
				@click="animatePressed(account.id, $event)"
				type="submit"
				class="btn-lg btn-save">
				Save
			</button>
			<button
				@click="animatePressed($event)"
				type="button"
				class="btn-lg btn-cancel">
				Cancel
			</button>
		</div>
	</form>
</template>

<script>
import BaseInput from '../components/base/BaseInput.vue'
import NeumorpInput from '../components/neumorp/NeumorpInput.vue'

export default {
	name: 'AccountDetail',
	components: { BaseInput, NeumorpInput },
	props: {
		account: {
			type: Object,
			required: true,
		},
	},
	mounted() {
		console.log(this.account)
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
	// display: flex;
	// flex-direction: column;
	// justify-content: space-evenly;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	padding: 0 1.2rem;
	height: calc(80vh - 57.8px);
}

input {
	// display: inline-block;
	// text-indent: 0;
}
button {
	margin: 0 20px;
}

.btn-sm:hover .copy-icon {
	// color: $color-primary;
}

.btn-sm.active .copy-icon {
	// color: $color-primary;
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
