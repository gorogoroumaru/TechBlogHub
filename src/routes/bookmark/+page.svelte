<script lang="ts">
	import BlogCard from '../../components/BlogCard.svelte';
	import Pagination from '../../components/Pagination.svelte';
	import { getImageUrl } from '../../utils/getImageUrl';
	import type { PageData } from './$types';

	export let data: PageData;
	$: supabase = data?.supabase;
</script>

{#if data?.bookmarks}
	<div class="flex flex-row flex-wrap">
		{#each data?.bookmarks as resource}
			{@const image_url = getImageUrl(supabase, resource?.id)}
			<BlogCard {resource} {image_url} />
		{/each}
	</div>
	<div class="flex justify-center">
		<Pagination numberOfBlogs={Number(data.bookmarkCount)} urlPrefix="/bookmark" />
	</div>
{/if}
