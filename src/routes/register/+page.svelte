<script lang="ts">
	import BottomNavigation from '../../components/BottomNavigation.svelte';
	import TagInput from '../../components/TagInput.svelte';
	import PrependInput from '../../components/PrependInput.svelte';
	import Input from '../../components/Input.svelte';
	import { Button } from '@svelteuidev/core';
	import { deserialize } from '$app/forms';

	import { v4 as uuid } from 'uuid';

	let title: string, url: string, lang: string, links: string, description: string, tags: string[];
	let user_id = uuid();
	export let errors: string[];

	function addTag(event: any) {
		tags = event.detail.value;
	}

	async function handleSubmit(event: any) {
		const data = new FormData();
		data.append('tags', JSON.stringify(tags));
		data.append('title', title);
		data.append('url', url);
		data.append('lang', lang);
		data.append('links', links);
		data.append('description', description);
		data.append('user_id', user_id);

		const response = await fetch(this.action, {
			method: 'POST',
			body: data
		});

		const result = deserialize(await response.text());

		event.target.reset();
		tags = [];
	}
</script>

<!-- TODO tagを検索ボックスから入力できるようにする-->
<!-- TODO コメントはtextareaに notionを参考にする　-->
<!-- TODO 言語をselectBoxから指定できるようにする -->
<!-- TODO 記事のタイトルとリソース登録のタイトルは別に扱った方がいいかもしれない -->
<!-- TODO user_idの入力フォームを作成 display: noneで　-->
<!-- TODO superformsで書き換える　-->
<!-- https://superforms.vercel.app/get-started -->

<div>
	<form method="post" on:submit|preventDefault={handleSubmit}>
		<div class="wrapper">
			<div style="display: flex; flex-direction: column">
				<div style="display: flex; padding-bottom: 4px; width: 100%">
					<PrependInput prepend="Tags" />
					<TagInput name="tags" on:change={addTag} />
				</div>
			</div>
			<div style="display: flex; flex-direction: column">
				<div style="display: flex; padding-bottom: 4px; width: 100%">
					<PrependInput prepend="Title" />
					<Input placeholder="タイトルを入力して下さい" bind:input={title} name="title" />
				</div>
			</div>
			<div style="display: flex; flex-direction: column">
				<div style="display: flex; padding-bottom: 4px; width: 100%">
					<PrependInput prepend="URL" />
					<Input placeholder="URLを入力して下さい" bind:input={url} name="url" />
				</div>
			</div>
			<div style="display: flex; flex-direction: column">
				<div style="display: flex; padding-bottom: 4px; width: 100%">
					<PrependInput prepend="言語" />
					<Input placeholder="言語を入力して下さい" bind:input={lang} name="lang" />
				</div>
			</div>
			<div style="display: flex; flex-direction: column">
				<div style="display: flex; padding-bottom: 4px; width: 100%">
					<PrependInput prepend="関連リンク" />
					<Input
						placeholder="関連するリソースのリンクを入力して下さい"
						bind:input={links}
						name="links"
					/>
				</div>
			</div>
			<div style="display: flex; flex-direction: column">
				<div style="display: flex; padding-bottom: 4px; width: 100%">
					<PrependInput prepend="コメント" />
					<Input
						placeholder="このリソースに対するコメントを入力して下さい"
						bind:input={description}
						name="description"
					/>
				</div>
			</div>
			<div style="display: none;">
				<Input bind:input={user_id} name="user_id" />
			</div>
		</div>
		<Button radius="xs" type="submit">送信</Button>
	</form>
</div>

<BottomNavigation active="Register" />
