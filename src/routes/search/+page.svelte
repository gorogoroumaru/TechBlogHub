<script>
	import BottomNavigation from '../../components/BottomNavigation.svelte';
	import Input from '../../components/Input.svelte';
	let keyword = '';
</script>

<Input
	placeholder="検索キーワードを入力して下さい"
	isSearchBar={true}
	on:change={(event) => {
		console.log(event.target.value);
	}}
/>
<div>Value: {keyword}</div>

<BottomNavigation active="Search" />

<style>
	div {
		margin: 10px;
	}
</style>
