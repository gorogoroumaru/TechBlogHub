<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Label, Input, Helper } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
	import zxcvbn from 'zxcvbn';
	import type { PageData } from './$types';
	import { AuthApiError } from '@supabase/supabase-js';
	import { Auth } from '@supabase/auth-ui-svelte';
	import { ThemeSupa } from '@supabase/auth-ui-shared';

	export let data: PageData;
	let { supabase } = data;
	$: ({ supabase } = data);

	let user_name: string;
	let email: string;
	let password: string;
	let signUpError: string;
	let show = false;

	let message: string;

	const handleSignUp = async () => {
		const strength = zxcvbn(password);
		if (strength.score < 3) {
			message = 'パスワードをもっと複雑にして下さい';
			return;
		}

		try {
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: `${location.origin}/auth/callback`,
					data: {
						user_name
					}
				}
			});
			if (error) throw error;
		} catch (error) {
			if (error instanceof AuthApiError) {
				signUpError = 'サービスが混み合っています。数分後に再度お試しください。';
			} else {
				signUpError = 'サーバーで問題が発生しました。';
			}
			return;
		}

		goto('/auth/registerSuccess');
	};
</script>

<h2 class="login-title">ユーザー登録</h2>

<div
	class="rounded-xl w-full my-4 mx-auto bg-gradient-to-r bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 sm:p-6 flex justify-center"
>
	<div
		class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
	>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<Auth
				supabaseClient={supabase}
				appearance={{ theme: ThemeSupa }}
				providers={['google']}
				onlyThirdPartyProviders
			/>

			<form class="flex flex-col space-y-6" on:submit={handleSignUp}>
				<Label class="space-y-2">
					<span>ユーザー名</span>
					<Input placeholder="ユーザー名" required bind:value={user_name} />
				</Label>
				<Label class="space-y-2">
					<span>メールアドレス</span>
					<Input
						type="email"
						autocomplete="email"
						placeholder="name@company.com"
						required
						bind:value={email}
					/>
				</Label>
				<Label class="space-y-2">
					<span>パスワード</span>
					<Input
						type={show ? 'text' : 'password'}
						autocomplete="new-password"
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
					{#if message}<Helper class="mt-2" color="red"
							><span class="font-medium">{message}</span></Helper
						>{/if}
				</Label>
				{#if signUpError}<Helper class="mt-2" color="red"
						><span class="font-medium">{signUpError}</span></Helper
					>{/if}
				<Button type="submit" class="w-full1 bg-sky-500 hover:bg-sky-700" on:click|once
					>アカウントを作成する</Button
				>
				<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
					すでにアカウントをお持ちですか？ <a
						href="/auth/login"
						class="font-medium text-primary-600 hover:underline dark:text-primary-500"
						>こちらからログインして下さい</a
					>
				</div>
			</form>
		</div>
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
</style>
