<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import BlogCard from '../../../components/BlogCard.svelte';
	import { getImageUrl } from '../../../utils/getImageUrl';
	import {
		Breadcrumb,
		BreadcrumbItem,
		Sidebar,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';

	// TODO 画面サイズが小さければsidebarではなく、Breadcrumbからのdropdownにするのもあり

	export let data: PageData;
	$: supabase = data?.supabase;

	$: path = $page.params.name;
	$: fields = path.split('/').filter((field) => field != '');

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
	{#each fields as field, i}
		<BreadcrumbItem href="/fields/{pathMap[field]}">{field}</BreadcrumbItem>
	{/each}
</Breadcrumb>

<div class="flex flex-row mb-4">
	<div class="w-64 bg-gray-50">
		{#if data.tags.length > 0}
			<Sidebar class="h-full">
				<SidebarWrapper>
					<SidebarGroup>
						{#each data.tags as tag}
							<SidebarItem label={tag.name} href="{path}/{tag.name}" />
						{/each}
					</SidebarGroup>
				</SidebarWrapper>
			</Sidebar>
		{:else}
			<div class="w-64" />
		{/if}
	</div>

	{#if data?.resource?.length > 0}
		<div class="mx-4">
			{#each data?.resource as resource}
				{@const image_url = getImageUrl(supabase, resource?.id)}
				<BlogCard {resource} {image_url} />
			{/each}
		</div>
	{:else}
		<div class="mx-4"><p>このタグに該当する技術ブログはありません。</p></div>
	{/if}
</div>
