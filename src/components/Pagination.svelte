<script lang="ts">
	import { Pagination, ChevronLeft, ChevronRight } from 'flowbite-svelte';

	export let numberOfBlogs: number;
	let currentPage: number = 0;

	function generatePages(len: number) {
		let pages = [];
		for (let i = 0; i < Math.ceil(len / 10); i++) {
			if (i === currentPage) {
				pages.push({ name: i + 1, href: `/?page=${i}`, active: true });
			} else {
				pages.push({ name: i + 1, href: `/?page=${i}`, active: false });
			}
		}
		return pages;
	}

	function handleClick(event: any) {
		currentPage = event.target.text - 1;
	}
</script>

{#if numberOfBlogs > 0}
	<Pagination class="m-2" pages={generatePages(numberOfBlogs)} on:click={handleClick} icon>
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
