<script lang="ts">
	import '../app.postcss';

	import { goto } from '$app/navigation';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Footer, FooterCopyright, FooterLinkGroup, FooterLink, Button } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	$: user_id = data.session?.user.id;

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

<div class="flex justify-between p-8">
	<a class="flex items-center" href="/">
		<svg viewBox="0 0 27 27" height="23" width="23">
			<path
				d="M13.13 22.19L11.5 18.36C13.07 17.78 14.54 17 15.9 16.09L13.13 22.19M5.64 12.5L1.81 10.87L7.91 8.1C7 9.46 6.22 10.93 5.64 12.5M21.61 2.39C21.61 2.39 16.66 .269 11 5.93C8.81 8.12 7.5 10.53 6.65 12.64C6.37 13.39 6.56 14.21 7.11 14.77L9.24 16.89C9.79 17.45 10.61 17.63 11.36 17.35C13.5 16.53 15.88 15.19 18.07 13C23.73 7.34 21.61 2.39 21.61 2.39M14.54 9.46C13.76 8.68 13.76 7.41 14.54 6.63S16.59 5.85 17.37 6.63C18.14 7.41 18.15 8.68 17.37 9.46C16.59 10.24 15.32 10.24 14.54 9.46M8.88 16.53L7.47 15.12L8.88 16.53M6.24 22L9.88 18.36C9.54 18.27 9.21 18.12 8.91 17.91L4.83 22H6.24M2 22H3.41L8.18 17.24L6.76 15.83L2 20.59V22M2 19.17L6.09 15.09C5.88 14.79 5.73 14.47 5.64 14.12L2 17.76V19.17Z"
				fill="currentColor"
			/></svg
		><span
			class="self-center whitespace-nowrap text-2xl font-semibold text-gray-900 dark:text-white"
			>TechBlog Hub</span
		></a
	>

	<div class="flex items-center">
		<a aria-label="検索" id="header-search" href="/search"
			><svg viewBox="0 0 27 27" height="23" width="23">
				<path
					d="M11.56,3.43a8.26,8.26,0,0,0,0,16.52,8.18,8.18,0,0,0,5-1.72l4.7,4.7a1.1,1.1,0,0,0,1.56,0,1.09,1.09,0,0,0,0-1.55l0,0-4.7-4.7a8.18,8.18,0,0,0,1.72-5A8.28,8.28,0,0,0,11.56,3.43Zm0,2.2A6.06,6.06,0,1,1,5.5,11.69,6,6,0,0,1,11.56,5.63Z"
					fill="currentColor"
				/></svg
			></a
		>
		<Button
			class="mx-4 bg-sky-500 hover:bg-sky-700 font-bold"
			on:click={() => {
				if (!user_id) {
					goto('/auth/login');
					return;
				}
				goto('/post');
			}}
		>
			{user_id ? '記事投稿' : 'ログイン'}
		</Button>
	</div>
</div>

<slot />

<Footer>
	<FooterCopyright href="/" by="StudyFrontier™" year={2023} />
	<FooterLinkGroup
		ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0"
	>
		<FooterLink href="/">About</FooterLink>
		<FooterLink href="/">Privacy Policy</FooterLink>
		<FooterLink href="/">Licensing</FooterLink>
		<FooterLink href="/">Contact</FooterLink>
	</FooterLinkGroup>
</Footer>
