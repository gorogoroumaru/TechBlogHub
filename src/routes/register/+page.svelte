<script lang="ts">
	import { Label, Input, Button, Textarea, Helper } from 'flowbite-svelte';

	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;
	const { form, errors, constraints } = superForm(data.form);
	const user_id = data.session?.user.id as string;
</script>

<!-- 以下の項目をリリース前に全て確認する　-->
<!-- https://blog.flatt.tech/entry/firebase_vulns_10 -->
<!-- TODO メールアドレスが認証されていることを確認する-->
<!-- TODO 登録パスワードの強度を一定以上にするよう設定する　-->
<!-- https://flowbite-svelte-blocks.vercel.app/application/crud-create-forms に従って書き換えるのもあり-->
<!-- TODO tag inputを　https://flowbite-svelte.com/docs/components/dropdown#Dropdown_with_search　で書き直す-->
<!-- TODO tagはinputの中に全部の入力を保持するのではなく、dropdownに順次表示すればいい　入力が終わったらtab形式で表示する　-->
<!-- TODO 言語をselectBoxから指定できるようにする -->
<!-- TODO 記事のタイトルとリソース登録のタイトルは別に扱った方がいいかもしれない -->

<SuperDebug data={$form} />

<div class="m-2">
	<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">学習リソースを投稿する</h2>
	<form method="POST">
		<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
			<div class="sm:col-span-2">
				<Label for="name" class="mb-2">タイトル</Label>
				<Input
					type="text"
					id="title"
					name="title"
					placeholder="タイトルを入力して下さい"
					color={$errors.title && 'red'}
					required
					bind:value={$form.title}
					{...$constraints.title}
				/>
				{#if $errors.title}<Helper class="mt-2" color="red"
						><span class="font-medium">{$errors.title}</span></Helper
					>{/if}
			</div>
			<div class="sm:col-span-2">
				<Label for="brand" class="mb-2">URL</Label>
				<Input
					type="text"
					id="url"
					name="url"
					placeholder="URLを入力して下さい"
					color={$errors.url && 'red'}
					required
					bind:value={$form.url}
					{...$constraints.url}
				/>
				{#if $errors.url}<Helper class="mt-2" color="red"
						><span class="font-medium">{$errors.url}</span></Helper
					>{/if}
			</div>
			<div class="w-full">
				<Label for="weight" class="mb-2">タグ</Label>
				<Input
					type="text"
					id="tags"
					name="tags"
					placeholder="このリソースのタグを入力して下さい"
					color={$errors.tags && 'red'}
					required
					bind:value={$form.tags}
					{...$constraints.tags}
				/>
				{#if $errors.tags}<Helper class="mt-2" color="red"
						><span class="font-medium">{$errors.tags}</span></Helper
					>{/if}
			</div>
			<div class="w-full">
				<Label for="price" class="mb-2">言語</Label>
				<Input
					type="text"
					id="lang"
					name="lang"
					placeholder="このリソースの言語を入力して下さい"
					color={$errors.lang && 'red'}
					required
					bind:value={$form.lang}
					{...$constraints.lang}
				/>
				{#if $errors.lang}<Helper class="mt-2" color="red"
						><span class="font-medium">{$errors.lang}</span></Helper
					>{/if}
			</div>
			<div class="sm:col-span-2">
				<Label for="description" class="mb-2">コメント</Label>
				<Textarea
					id="description"
					placeholder="このリソースに対するコメントを入力して下さい"
					rows="4"
					name="description"
					color={$errors.description && 'red'}
					required
					bind:value={$form.description}
					{...$constraints.description}
				/>
				{#if $errors.description}<Helper class="mt-2" color="red"
						><span class="font-medium">{$errors.description}</span></Helper
					>{/if}
			</div>
			<div class="hidden">
				<Input value={user_id} name="user_id" id="user_id" />
			</div>
			<Button type="submit" class="w-20 bg-blue-500">送信</Button>
		</div>
	</form>
</div>
