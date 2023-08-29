<script lang="ts">
	import { Tabs, TabItem, Heading, P } from 'flowbite-svelte';
	import BlogCard from '../components/BlogCard.svelte';
	import Pagination from '../components/Pagination.svelte';
	import { getImageUrl } from '../utils/getImageUrl';
	import type { PageData } from './$types';

	export let data: PageData;
	$: user_id = data?.session?.user?.id;
	$: supabase = data?.supabase;

	console.log('user:', data?.session?.user);
</script>

<!-- TODO 記事を評価できるようにする　わかりやすさ　評価コメントも入力できるようにする-->
<!-- TODO 手作業であらゆるタグを作成し、それぞれの依存関係も作成する　-->
<!-- TODO 公開設定の適切な処理　公開設定のものは評価できるようにする　-->
<!-- TODO svelecteのタグをgroup化してより多くのタグを使えるようにする　もしくはdependent selectもあり　custom item renderingで多重nestさせるのもあり-->
<!-- 大項目、小項目を一列に配置し、大項目の内容次第で小項目の選択肢を変更するのもあり-->
<!-- TODO developer roadmapを参考にflowchart形式でない形で各分野を階層表示　-->
<!-- TODO ユーザーごとに各分野を理解しているかチェックマークをつける機能、分野ごとの確認問題-->
<!-- https://roadmap.sh/ を参考に　-->
<!-- TODO プロフィール編集機能、閲覧機能　-->
<!-- TODO color paletteもdeveloper roadmapを参考にするのがいいかもしれない　-->
<!-- TODO techfinderを参考に設計、デザインを修正　-->

<svelte:head>
	<title>TechBlog Hubのトップページ</title>
</svelte:head>
{#if !user_id}
	<div class="bg-sky-200 p-8">
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
<Tabs class="mt-2 mx-2">
	{#if data?.resource}
		<TabItem
			open
			title="新規投稿"
			defaultClass="text-xs sm:text-sm"
			activeClasses="inline-block font-medium text-center disabled:cursor-not-allowed p-4 text-sky-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500 active"
		>
			<div class="flex flex-row flex-wrap">
				{#each data?.resource as resource}
					{@const image_url = getImageUrl(supabase, resource?.id)}
					<!-- TODO @tailwindcss/line-crampのプラグインをinstallし、複数行でtruncateできるようにする-->
					<BlogCard {resource} {image_url} />
				{/each}
			</div>

			<Pagination numberOfBlogs={Number(data.count)} />
		</TabItem>
	{/if}
	{#if data?.resourceByTheUser}
		<TabItem
			title="自分の投稿"
			defaultClass="text-xs sm:text-sm"
			activeClasses="inline-block font-medium text-center disabled:cursor-not-allowed p-4 text-sky-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500 active"
		>
			<div class="flex flex-row flex-wrap">
				{#each data?.resourceByTheUser as resource}
					{@const image_url = getImageUrl(supabase, resource?.id)}
					<BlogCard {resource} {image_url} />
				{/each}
			</div>

			<Pagination numberOfBlogs={Number(data.userResourceCount)} />
		</TabItem>
	{/if}
	{#if data?.bookmarks}
		<TabItem
			title="ブックマークした投稿"
			defaultClass="text-xs sm:text-sm"
			activeClasses="inline-block font-medium text-center disabled:cursor-not-allowed p-4 text-sky-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500 active"
		>
			<div class="flex flex-row flex-wrap">
				{#each data?.bookmarks as resource}
					{@const image_url = getImageUrl(supabase, resource?.id)}
					<BlogCard {resource} {image_url} />
				{/each}
			</div>

			<Pagination numberOfBlogs={Number(data.bookmarkCount)} />
		</TabItem>
	{/if}
</Tabs>
