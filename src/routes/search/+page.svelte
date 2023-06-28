<script lang="ts">
	import Input from '../../components/Input.svelte';
	import ListItem from '../../components/ListItem.svelte';

	let tag = '';
	let list: any[] = [];

	async function handleSearch(event: any) {
		tag = (event?.target as HTMLInputElement)?.value;
		const response = await fetch(`/list?tag=${tag}`, {
			method: 'GET'
		});
		const data = await response.json();
		list = data.rows;
		if (!response.ok) {
			throw new Error('search request failed');
		}
	}
</script>

<div class="searchbar">
	<Input placeholder="検索キーワードを入力して下さい" isSearchBar={true} on:change={handleSearch} />
</div>

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

<style>
	.searchbar {
		margin: 10px;
	}
</style>
