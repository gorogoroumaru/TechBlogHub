<script lang="ts">
	import { Badge, Card } from 'flowbite-svelte';
	import type { Resource } from '../types/resource';
	import placeholderImg from '../placeholder.png';
	export let resource: Resource;
</script>

<Card
	img={resource?.image_url ?? placeholderImg}
	href="/detail/{resource?.id}"
	horizontal={false}
	reverse={false}
	class="m-2"
>
	<h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		{resource?.title}
	</h5>
	<p class="mt-4 text-xs text-gray-900 dark:text-white">
		{resource.created_at}
	</p>
	<div>
		{#each resource.tag_name.split(',') as tag}
			<Badge class="mt-2 mb-4 mr-1">{tag}</Badge>
		{/each}
	</div>
	<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight truncate">
		{resource?.description}
	</p>
</Card>
