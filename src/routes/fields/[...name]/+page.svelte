<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import BlogCard from '../../../components/BlogCard.svelte';
	import { getImageUrl } from '../../../utils/getImageUrl';
	import {
		Button,
		Breadcrumb,
		BreadcrumbItem,
		Dropdown,
		DropdownItem,
		Heading
	} from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';

	export let data: PageData;
	$: supabase = data?.supabase;

	$: path = $page.params.name;
	$: fields = path.split('/').filter((field) => field != '');
	$: currentField = fields.slice(-1)[0];

	$: pathMap = {};
	$: {
		let temp = '';
		fields.forEach((field) => {
			temp += field + '/';
			pathMap[field] = temp;
		});
	}
</script>

<Breadcrumb aria-label="path to the current tag" class="mx-4 mb-4">
	<BreadcrumbItem href="/" home>Home</BreadcrumbItem>
	{#each fields.slice(0, -1) as field}
		<BreadcrumbItem href="/fields/{pathMap[field]}"
			><Button color="light" outline class="border-0 text-black">{field}</Button></BreadcrumbItem
		>
	{/each}
	{#if data.tags.length > 0}
		<BreadcrumbItem>
			<Button color="light" outline class="border-0 text-black"
				>{currentField}<ChevronDownOutline size="sm" class="ml-2" /></Button
			>
			<Dropdown>
				{#each data.tags as tag}
					<DropdownItem href="/fields/{path}/{tag.name}">{tag.name}</DropdownItem>
				{/each}
			</Dropdown>
		</BreadcrumbItem>
	{:else}
		<BreadcrumbItem>{fields.slice(-1)[0]}</BreadcrumbItem>
	{/if}
</Breadcrumb>

<!-- TODO zenn風に各トピックのタイトルを表示-->
<!-- https://zenn.dev/topics/python -->

<div class="m-4">
	<Heading tag="h3">{currentField}</Heading>
</div>
{#if data?.resource?.length > 0}
	<div class="flex flex-row pb-4">
		<div class="p-4">
			{#each data?.resource as resource}
				{@const image_url = getImageUrl(supabase, resource?.id)}
				<BlogCard {resource} {image_url} />
			{/each}
		</div>
	</div>
{:else}
	<div class="p-4"><Heading tag="h4">このタグに該当する技術ブログはありません。</Heading></div>
{/if}
