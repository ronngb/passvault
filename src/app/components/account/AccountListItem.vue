<template>
	<router-link
		:to="'/account/d' + acctItem.id"
		tag="li"
		class="acct-item d-flex justify-content-start"
		active-class="active"
	>
		<font-awesome-icon icon="globe" class="align-self-center mr-3" />
		<div class="d-flex flex-column">
			<span>{{ acctItem.domain }}</span>
			<span class="text-muted">
				{{ acctItem.username }}
			</span>
		</div>
	</router-link>
	<!-- <li class="acct-item d-flex justify-content-start">
		<font-awesome-icon icon="globe" class="align-self-center mr-3" />
		<div class="d-flex flex-column">
			<span>{{ acctItem.domain }}</span>
			<span class="text-muted">
				{{ acctItem.username }}
				{{ hasUsername(list.username) }}
			</span>
		</div>
	</li> -->
	<!-- <li
		class="acct-item d-flex justify-content-start"
		v-for="(list, index) in acctList.acctData"
		:key="list.id"
		@click="$emit('changeFocus', index), setFocus(list.id)"
		:class="{ active: list.id === focusId }"
	>
		<font-awesome-icon icon="globe" class="align-self-center mr-3" />
		<div class="d-flex flex-column">
			<span>{{ list.domain }}</span>
			<span class="text-muted">{{ hasUsername(list.username) }}</span>
		</div>
	</li> -->
</template>

<script>
export default {
	props: ['acctItem'],
};
</script>

<style scoped></style>
