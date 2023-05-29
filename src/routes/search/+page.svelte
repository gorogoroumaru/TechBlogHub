<script lang="ts">
	import BottomNavigation from '../../components/BottomNavigation.svelte';
	import Input from '../../components/Input.svelte';
	import ListItem from '../../components/ListItem.svelte';

	let tag = '';
	let list: any[] = [];
</script>

<Input
	placeholder="検索キーワードを入力して下さい"
	isSearchBar={true}
	on:change={async (event) => {
		tag = event.target.value;
		const response = await fetch(`/list?tag=${tag}`, {
			method: 'GET'
		});
		const data = await response.json();
		list = data.rows;
		if (!response.ok) {
			throw new Error('search request failed');
		}
	}}
/>

{#each list as resource}
	<ListItem
		url={resource.url}
		image={resource.image_url}
		title={resource.title}
		summary={resource.description}
		metadata={tag}
		created={resource.created_at}
	/>
{/each}

<BottomNavigation active="Search" />

<style>
	div {
		margin: 10px;
	}
</style>
