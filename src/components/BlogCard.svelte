<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import type { Resource } from '../types/resource';
	import placeholderImg from '../placeholder.png';
	export let resource: Resource;
</script>

<a
	href="/detail/{resource?.id}"
	class="m-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow md:flex-row lg:max-w-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
>
	<img
		class="object-cover w-full rounded-t-lg md:rounded-none md:rounded-l-lg"
		src={resource?.image_url ?? placeholderImg}
		width={200}
		height={100}
		alt=""
	/>
	<div class="flex flex-col justify-between p-4 leading-normal">
		<h3 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			{resource?.title}
		</h3>
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
	</div>
</a>
