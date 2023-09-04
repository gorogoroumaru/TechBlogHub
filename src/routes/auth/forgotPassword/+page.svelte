<script lang="ts">
	import { Label, Input, Button, Helper } from 'flowbite-svelte';
	import { enhance, applyAction } from '$app/forms';

	let errorMsg: string = '';
</script>

<div
	class="rounded-xl w-full my-4 mx-auto bg-gradient-to-r bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 sm:p-6 flex justify-center"
>
	<div
		class="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8"
	>
		<h1
			class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
		>
			パスワードを忘れてしまいましたか？
		</h1>
		<p class="font-light text-gray-500 dark:text-gray-400">
			以下にメールアドレスを入力して下さい。パスワードリセット用のリンクをメールで送信します。
		</p>
		<form
			class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					errorMsg = result?.data?.message;
					await applyAction(result);
				};
			}}
		>
			<div>
				<Label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>メールアドレス</Label
				>
				<Input
					type="email"
					autocomplete="email"
					name="email"
					id="email"
					placeholder="name@company.com"
					required
				/>
				{#if errorMsg}<Helper class="mt-2" color="red"
						><span class="font-medium">{errorMsg}</span></Helper
					>{/if}
			</div>
			<Button type="submit" class="bg-sky-500 hover:bg-sky-700">パスワードをリセット</Button>
		</form>
	</div>
</div>
