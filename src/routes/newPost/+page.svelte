<script lang="ts">
	import BlogCard from '../../components/BlogCard.svelte';
	import Pagination from '../../components/Pagination.svelte';
	import { getImageUrl } from '../../utils/getImageUrl';
	import type { PageData } from './$types';

	export let data: PageData;
	$: supabase = data?.supabase;
</script>

{#if data?.resource}
	<div class="flex flex-row flex-wrap">
		{#each data?.resource as resource}
			{@const image_url = getImageUrl(supabase, resource?.id)}
			<BlogCard {resource} {image_url} />
		{/each}
	</div>
	<div class="flex justify-center">
		<Pagination numberOfBlogs={Number(data.count)} urlPrefix="/newPost" />
	</div>
{/if}
