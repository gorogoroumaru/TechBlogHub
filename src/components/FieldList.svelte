<script lang="ts">
	export let fields: any[];
</script>

{#each fields as field}
	<a
		href="/fields/{field.name}"
		class="mx-4 mb-4 relative flex h-full flex-col rounded-md border border-gray-200 bg-white p-2.5 hover:border-gray-400 sm:rounded-lg sm:p-5"
		><span class="text-md mb-0 font-semibold text-gray-900 hover:text-black sm:mb-1.5 sm:text-xl"
			>{field.name}</span
		><span class="hidden text-sm leading-normal text-gray-400 sm:block"
			>{field.name}に関する良記事一覧</span
		></a
	>
{/each}
