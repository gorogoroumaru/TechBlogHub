<script lang="ts">
	import { Label, Input, Button, Textarea, Helper } from 'flowbite-svelte';
	import MultiSelect from '../../components/MultiSelect.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { fields } from '../../data/fields';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;
	const { form, errors, constraints } = superForm(data.form);
	const user_id = data.session?.user.id as string;

	// TODO MultiSelectをTagInputにカスタマイズする
	// https://github.com/themesberg/flowbite-svelte/blob/85d8d43b7b69c3d9050a56dca6d947f4dcc047b2/src/lib/forms/MultiSelect.svelte#L4

	// TODO form入力のsnapshot作成
	// https://kit.svelte.dev/docs/snapshots
</script>

<!-- SuperDebug data={$form} / -->

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
			<div class="w-full z-10">
				<Label for="weight" class="mb-2">タグ</Label>
				<MultiSelect items={fields} bind:value={$form.tags} {...$constraints.tags} />
				{#if $errors.tags}<Helper class="mt-2" color="red"
						><span class="font-medium">{$errors.tags}</span></Helper
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
