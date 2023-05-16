<script lang="ts">
	import BottomNavigation from '../../components/BottomNavigation.svelte';
	import TagInput from '../../components/TagInput.svelte';
	import PrependInput from '../../components/PrependInput.svelte';
	import Input from '../../components/Input.svelte';
</script>

<!-- TODO 登録する事項　URL、タグ、リソースに対するコメント、言語、関連リンク、画像 -->
<!-- コメントはtextareaにnotionを参考にする　-->

<div>
	<div class="wrapper">
		<div style="display: flex; flex-direction: column">
			<div style="display: flex; padding-bottom: 4px; width: 100%">
				<PrependInput prepend="Tags" />
				<TagInput />
			</div>
		</div>
		<div style="display: flex; flex-direction: column">
			<div style="display: flex; padding-bottom: 4px; width: 100%">
				<PrependInput prepend="URL" />
				<Input placeholder="URLを入力して下さい" />
			</div>
		</div>
		<div style="display: flex; flex-direction: column">
			<div style="display: flex; padding-bottom: 4px; width: 100%">
				<PrependInput prepend="言語" />
				<Input placeholder="言語を入力して下さい" />
			</div>
		</div>
		<div style="display: flex; flex-direction: column">
			<div style="display: flex; padding-bottom: 4px; width: 100%">
				<PrependInput prepend="関連リンク" />
				<Input placeholder="関連するリソースのリンクを入力して下さい" />
			</div>
		</div>
		<div style="display: flex; flex-direction: column">
			<div style="display: flex; padding-bottom: 4px; width: 100%">
				<PrependInput prepend="コメント" />
				<Input placeholder="このリソースに対するコメントを入力して下さい" />
			</div>
		</div>
		<!-- TODO 画像を登録するフォーム-->
	</div>
</div>

<BottomNavigation active="Register" />
