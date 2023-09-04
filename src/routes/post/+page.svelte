<script lang="ts">
	import { Label, Input, Button, Textarea, Helper } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';
	import { fields } from '../../data/fields';
	import Svelecte from 'svelecte';
	//import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

	export let data: PageData;
	const user_id = data.session?.user.id as string;

	const { form, errors, constraints, enhance, capture, restore } = superForm(data.form, {
		applyAction: true,
		multipleSubmits: 'prevent',
		taintedMessage: '本当にこのページを離れますか？ 行った変更が反映されない可能性があります。'
	});
	export const snapshot = { capture, restore };

	async function autofill(url: string) {
		const result = await fetch(`/post?url=${url}`);
		const tmp = await result.text();
		try {
			const ogp = JSON.parse(tmp);
			$form.title = ogp.title;
			$form.description = ogp.description;
			$form.imageURL = ogp.imageURL;
		} catch (e) {
			console.log('invalid json format');
		}
	}

	$: secondTagURL = `/json/${$form.tag1}.tags.json`;
	$: thidTagURL = `/json/${$form.tag2}.tags.json`;
</script>

<!-- SuperDebug data={$form} / -->

<div class="m-8">
	<h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">学習リソースを投稿する</h2>
	<form method="POST" use:enhance>
		<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
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
					on:change={(e) => {
						autofill(e.target.value);
					}}
					bind:value={$form.url}
					{...$constraints.url}
				/>
				{#if $errors.url}<Helper class="mt-2" color="red"
						><span class="font-medium">{$errors.url}</span></Helper
					>{/if}
			</div>
			<div class="sm:col-span-2">
				<Label for="name" class="mb-2">タイトル</Label>
				<Input
					class="bg-white"
					type="text"
					id="title"
					name="title"
					placeholder="タイトルを入力して下さい (URLを入力すると自動で入力されます)"
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
				<Label for="weight" class="mb-2">タグ</Label>
				<div class="mb-4">
					<Svelecte
						id="tag1"
						name="tag1"
						options={fields}
						bind:value={$form.tag1}
						required
						placeholder="この記事のタグを選択して下さい"
					/>
				</div>
				<div class="mb-4">
					<Svelecte
						id="tag2"
						name="tag2"
						parent="tag1"
						placeholder="詳細なタグ(任意)"
						disabled={!$form.tag1}
						fetch={secondTagURL}
						bind:value={$form.tag2}
					/>
				</div>
				<Svelecte
					name="tag3"
					parent="tag2"
					placeholder="詳細なタグ２個目(任意)"
					disabled={!$form.tag2}
					fetch={thidTagURL}
				/>

				{#if $errors.tag1}<Helper class="mt-2" color="red"
						><span class="font-medium">{$errors.tag1}</span></Helper
					>{/if}
			</div>

			<div class="sm:col-span-2">
				<Label for="description" class="mb-2">内容</Label>
				<Textarea
					class="bg-white"
					id="description"
					placeholder="このリソースの内容を入力して下さい（URLを入力すると自動で入力されます）"
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
				<Input value={$form.imageURL} name="imageURL" id="imageURL" />
			</div>
			<Button type="submit" class="w-20 bg-sky-500 hover:bg-sky-700">送信</Button>
		</div>
	</form>
</div>
