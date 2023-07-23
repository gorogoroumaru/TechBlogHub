<script lang="ts">
	import { goto } from '$app/navigation';
	import { Label, Input, Helper, Button } from 'flowbite-svelte';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let password: string;
	let passwordConfirm: string;

	let message: string;

	const handlePasswordChange = async () => {
		if (password !== passwordConfirm) {
			message = 'パスワードが一致しませんでした';
			return;
		}
		const { error } = await supabase.auth.updateUser({
			password
		});

		console.log(error);

		if (!error) {
			goto('/');
		}
	};
</script>

<h2 class="login-title">パスワード再設定</h2>

<div
	class="rounded-xl w-full my-4 mx-auto bg-gradient-to-r bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 sm:p-6 flex justify-center"
>
	<div
		class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
	>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<form class="flex flex-col space-y-6" on:submit={handlePasswordChange}>
				<Label class="space-y-2">
					<span>パスワード</span>
					<Input type="password" placeholder="•••••" required bind:value={password} />
				</Label>
				<Label class="space-y-2">
					<span>パスワード確認</span>
					<Input type="password" placeholder="•••••" required bind:value={passwordConfirm} />
					{#if message}<Helper class="mt-2" color="red"
							><span class="font-medium">{message}</span></Helper
						>{/if}
				</Label>
				<Button type="submit" class="w-full1 bg-sky-500 hover:bg-sky-700" on:click|once
					>パスワードを変更する</Button
				>
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
