<script lang="ts">
	import { page } from '$app/stores';

	let active = '';
	$: name = $page.url.pathname.substr($page.url.pathname.lastIndexOf('/'));

	$: switch (name) {
		case '/':
			active = 'Home';
			break;
		case '/register':
			active = 'Register';
			break;
		case '/search':
			active = 'Search';
			break;
		case '/settings':
			active = 'Settings';
			break;
	}
</script>

<div class="wrapper">
	<div id="bottom-bar">
		<div class={active == 'Home' ? 'bottom-bar-element active' : 'bottom-bar-element'}>
			<a href="/" class={active == 'Home' ? 'link active' : 'link'}>
				<i class="material-icons icon">home</i><br />
			</a>
			<span class="icon-text">ホーム</span>
		</div>
		<div class={active == 'Register' ? 'bottom-bar-element active' : 'bottom-bar-element'}>
			<a href="/register" class={active == 'Register' ? 'link active' : 'link'}>
				<i class="material-icons icon">dashboard</i><br />
			</a>
			<span class="icon-text">リソースの登録</span>
		</div>
		<div class={active == 'Search' ? 'bottom-bar-element active' : 'bottom-bar-element'}>
			<a href="/search" class={active == 'Search' ? 'link active' : 'link'}>
				<i class="material-icons icon">extension</i><br />
			</a>
			<span class="icon-text">検索</span>
		</div>
		<div class={active == 'Settings' ? 'bottom-bar-element active' : 'bottom-bar-element'}>
			<a href="/settings" class={active == 'Settings' ? 'link active' : 'link'}>
				<i class="material-icons icon">person</i><br />
			</a>
			<span class="icon-text">設定</span>
		</div>
	</div>
</div>

<style>
	html,
	body {
		height: 100%;
		margin: 0px;
		font-family: 'Roboto Condensed';
	}

	.icon-text {
		font-size: 10px;
	}

	.icon {
		font-size: 20px;
	}

	.wrapper {
		min-height: 100%;
		height: 5000px;
		position: relative;
		padding-top: 24px;
		text-align: center;
	}

	#bottom-bar {
		width: 100%;
		background-color: #f0f3f5;
		position: fixed;
		bottom: 0;
	}

	.bottom-bar-element {
		width: 25%;
		display: inline-block;
		float: left;
		text-align: center;
		padding-top: 8px;
		padding-bottom: 8px;
		color: #78909c;
		cursor: pointer;
		transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
	}

	.link:hover {
		color: #ff7300 !important;
	}

	.link {
		color: #78909c;
		padding: 10px;
	}

	#bottom-bar:hover .link {
		color: #78909c;
		transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
	}

	.active {
		color: #ff7300;
	}
</style>
