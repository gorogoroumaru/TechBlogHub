<script>
	import BottomNavigation from '../components/BottomNavigation.svelte';

	import { goto } from '$app/navigation';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<!-- BottomNavigationをなくす　-->

<div class="AppHeader_inner__Nqogt">
	<a class="AppHeader_homeLink__sgij0" href="/"
		><svg
			x="0px"
			y="0px"
			viewBox="0 0 377.4 88.3"
			aria-label="Zenn | エンジニアのための情報共有コミュニティ"
			height="22"
		>
			<title>Zenn</title>
			<g fill="#111">
				<path
					d="M233,56.8h-39c0.5,3.5,2.2,6.8,4.8,9.2c2.7,2.3,6.2,3.5,9.8,3.4c2.8,0,5.6-0.5,8.2-1.7c2.5-1.1,4.8-2.8,6.5-5l8.2,9.5 c-2.5,3.4-5.7,6.1-9.5,7.9c-4.6,2.2-9.6,3.3-14.7,3.2c-5.7,0.1-11.4-1.2-16.5-4c-4.5-2.5-8.2-6.3-10.7-10.9s-3.8-9.8-3.7-15.1v-2.2 c-0.1-5.7,1.1-11.3,3.5-16.5c2.2-4.7,5.7-8.6,10.1-11.3c4.7-2.8,10.1-4.2,15.5-4.1c5.2-0.1,10.3,1.1,14.9,3.7 c4.1,2.5,7.4,6.2,9.4,10.5c2.2,5.1,3.3,10.5,3.2,16.1V56.8z M216.1,43.9c0.1-2.9-0.9-5.7-2.8-7.9c-1.8-1.9-4.4-2.9-7.9-2.9 c-2.9-0.1-5.8,1.1-7.7,3.2c-2,2.6-3.3,5.7-3.6,9h22V43.9z"
				/>
				<path d="M128.3,67.9h36.1v14.7h-56.9V72l35.8-54.3h-36.2V2.9h56.6v10.4L128.3,67.9z" />
				<path
					d="M248.8,50.7c0-19.1,12.7-29.2,28.2-29.2s27.9,10.1,27.9,29.2V82h-16V51.4c0-10.6-4.8-16.1-12-16.1s-12.4,5.5-12.4,16.1 v30.7h-15.8L248.8,50.7L248.8,50.7z"
				/>
				<path
					d="M320.3,50.7c0-19.1,12.7-29.2,28.2-29.2s27.9,10.1,27.9,29.2V82h-16V51.4c0-10.6-4.8-16.1-12-16.1S336,40.8,336,51.4v30.7 h-15.8L320.3,50.7L320.3,50.7z"
				/>
			</g>
			<path
				fill="#3EA8FF"
				class="st0"
				d="M2.4,83.3h17c0.9,0,1.7-0.5,2.2-1.2L68.4,5.2C69,4.2,68.3,3,67.1,3H51c-0.8,0-1.5,0.4-1.9,1.1L1.6,81.9 C1.3,82.5,1.7,83.3,2.4,83.3z"
			/>
			<path
				fill="#3EA8FF"
				class="st0"
				d="M61,82.1l22.1-35.5c0.7-1.1-0.1-2.5-1.4-2.5H65.7c-0.6,0-1.2,0.3-1.5,0.8L41.5,81.2c-0.6,0.9,0.1,2.1,1.2,2.1 h16.3C59.8,83.3,60.6,82.9,61,82.1z"
			/></svg
		></a
	>
	<div class="FadeIn_fadeIn__O8JSZ">
		<div class="AppHeader_actionsArea__XPo58">
			<a aria-label="検索" class="AppHeader_searchLink__z70oa" id="header-search" href="/search"
				><svg viewBox="0 0 27 27" height="23" width="23">
					<path
						d="M11.56,3.43a8.26,8.26,0,0,0,0,16.52,8.18,8.18,0,0,0,5-1.72l4.7,4.7a1.1,1.1,0,0,0,1.56,0,1.09,1.09,0,0,0,0-1.55l0,0-4.7-4.7a8.18,8.18,0,0,0,1.72-5A8.28,8.28,0,0,0,11.56,3.43Zm0,2.2A6.06,6.06,0,1,1,5.5,11.69,6,6,0,0,1,11.56,5.63Z"
						fill="currentColor"
					/></svg
				></a
			>
			<button on:click={() => goto('/login')} class="AppHeader_signInLink__K1JEF">Log in</button>
		</div>
	</div>
</div>

<slot />
<BottomNavigation />

<style>
	.AppHeader_inner__Nqogt {
		justify-content: space-between;
		height: var(--header-height);
		padding: 24px;
	}

	.AppHeader_actionsArea__XPo58,
	.AppHeader_homeLink__sgij0,
	.AppHeader_inner__Nqogt,
	.AppHeader_searchLink__z70oa {
		display: flex;
		align-items: center;
	}

	.AppHeader_signInLink__K1JEF {
		font-family: 'Inter', 'BlinkMacSystemFont', Arial, sans-serif;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 80px;
		height: 36px;
		padding: 0;
		margin-left: 22px;
		font-size: 15px;
		font-weight: 600;
		color: white;
		background: #3ea8ff;
	}
</style>
