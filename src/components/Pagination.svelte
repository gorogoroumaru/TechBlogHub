<script lang="ts">
	import { Pagination, ChevronLeft, ChevronRight } from 'flowbite-svelte';
	import type { LinkType } from 'flowbite-svelte/dist/types';

	export let numberOfBlogs: number;
	export let urlPrefix: string;
	let currentPage: number = 0;

	function generatePages(len: number) {
		let pages: LinkType[] = [];
		for (let i = 0; i < Math.ceil(len / 10); i++) {
			if (i === currentPage) {
				pages.push({ name: JSON.stringify(i + 1), href: `${urlPrefix}/?page=${i}` });
			} else {
				pages.push({ name: JSON.stringify(i + 1), href: `${urlPrefix}/?page=${i}` });
			}
		}
		return pages;
	}

	$: pages = generatePages(numberOfBlogs);
	$: numPages = pages.length;

	function handleClick(event: any) {
		currentPage = event.target.text - 1;
	}

	const previous = () => {
		currentPage = (currentPage - 1) % numPages;
	};
	const next = () => {
		currentPage = (currentPage + 1) % numPages;
	};
</script>

{#if numberOfBlogs > 0}
	<Pagination class="m-2" {pages} on:click={handleClick} on:next={next} on:previous={previous} icon>
		<svelte:fragment slot="prev">
			<span class="sr-only">前へ</span>
			<ChevronLeft class="w-5 h-5" />
		</svelte:fragment>
		<svelte:fragment slot="next">
			<span class="sr-only">次へ</span>
			<ChevronRight class="w-5 h-5" />
		</svelte:fragment>
	</Pagination>
{/if}
