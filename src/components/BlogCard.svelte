<script lang="ts">
	import { Badge } from 'flowbite-svelte';
	import type { Resource } from '../types/resource';
	import placeholderImg from '../placeholder.png';
	export let resource: Resource;
	export let image_url: string;
</script>

<a class="flex flex-col justify-center m-4 bg-white" href="/detail/{resource?.id}">
	<div
		class="flex h-full md:w-full flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 border mx-auto border-white"
	>
		<div class="w-full md:w-1/3 bg-white grid place-items-center">
			<!-- svelte-ignore a11y-missing-attribute -->
			<img
				class="rounded-xl aspect-[9/5] sm:w-full"
				src={image_url}
				on:error={(event) => {
					event.target.src = placeholderImg;
					event.onerror = null;
				}}
			/>
		</div>
		<div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
			<div class="flex justify-between item-center">
				<p class="text-gray-500 font-medium hidden md:block">
					{#each resource.tag_name.split(',') as tag}
						<Badge class="mr-1">{tag}</Badge>
					{/each}
				</p>
				<div
					class="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block"
				>
					{resource.user_name}
				</div>
			</div>
			<h3 class="font-black text-gray-800 md:text-3xl text-xl">
				{resource?.title}
			</h3>
			<p class="md:text-lg text-gray-500 text-base">
				{resource?.description}
			</p>
		</div>
	</div>
</a>
