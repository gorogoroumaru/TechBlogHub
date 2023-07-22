<script lang="ts">
	import {
		Input,
		ButtonGroup,
		Button,
		Chevron,
		Dropdown,
		DropdownItem,
		Card
	} from 'flowbite-svelte';
	import { fields } from '../../data/fields';

	export let form;
	$: resources = form?.resource || [];
	let tag = '';
	let tagName = '';
	let keyword = '';
</script>

<div class="searchbar">
	<form method="POST">
		<ButtonGroup class="w-full mb-5">
			<Button
				color="none"
				class="flex-shrink-0 text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-200 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
			>
				<Chevron>{tag.length > 0 ? tagName : '全てのカテゴリ'}</Chevron>
			</Button>
			<Dropdown>
				{#each fields as field}
					<DropdownItem
						on:click={() => {
							tag = field.value;
							tagName = field.name;
						}}>{field.name}</DropdownItem
					>
				{/each}
			</Dropdown>
			<Input placeholder="Search" bind:value={keyword} name="keyword" id="keyword" />
			<Button color="primary" class="!p-2.5 bg-sky-500 hover:bg-sky-700" type="submit">
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
		<div class="hidden">
			<Input bind:value={tag} name="tag" id="tag" />
		</div>
		{#each resources as resource}
			<div class="mb-4">
				<Card
					img={resource?.image_url}
					href="/detail/{resource?.id}"
					horizontal={false}
					reverse={false}
				>
					<h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
						{resource?.title}
					</h5>
					<span class="mt-4 mb-8 text-xs text-gray-900 dark:text-white">
						{resource?.tag_name} / {resource?.created_at}
					</span>
					<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight truncate">
						{resource?.description}
					</p>
				</Card>
			</div>
		{/each}
	</form>
</div>

<style>
	.searchbar {
		margin: 10px;
	}
</style>
