<script lang="ts">
	import ListItem from '../components/ListItem.svelte';
	import { Tabs, TabItem } from 'flowbite-svelte';
	import { Pagination } from 'flowbite-svelte';
	import { page } from '$app/stores';

	export let data;
	const user_id = data.session?.user.id;

	$: activeUrl = $page.url.searchParams.get('page');
	let pages = [
		{ name: 1, href: '/?page=0', active: false },
		{ name: 2, href: '/?page=1', active: false }
	];

	$: {
		pages.forEach((page) => {
			let splitUrl = page.href.split('?');
			let queryString = splitUrl.slice(1).join('?');
			const hrefParams = new URLSearchParams(queryString);
			let hrefValue = hrefParams.get('page');
			if (hrefValue === activeUrl) {
				page.active = true;
			} else {
				page.active = false;
			}
		});
		pages = pages;
	}

	const previous = () => {
		alert('Previous btn clicked. Make a call to your server to fetch data.');
	};
	const next = () => {
		alert('Next btn clicked. Make a call to your server to fetch data.');
	};

	async function loadResources(page: string) {
		const response = await fetch(`/list?page=${page}`, {
			method: 'GET'
		});
		const data = await response.json();
		if (response.ok) {
			return data;
		} else {
			throw new Error(data);
		}
	}

	$: content = loadResources(activeUrl ?? '0');
</script>

<!-- TODO ユーザーが直接投稿できるようにするよりは掲載依頼という形で処理するのがいいかもしれない　-->
<!-- TODO もしくは自身で投稿した記事は最初は自分だけが見られるようにして承認された記事は全ユーザーに見えるようにするのもあり　-->
<!-- TODO 非同期でogpを縮小処理してcloudflare r2に格納する　-->
<!-- TODO resourceのDBカラムに掲載許可フラグを追加する　-->

<!-- 以下の項目をリリース前に全て確認する　-->
<!-- https://blog.flatt.tech/entry/firebase_vulns_10 -->
<!-- TODO メールアドレスが認証されていることを確認する-->
<!-- TODO 登録パスワードの強度を一定以上にするよう設定する　-->
<!-- https://flowbite-svelte-blocks.vercel.app/application/crud-create-forms に従って書き換えるのもあり-->

<!-- TODO ブログカードで表示　-->
<!-- https://flowbite-svelte-blocks.vercel.app/marketing/blog -->
<!-- flowbiteのtoolbarでコメント投稿フォームの作成　-->
<!-- TODO データベースschemaの修正　idをintにする autoincrement　-->
<!-- TODO autocompleteで入力補完機能を作成-->
<!-- https://github.com/algolia/autocomplete -->
<!-- TODO 画像サイズを縮小する　-->
<!-- TODO リソース登録用の管理者インターフェースを作成-->
<!-- TODO ジャンル一覧を作成 -->
<!-- TODO ユーザーごとに学習状況やそれぞれのリソースに対するメモを作成できるようにする -->
<!-- TODO zennをパクってTrending, Following, Exploreタブを作成-->

<div class="main_content">
	<h1 id="header">初めての方へ</h1>
	<p class="info">
		StudyFrontierはネット上の良質な学習リソースをジャンルごとにまとめて一括管理できるサービスです
	</p>
	<p class="info">自分が学習したいジャンルをフォローすれば新着リソースをすぐにチェックできます</p>
</div>
<Tabs style="underline">
	<TabItem open title="フォロー中"
		>{#await content}
			<p>...waiting</p>
		{:then resources}
			{#each resources.rows as resource}
				<ListItem
					url={resource.url}
					image={resource.image_url}
					title={resource.title}
					summary={resource.description}
					metadata={resource.tag_name}
					created={resource.created_at}
					id={resource.id}
				/>
			{/each}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</TabItem>
	<TabItem title="新規投稿">Explore</TabItem>
	<TabItem title="自分の投稿">Trend</TabItem>
	<TabItem title="いいねした投稿">Trend</TabItem>
</Tabs>

<Pagination {pages} on:previous={previous} on:next={next} />

<style>
	#header {
		color: #1a1a1a;
		display: inline-block;
		font-family: Helvetica Neue;
		font-size: 24px;
		font-weight: 700;
		padding: 0px 0px 17px;
	}
	.info {
		color: #1a1a1a;
		font-family: Helvetica Neue;
		font-size: 14px;
		line-height: 20px;
	}

	.main_content {
		background-color: #e5f2ff;
		padding: 24px;
	}
</style>
