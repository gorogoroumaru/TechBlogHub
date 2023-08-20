<script lang="ts">
	import { Tabs, TabItem, Heading, P } from 'flowbite-svelte';
	import BlogCard from '../components/BlogCard.svelte';
	import Pagination from '../components/Pagination.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: user_id = data?.session?.user?.id;
	$: supabase = data?.supabase;

	function getImageUrl(id: string) {
		const res = supabase.storage.from('ogps').getPublicUrl(id);
		const image_url = res.data.publicUrl;
		return image_url;
	}
</script>

<!-- TODO ユーザーが直接投稿できるようにするよりは掲載依頼という形で処理するのがいいかもしれない　-->
<!-- TODO もしくは自身で投稿した記事は最初は自分だけが見られるようにして承認された記事は全ユーザーに見えるようにするのもあり　-->
<!-- TODO 記事を評価できるようにする　わかりやすさ　評価コメントも入力できるようにする-->
<!-- TODO 手作業であらゆるタグを作成し、それぞれの依存関係も作成する　-->
<!-- TODO 公開設定の適切な処理　公開設定のものは評価できるようにする　-->
<!-- TODO プライバシーポリシー、利用規約をchatgptで生成　-->

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
			activeClasses="inline-block text-sm font-medium text-center disabled:cursor-not-allowed p-4 text-sky-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500 active"
		>
			<div class="flex flex-row flex-wrap">
				{#each data?.resource as resource}
					{@const image_url = getImageUrl(resource?.id)}
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
			activeClasses="inline-block text-sm font-medium text-center disabled:cursor-not-allowed p-4 text-sky-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500 active"
		>
			<div class="flex flex-row flex-wrap">
				{#each data?.resourceByTheUser as resource}
					{@const image_url = getImageUrl(resource?.id)}
					<BlogCard {resource} {image_url} />
				{/each}
			</div>

			<Pagination numberOfBlogs={Number(data.userResourceCount)} />
		</TabItem>
	{/if}
	{#if data?.bookmarks}
		<TabItem
			title="ブックマークした投稿"
			activeClasses="inline-block text-sm font-medium text-center disabled:cursor-not-allowed p-4 text-sky-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500 active"
		>
			<div class="flex flex-row flex-wrap">
				{#each data?.bookmarks as resource}
					{@const image_url = getImageUrl(resource?.id)}
					<BlogCard {resource} {image_url} />
				{/each}
			</div>

			<Pagination numberOfBlogs={Number(data.bookmarkCount)} />
		</TabItem>
	{/if}
</Tabs>
