<script lang="ts">
	import { Heading, P } from 'flowbite-svelte';
	import FieldList from '../components/FieldList.svelte';
	import type { PageData } from './$types';
	import { fields } from '../data/fields';

	export let data: PageData;
	$: user_id = data?.session?.user?.id;
</script>

<!-- TODO 記事を評価できるようにする　わかりやすさ　評価コメントも入力できるようにする-->
<!-- TODO 公開設定の適切な処理　公開設定のものは評価できるようにする　-->
<!-- TODO ユーザーごとに各分野を理解しているかチェックマークをつける機能、分野ごとの確認問題-->
<!-- https://roadmap.sh/ を参考に　-->
<!-- TODO プロフィール編集機能、閲覧機能　-->
<!-- TODO color paletteもdeveloper roadmapを参考にするのがいいかもしれない　-->
<!-- TODO techfinderを参考に設計、デザインを修正　-->

<svelte:head>
	<title>TechBlog Hubのトップページ</title>
</svelte:head>
{#if !user_id}
	<div class="bg-blue-200 p-8">
		<Heading tag="h2" class="mb-4">初めての方へ</Heading>
		<P>
			TechBlog
			Hubは、プログラミング学習者の方がネット上の優れた技術ブログを簡単に見つけて利用できるようにするサービスです。
		</P>
		<P>様々なジャンルに分類された良質な学習リソースを提供します。</P>
		<P>
			ユーザー登録するとお気に入りのブログを追加して管理したり、学習の進捗をトラッキングしたり、メモを記録したりすることができます。
		</P>
	</div>
{/if}

<div class="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-3">
	<FieldList {fields} />
</div>
