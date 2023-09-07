<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import type { Resource } from '../types/resource';
	import placeholderImg from '../placeholder.png';
	export let resource: Resource;
	export let image_url: string;
</script>

<a
	class="md:flex mb-4 w-full border border-gray-200 bg-white hover:border-gray-400"
	href="/detail/{resource?.id}"
>
	<!-- svelte-ignore a11y-missing-attribute -->
	<div>
		<img
			class="md:h-full object-cover"
			src={image_url}
			on:error={(event) => {
				event.target.src = placeholderImg;
				event.onerror = null;
			}}
			width="400"
			height="200"
		/>
	</div>
	<div
		class="w-full border-r border-b border-l border-gray-100 lg:border-t bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal"
	>
		<div class="mb-4">
			<div class="text-gray-900 font-bold text-xl mb-2 overflow-hidden max-h-14">
				{resource?.title}
			</div>
			<p class="text-gray-700 text-base overflow-hidden max-h-12">
				{resource?.description}
			</p>
		</div>
		<div class="flex items-center">
			<div class="text-sm">
				<p class="text-gray-900 leading-none">{resource.user_name}</p>
				<p class="text-gray-600">{resource.created_at}</p>
				<div class="overflow-hidden">
					{#each resource.tag_name.split(',') as tag}
						<Badge class="mt-2 mr-1">{tag}</Badge>
					{/each}
				</div>
			</div>
		</div>
	</div>
</a>
