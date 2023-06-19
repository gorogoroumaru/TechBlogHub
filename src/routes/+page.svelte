<script lang="ts">
	import ListItem from '../components/ListItem.svelte';
	import { Tabs, TabItem } from 'flowbite-svelte';

	export let data;
	const user_id = data.session?.user.id;

	async function loadResources() {
		const response = await fetch('/list', {
			method: 'GET'
		});
		const data = await response.json();
		if (response.ok) {
			return data;
		} else {
			throw new Error(data);
		}
	}
</script>

<!-- TODO 特定のrouteを認証で保護する　-->
<!-- https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#protecting-actions -->
<!-- TODO autocompleteで入力補完機能を作成-->
<!-- https://github.com/algolia/autocomplete -->
<!-- TODO svelteuiでデザインを修正する　-->
<!-- TODO 画像サイズを縮小する　-->
<!-- TODO リソース登録用の管理者インターフェースを作成-->
<!-- TODO ジャンル一覧を作成 -->
<!-- TODO ユーザーごとに学習状況やそれぞれのリソースに対するメモを作成できるようにする -->
<!-- TODO リソースに対していいねする機能 -->
<!-- TODO zennをパクってTrending, Following, Exploreタブを作成-->
<!-- TODO リソースの詳細表示画面、コメント投稿機能も -->

<div class="main_content">
	<h1 id="header">初めての方へ</h1>
	<p class="info">
		StudyFrontierはネット上の良質な学習リソースをジャンルごとにまとめて一括管理できるサービスです
	</p>
	<p class="info">自分が学習したいジャンルをフォローすれば新着リソースをすぐにチェックできます</p>
</div>
<Tabs style="underline">
	<TabItem title="フォロー中"
		>{#await loadResources()}
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
	<TabItem title="新規コンテンツ">Explore</TabItem>
	<TabItem title="トレンド">Trend</TabItem>
</Tabs>

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
