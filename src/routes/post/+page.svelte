<script lang="ts">
	import { Label, Input, Button, Textarea, Helper } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { fields } from '../../data/fields';
	import Svelecte, { config } from 'svelecte';
	//import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	const maxTagSelect = 10;
	config.i18n = {
		max: (num: number) => `タグは${num}個まで設定できます`
	};

	export let data: PageData;
	const user_id = data.session?.user.id as string;

	const { form, errors, constraints, enhance, capture, restore } = superForm(data.form, {
		applyAction: true,
		multipleSubmits: 'prevent',
		taintedMessage: '本当にこのページを離れますか？ 行った変更が反映されない可能性があります。'
	});
	export const snapshot = { capture, restore };

	// TODO 難易度のselectを表示　初心者向け、中級者向け、上級者向け　ー　定義も記載
</script>

<!-- SuperDebug data={$form} / -->

<div class="m-8">
	<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">学習リソースを投稿する</h2>
	<form method="POST" use:enhance>
		<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
			<div class="sm:col-span-2">
				<Label for="name" class="mb-2">タイトル</Label>
				<Input
					class="bg-white"
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
					class="bg-white"
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
				<Svelecte
					id="tags"
					name="tags"
					options={fields}
					bind:value={$form.tags}
					multiple
					max={maxTagSelect}
					placeholder="この記事のタグを選択して下さい"
				/>
				{#if $errors.tags}<Helper class="mt-2" color="red"
						><span class="font-medium">{$errors.tags}</span></Helper
					>{/if}
			</div>
			<div class="sm:col-span-2">
				<Label for="description" class="mb-2">コメント</Label>
				<Textarea
					class="bg-white"
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
			<Button type="submit" class="w-20 bg-sky-500 hover:bg-sky-700">送信</Button>
		</div>
	</form>
</div>
