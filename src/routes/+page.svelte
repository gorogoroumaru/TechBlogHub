<script lang="ts">
	import { Tabs, TabItem, Card, Pagination, Heading, P } from 'flowbite-svelte';

	export let data;

	let currentPage: number = 0;

	function generatePages(len: number) {
		let pages = [];
		for (let i = 0; i < Math.ceil(len / 10); i++) {
			if (i === currentPage) {
				pages.push({ name: i + 1, href: `/?page=${i}`, active: true });
			} else {
				pages.push({ name: i + 1, href: `/?page=${i}`, active: false });
			}
		}
		return pages;
	}

	function handleClick(event: any) {
		currentPage = event.target.text - 1;
	}
</script>

<!-- TODO ユーザーが直接投稿できるようにするよりは掲載依頼という形で処理するのがいいかもしれない　-->
<!-- TODO もしくは自身で投稿した記事は最初は自分だけが見られるようにして承認された記事は全ユーザーに見えるようにするのもあり　-->
<!-- TODO cloudflare queuesを使用して、非同期でogpを縮小処理してcloudflare r2に格納する　-->
<!-- TODO client sideで縮小処理するのもありか　-->

<!-- 以下の項目をリリース前に全て確認する　-->
<!-- https://blog.flatt.tech/entry/firebase_vulns_10 -->
<!-- TODO 登録パスワードの強度を一定以上にするよう設定する　-->

<svelte:head>
	<title>StudyFrontierのトップページ</title>
</svelte:head>
<div class="bg-sky-400 p-8">
	<Heading tag="h2" class="mb-4">初めての方へ</Heading>
	<P>
		StudyFrontierは、プログラミング初学者の方がネット上の優れた技術ブログを簡単に見つけて利用できるようにするサービスです。
	</P>
	<P>
		様々なジャンルに分類された良質な学習リソースを提供し、お気に入りのブログを追加して管理したり、学習の進捗をトラッキングしたり、メモを記録したりすることができます。
	</P>
</div>
<Tabs class="mt-2 mx-2">
	<TabItem
		open
		title="新規投稿"
		activeClasses="inline-block text-sm font-medium text-center disabled:cursor-not-allowed p-4 text-sky-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500 active"
	>
		{#each data.resource as resource}
			<!-- TODO @tailwindcss/line-crampのプラグインをinstallし、複数行でtruncateできるようにする-->
			<div class="mb-4">
				<Card
					img={resource.image_url}
					href="/detail/{resource.id}"
					horizontal={false}
					reverse={false}
				>
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
		<Pagination pages={generatePages(data.count)} on:click={handleClick} />
	</TabItem>
	<TabItem
		title="自分の投稿"
		activeClasses="inline-block text-sm font-medium text-center disabled:cursor-not-allowed p-4 text-sky-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500 active"
	>
		{#each data.resourceByTheUser as resource}
			<div class="mb-4">
				<Card
					img={resource.image_url}
					href="/detail/{resource.id}"
					horizontal={false}
					reverse={false}
				>
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
		<Pagination pages={generatePages(data.userResourceCount)} on:click={handleClick} />
	</TabItem>
	<TabItem
		title="ブックマークした投稿"
		activeClasses="inline-block text-sm font-medium text-center disabled:cursor-not-allowed p-4 text-sky-600 bg-gray-100 rounded-t-lg dark:bg-gray-800 dark:text-primary-500 active"
	>
		{#each data.bookmarks as resource}
			<div class="mb-4">
				<Card
					img={resource.image_url}
					href="/detail/{resource.id}"
					horizontal={false}
					reverse={false}
				>
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
		<Pagination pages={generatePages(data.bookmarkCount)} on:click={handleClick} />
	</TabItem>
</Tabs>
