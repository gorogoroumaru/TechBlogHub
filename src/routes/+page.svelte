<script lang="ts">
	import ListItem from '../components/ListItem.svelte';
	import { Tabs, Tab, TabContent } from 'carbon-components-svelte';

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

<!-- TODO autocompleteで入力補完機能を作成-->
<!-- https://github.com/algolia/autocomplete -->
<!-- TODO svelteuiでデザインを修正する　-->
<!-- TODO 画像サイズを縮小する　-->
<!-- TODO user登録画面作成　authはsupabaseで-->
<!-- TODO リソース登録用の管理者インターフェースを作成-->
<!-- TODO ジャンル一覧を作成 -->
<!-- TODO タグは管理者で一括作成する ユーザーは入力中にタグ一覧に含まれるタグのみ設定できる -->
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

	<div>
		<Tabs autoWidth>
			<Tab label="フォロー中" />
			<Tab label="新規コンテンツ" />
			<Tab label="トレンド" />
			<svelte:fragment slot="content">
				<TabContent>
					<ListItem
						url="https://speakerdeck.com/kuto5046/kaggle-h-and-mkonpezhen-rifan-ri"
						image="https://images.unsplash.com/photo-1600326145377-bcccb9a9daf2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80"
						title="Kaggle H&amp;Mコンペ振り返り"
						summary="DeNAとMoTのAI技術共有会で発表したスライドです。誤って削除したため再掲しています。"
						metadata="Programming - Speaker Deck"
						created="20min"
					/>
					{#await loadResources()}
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
					{/await}</TabContent
				>
				<TabContent>Explore</TabContent>
				<TabContent>Trend</TabContent>
			</svelte:fragment>
		</Tabs>
	</div>
</div>

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
