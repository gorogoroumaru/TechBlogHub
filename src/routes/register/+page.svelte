<script lang="ts">
	import BottomNavigation from '../../components/BottomNavigation.svelte';
	import TagInput from '../../components/TagInput.svelte';
	import PrependInput from '../../components/PrependInput.svelte';
	import Input from '../../components/Input.svelte';
	import { Button } from '@svelteuidev/core';
	import { v4 as uuid } from 'uuid';

	let title: string, url: string, lang: string, links: string, description: string, tags: string[];
</script>

<!-- TODO コメントはtextareaに notionを参考にする　-->
<!-- TODO タグは管理者で一括作成する ユーザーは入力中にタグ一覧に含まれるタグのみ設定できる -->

<div>
	<div class="wrapper">
		<div style="display: flex; flex-direction: column">
			<div style="display: flex; padding-bottom: 4px; width: 100%">
				<PrependInput prepend="Tags" />
				<TagInput bind:tags />
			</div>
		</div>
		<div style="display: flex; flex-direction: column">
			<div style="display: flex; padding-bottom: 4px; width: 100%">
				<PrependInput prepend="Title" />
				<Input placeholder="タイトルを入力して下さい" bind:input={title} />
			</div>
		</div>
		<div style="display: flex; flex-direction: column">
			<div style="display: flex; padding-bottom: 4px; width: 100%">
				<PrependInput prepend="URL" />
				<Input placeholder="URLを入力して下さい" bind:input={url} />
			</div>
		</div>
		<div style="display: flex; flex-direction: column">
			<div style="display: flex; padding-bottom: 4px; width: 100%">
				<PrependInput prepend="言語" />
				<Input placeholder="言語を入力して下さい" bind:input={lang} />
			</div>
		</div>
		<div style="display: flex; flex-direction: column">
			<div style="display: flex; padding-bottom: 4px; width: 100%">
				<PrependInput prepend="関連リンク" />
				<Input placeholder="関連するリソースのリンクを入力して下さい" bind:input={links} />
			</div>
		</div>
		<div style="display: flex; flex-direction: column">
			<div style="display: flex; padding-bottom: 4px; width: 100%">
				<PrependInput prepend="コメント" />
				<Input
					placeholder="このリソースに対するコメントを入力して下さい"
					bind:input={description}
				/>
			</div>
		</div>
		<Button
			radius="xs"
			on:click={async () => {
				await fetch('/register', {
					method: 'POST',
					body: JSON.stringify({ title, description, url, user_id: uuid(), tags }),
					headers: {
						'content-type': 'application/json'
					}
				});
				title = '';
				url = '';
				lang = '';
				links = '';
				description = '';
				tags = [];
			}}>送信</Button
		>
	</div>
</div>

<BottomNavigation active="Register" />
