<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Checkbox, Label, Input, Card } from 'flowbite-svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email: string;
	let password: string;

	const handleSignIn = async () => {
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		console.log(error);
		if (!error) {
			goto('/');
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
			<form class="flex flex-col space-y-6" on:submit={handleSignIn}>
				<Label class="space-y-2">
					<span>Email</span>
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
				<div class="flex items-start">
					<a href="/" class="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
						>パスワードを忘れた方はこちら</a
					>
				</div>
				<Button type="submit" class="w-full1 bg-sky-500">アカウントにログイン</Button>
				<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
					初めての方はこちら <a
						href="/auth"
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
