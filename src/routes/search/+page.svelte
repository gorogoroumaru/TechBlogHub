<script lang="ts">
	import ListItem from '../../components/ListItem.svelte';
	import { Input, ButtonGroup, Button, Chevron, Dropdown, DropdownItem } from 'flowbite-svelte';

	let tag = '';
	let list: any[] = [];

	// https://flowbite-svelte-blocks.vercel.app/application/table-headers

	async function handleSearch(event: any) {
		tag = (event?.target as HTMLInputElement)?.value;
		// TODO tagだけでなくタイトルでも検索できるようにする
		// タイトルにfulltext indexを作成する
		// https://tech.smartshopping.co.jp/mysql_fulltextindex
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

<!-- TODO categoryのリストを作成し、dropdownにする　-->
<div class="searchbar">
	<ButtonGroup class="w-full mb-5">
		<Button
			color="none"
			class="flex-shrink-0 text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-200 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
		>
			<Chevron>All categories</Chevron>
		</Button>
		<Dropdown>
			<DropdownItem
				on:click={() => {
					console.log('hoge');
				}}>Shopping</DropdownItem
			>
			<DropdownItem>Images</DropdownItem>
			<DropdownItem>News</DropdownItem>
			<DropdownItem>Finance</DropdownItem>
		</Dropdown>
		<Input placeholder="Search" on:change={handleSearch} />
		<Button color="primary" class="!p-2.5 bg-blue-500" type="submit">
			<svg
				class="w-5 h-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/></svg
			>
		</Button>
	</ButtonGroup>
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
</div>

<style>
	.searchbar {
		margin: 10px;
	}
</style>
