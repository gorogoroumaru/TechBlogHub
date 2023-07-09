<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Checkbox, Label, Input } from 'flowbite-svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email: string;
	let password: string;
	let passwordConfirm: string;

	// TODO optionsでメタデータを追加　ユーザー名など
	// https://supabase.com/docs/guides/auth/managing-user-data
	// https://supabase.com/docs/guides/auth/managing-user-data#accessing-user-metadata
	const handleSignUp = async () => {
		if (password !== passwordConfirm) {
			console.log('password confirmation failed');
			return;
		}
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`
			}
		});

		console.log(error);

		if (!error) {
			goto('/');
		}
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
			<form class="flex flex-col space-y-6" on:submit={handleSignUp}>
				<Label class="space-y-2">
					<span>Your email</span>
					<Input
						type="email"
						name="email"
						placeholder="name@company.com"
						required
						bind:value={email}
					/>
				</Label>
				<Label class="space-y-2">
					<span>Your password</span>
					<Input
						type="password"
						name="password"
						placeholder="•••••"
						required
						bind:value={password}
					/>
				</Label>
				<Label class="space-y-2">
					<span>Confirm password</span>
					<Input
						type="password"
						name="confirm-password"
						placeholder="•••••"
						required
						bind:value={passwordConfirm}
					/>
				</Label>
				<div class="flex items-start">
					<Checkbox>
						<a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/">
							利用規約</a
						>に同意する</Checkbox
					>
				</div>
				<Button type="submit" class="w-full1 bg-blue-500">アカウントを作成する</Button>
				<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
					すでにアカウントをお持ちですか？ <a
						href="/"
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
