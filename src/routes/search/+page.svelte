<script lang="ts">
	import { Input, ButtonGroup, Button, Chevron, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { fields } from '../../data/fields';
	import BlogCard from '../../components/BlogCard.svelte';
	import { getImageUrl } from '../../utils/getImageUrl';
	import type { PageData } from './$types';

	export let data: PageData;
	$: supabase = data?.supabase;

	export let form;
	$: resources = form?.resource || [];
	let tag = '';
	let tagName = '';
	let keyword = '';

	console.log(resources);

	let dropdownOpen = false;
</script>

<div class="m-4">
	<form method="POST">
		<ButtonGroup class="w-full mb-5">
			<Button
				color="none"
				class="flex-shrink-0 text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-200 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
			>
				<Chevron>{tag.length > 0 ? tagName : '全てのカテゴリ'}</Chevron>
			</Button>
			<Dropdown bind:open={dropdownOpen}>
				{#each fields as field}
					<DropdownItem
						on:click={() => {
							tag = field.value;
							tagName = field.name;

							dropdownOpen = false;
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
		<div class="mb-4 flex flex-row flex-wrap">
			{#each resources as resource}
				{@const image_url = getImageUrl(supabase, resource?.id)}
				<BlogCard {resource} {image_url} />
			{/each}
		</div>
	</form>
</div>
