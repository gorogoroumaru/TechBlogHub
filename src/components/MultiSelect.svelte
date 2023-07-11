<script lang="ts">
	import { twJoin, twMerge } from 'tailwind-merge';
	import { createEventDispatcher } from 'svelte';
	import { Badge } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { CloseButton } from 'flowbite-svelte';

	const dispatch = createEventDispatcher();

	export let items: any = [];
	export let value: (string | number)[] = [];
	export let size = 'lg';
	export let dropdownClass: string = '';

	let selectItems: any = [];
	let show: boolean = false;

	const sizes: any = {
		sm: 'px-2 py-1',
		md: 'px-3 py-2',
		lg: 'px-4 py-3'
	};

	// Container
	const multiSelectClass: string = `relative border border-gray-300 flex items-center rounded-lg gap-2 dark:border-gray-600 focus-within:ring-1 focus-within:border-primary-500 ring-primary-500 dark:focus-within:border-primary-500 dark:ring-primary-500`;

	// Dropdown
	let multiSelectDropdown: string;
	$: multiSelectDropdown = twMerge(
		'absolute p-3 flex flex-col gap-1 max-h-64 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white left-0 top-[calc(100%+1rem)] rounded-lg cursor-pointer overflow-y-scroll w-full bg-white',
		dropdownClass
	);

	// Items
	const itemsClass: string =
		'py-2 px-3 rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600';
	// Selected items
	const itemsSelectClass: string = 'bg-gray-100 text-bg-gray-900 dark:text-white dark:bg-gray-600';

	onMount(() => {
		if (value.length) {
			items.map((item: any) => {
				if (value.includes(item.value)) {
					selectItems.push(item);
				}
			});
		}
	});

	const selectOption = (select: any) => {
		if (selectItems.includes(select)) {
			clearThisOption(select);
		} else {
			selectItems.push(select);
			value.push(select.value);
			selectItems = selectItems;
			value = value;
			dispatch('selected', selectItems);
		}
	};

	const clearAll = (e: MouseEvent) => {
		e.stopPropagation();
		selectItems = [];
		value = [];
		dispatch('selected', selectItems);
	};

	const clearThisOption = (select: any) => {
		if (selectItems.includes(select)) {
			selectItems = selectItems.filter((o: any) => o !== select);
			dispatch('selected', selectItems);
		}
		if (value.includes(select.value)) {
			value = value.filter((o) => o !== select.value);
		}
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	on:click={() => (show = !show)}
	on:focusout={() => (show = false)}
	tabindex="-1"
	role="listbox"
	class={twJoin(multiSelectClass, sizes[size], $$props.class)}
>
	<span class="flex gap-2 flex-wrap">
		{#if selectItems.length}
			{#each selectItems as item (item.name)}
				<slot {item} clear={() => clearThisOption(item)}>
					<Badge
						color="dark"
						large={size === 'lg'}
						dismissable
						params={{ duration: 100 }}
						on:dismiss={() => clearThisOption(item)}
					>
						{item.name}
					</Badge>
				</slot>
			{/each}
		{/if}
	</span>
	<div class="flex ml-auto gap-2">
		<CloseButton on:click={clearAll} color="none" class="p-0 focus:ring-gray-400" />
	</div>
	{#if show}
		<div class={multiSelectDropdown}>
			{#each items as item (item.name)}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					on:click|stopPropagation={(e) => selectOption(item)}
					role="presentation"
					class={twMerge(itemsClass, selectItems.includes(item) && itemsSelectClass)}
				>
					{item.name}
				</div>
			{/each}
		</div>
	{/if}
</div>
