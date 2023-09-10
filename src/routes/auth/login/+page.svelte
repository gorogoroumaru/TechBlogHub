<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Label, Input, Card, Helper } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
	import type { PageData } from './$types';
	import { AuthApiError } from '@supabase/supabase-js';
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data: PageData;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email: string;
	let password: string;
	let signUpError: string;
	let show = false;

	const handleSignIn = async () => {
		try {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password
			});
			if (error) throw error;
			goto('/');
		} catch (error) {
			if (error instanceof AuthApiError) {
				if (error.message === 'Invalid login credentials') {
					signUpError = 'メールアドレスまたはパスワードが間違っています';
				} else {
					signUpError = 'サーバーで問題が発生しました。もう一度やり直して下さい。';
				}
			}
			return;
		}
	};
</script>

<h2 class="login-title">ログイン</h2>

<div
	class="rounded-xl w-full my-4 mx-auto bg-gradient-to-r bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 sm:p-6 flex justify-center"
>
	<div
		class="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
	>
		<Card class="min-w-full">
			<Auth
				supabaseClient={supabase}
				appearance={{ theme: ThemeSupa }}
				providers={['google']}
				onlyThirdPartyProviders
			/>
			<form class="flex flex-col space-y-6" on:submit={handleSignIn}>
				<Label class="space-y-2">
					<span>Email</span>
					<Input
						type="email"
						autocomplete="email"
						placeholder="name@company.com"
						required
						bind:value={email}
					/>
				</Label>
				<Label class="space-y-2">
					<span>Your password</span>
					<Input
						type={show ? 'text' : 'password'}
						autocomplete="current-password"
						placeholder="•••••"
						required
						bind:value={password}
					>
						<button
							slot="right"
							on:click={(e) => {
								e.preventDefault();
								show = !show;
							}}
							class="pointer-events-auto"
						>
							{#if show}
								<EyeOutline name="eye-outline" class="w-6 h-6" />
							{:else}
								<EyeSlashOutline name="eye-slash-outline" class="w-6 h-6" />
							{/if}
						</button></Input
					>
				</Label>
				{#if signUpError}<Helper class="mt-2" color="red"
						><span class="font-medium">{signUpError}</span></Helper
					>{/if}
				<div class="flex items-start">
					<a
						href="/auth/forgotPassword"
						class="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
						>パスワードを忘れた方はこちら</a
					>
				</div>
				<Button type="submit" class="w-full1 bg-blue-500 hover:bg-blue-700"
					>アカウントにログイン</Button
				>
				<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
					初めての方はこちら <a
						href="/auth/register"
						class="text-primary-700 hover:underline dark:text-primary-500">ユーザー登録</a
					>
				</div>
			</form>
		</Card>
	</div>
</div>

<style>
	.login-title {
		text-align: center;
		color: #333333;
		font-size: 24px;
		margin: 25px 0px 20px;
		font-weight: bold;
	}

	h2 {
		display: block;
		font-size: 1.5em;
		margin-block-start: 0.83em;
		margin-block-end: 0.83em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		font-weight: bold;
	}
</style>
