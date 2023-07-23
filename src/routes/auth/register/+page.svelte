<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, Checkbox, Label, Input, Helper } from 'flowbite-svelte';
	import { passwordStrength } from 'check-password-strength';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let user_name: string;
	let email: string;
	let password: string;
	let passwordConfirm: string;

	let message: string;

	const handleSignUp = async () => {
		if (password !== passwordConfirm) {
			message = 'パスワードが一致しませんでした';
			return;
		}
		const strength = passwordStrength(password);
		if (strength.value == 'Too weak' || strength.value == 'Weak') {
			message =
				'パスワードをもっと複雑にして下さい (大文字、小文字、数字、記号を組み合わせて８文字以上)';
			return;
		}

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

		console.log(error);

		if (!error) {
			goto('/auth/registerSuccess');
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
					<span>ユーザー名</span>
					<Input placeholder="ユーザー名" required bind:value={user_name} />
				</Label>
				<Label class="space-y-2">
					<span>メールアドレス</span>
					<Input type="email" placeholder="name@company.com" required bind:value={email} />
				</Label>
				<Label class="space-y-2">
					<span>パスワード</span>
					<Input type="password" placeholder="•••••" required bind:value={password} />
					{#if message}<Helper class="mt-2" color="red"
							><span class="font-medium">{message}</span></Helper
						>{/if}
				</Label>
				<Label class="space-y-2">
					<span>パスワード確認</span>
					<Input type="password" placeholder="•••••" required bind:value={passwordConfirm} />
				</Label>
				<div class="flex items-start">
					<Checkbox>
						<a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/">
							利用規約</a
						>に同意する</Checkbox
					>
				</div>
				<Button type="submit" class="w-full1 bg-sky-500 hover:bg-sky-700" on:click|once
					>アカウントを作成する</Button
				>
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
