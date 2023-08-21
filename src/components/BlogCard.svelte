<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import type { Resource } from '../types/resource';
	import placeholderImg from '../placeholder.png';
	export let resource: Resource;
	export let image_url: string;
</script>

<a
	class="w-full lg:max-w-full flex mb-8 shadow-sm transition hover:shadow-lg"
	href="/detail/{resource?.id}"
>
	<!-- svelte-ignore a11y-missing-attribute -->
	<img
		class="object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
		src={image_url}
		on:error={(event) => {
			event.target.src = placeholderImg;
		}}
		height="100%"
		width="30%"
	/>
	<div
		class="w-full border-r border-b border-l border-gray-100 lg:border-t bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
	>
		<div class="mb-8">
			<div class="text-gray-900 font-bold text-xl mb-2">
				{resource?.title}
			</div>
			<p class="text-gray-700 text-base">
				{resource?.description}
			</p>
		</div>
		<div class="flex items-center">
			<div class="text-sm">
				<p class="text-gray-900 leading-none">{resource.user_name}</p>
				<p class="text-gray-600">{resource.created_at}</p>
				<div>
					{#each resource.tag_name.split(',') as tag}
						<Badge class="mt-2 mb-4 mr-1">{tag}</Badge>
					{/each}
				</div>
			</div>
		</div>
	</div>
</a>
