<template>
	<!-- BUGS: not in one row? try uing grid in <main> -->
	<!-- TODO: :to change to Programmatic -->
	<!-- '/account/' + accountItem.id -->
	<router-link
		:to="{ name: 'addForm', params: { id: accountItem.id } }"
		tag="li"
		class="acct-item d-flex justify-content-start"
		active-class="active"
	>
		<font-awesome-icon icon="globe" class="align-self-center mr-3" />
		<div class="d-flex flex-column">
			<span>{{ accountItem.domain }}</span>
			<span class="text-muted">
				<!-- TODO: Try filter on line 15 -->
				{{ accountItem.username }}
			</span>
		</div>
	</router-link>
	<!-- <li class="acct-item d-flex justify-content-start">
		<font-awesome-icon icon="globe" class="align-self-center mr-3" />
		<div class="d-flex flex-column">
			<span>{{ accountItem.domain }}</span>
			<span class="text-muted">
				{{ accountItem.username }}
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
	props: { accountItem: Object },
};
</script>

<style scoped></style>
