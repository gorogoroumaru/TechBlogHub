<script lang="ts">
	import { Tabs, TabItem, Card, Pagination, ListPlaceholder } from 'flowbite-svelte';
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
<!-- TODO cloudflare queuesを使用して、非同期でogpを縮小処理してcloudflare r2に格納する　-->
<!-- TODO client sideで縮小処理するのもありか　-->
<!-- TODO resourceのDBカラムに掲載許可フラグを追加する　-->

<!-- 以下の項目をリリース前に全て確認する　-->
<!-- https://blog.flatt.tech/entry/firebase_vulns_10 -->
<!-- TODO 登録パスワードの強度を一定以上にするよう設定する　-->

<!-- TODO データベースschemaの修正　idをintにする autoincrement　-->
<!-- TODO ユーザーごとに学習状況やそれぞれのリソースに対するメモを作成できるようにする -->

<div class="bg-sky-400 p-8">
	<h1 id="header">初めての方へ</h1>
	<p class="info">
		StudyFrontierは、プログラミング初学者の方がネット上の優れた技術ブログを簡単に見つけて利用できるようにするサービスです。
	</p>
	<p class="info">
		様々なジャンルに分類された良質な学習リソースを提供し、お気に入りのブログを追加して管理したり、学習の進捗をトラッキングしたり、メモを記録したりすることができます。
	</p>
</div>
<Tabs style="underline">
	<TabItem open title="新規投稿"
		>{#await content}
			<ListPlaceholder />
		{:then resources}
			{#each resources.rows as resource}
				<div class="mb-4">
					<Card img={resource.image_url} href="/detail/{resource.id}" horizontal>
						<h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
							{resource.title}
						</h5>
						<span class="mt-4 mb-8 text-xs text-gray-900 dark:text-white">
							{resource.tag_name} / {resource.created_at}
						</span>
						<p class="font-normal text-gray-700 dark:text-gray-400 leading-tight truncate">
							{resource.description}
						</p>
					</Card>
				</div>
			{/each}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</TabItem>
	<TabItem title="自分の投稿">Trend</TabItem>
	<TabItem title="いいねした投稿">Trend</TabItem>
</Tabs>

<Pagination {pages} />

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
</style>
