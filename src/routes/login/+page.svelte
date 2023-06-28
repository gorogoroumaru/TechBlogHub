<script lang="ts">
	import { goto } from '$app/navigation';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email: string;
	let password: string;

	const handleSignIn = async () => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		goto('/');
		console.log(data, error);
	};

	// TODO formをflowbiteのサンプルに書き換えるのもありかもしれない
	// https://flowbite-svelte-blocks.vercel.app/marketing/login
	// https://flowbite-svelte.com/docs/components/card
</script>

<h2 class="login-title">ログイン</h2>
<div class="body-box">
	<form on:submit={handleSignIn}>
		<div>
			<div class="input-item">
				<div class="input-item-inner">
					<input
						bind:value={email}
						name="email"
						class="text"
						type="text"
						placeholder="メールアドレス"
					/>
				</div>
			</div>
			<div class="input-item">
				<div class="input-item-inner">
					<input
						bind:value={password}
						placeholder="パスワード"
						type="password"
						name="password"
						class="password"
					/>
				</div>
			</div>
		</div>
		<button id="login-button" class="submit-button"> 送信する </button>
	</form>

	<div class="to-register">
		<p class="to-register-sub-header"><span>はじめての方はこちら</span></p>
		<div class="to-register-btn">
			<a href="/auth">ユーザー登録</a>
		</div>
	</div>
</div>

<style>
	.login-title {
		text-align: center;
		color: #333333;
		font-size: 24px;
		margin: 25px 0px 20px;
		font-weight: bold;
	}

	h2 {
		display: block;
		font-size: 1.5em;
		margin-block-start: 0.83em;
		margin-block-end: 0.83em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
		font-weight: bold;
	}

	.input-item {
		border: 1px solid #aaa;
		overflow: hidden;
		-moz-border-radius: 4px;
		-webkit-border-radius: 4px;
		border-radius: 4px;
		-moz-box-shadow: inset 0 1px 3px #dddddd;
		-webkit-box-shadow: inset 0 1px 3px #dddddd;
		box-shadow: inset 0 1px 3px #dddddd;
		margin: 20px 0 20px 0;
	}

	.input-item-inner {
		width: 100%;
		overflow: hidden;
		float: left;
		position: relative;
	}

	.body-box {
		max-width: 414px;
		margin: 0 auto 30px;
		background: #fff;
		padding: 20px 32px 40px;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		-moz-box-shadow: 0 1px 4px #dddddd;
		-webkit-box-shadow: 0 1px 4px #dddddd;
		box-shadow: 0 1px 4px #dddddd;
	}

	.input-item-inner input {
		border: none;
		padding: 0.75em 5px;
		background: transparent;
		float: left;
		vertical-align: bottom;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		box-shadow: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		-o-text-overflow: ellipsis;
		text-overflow: ellipsis;
		font-size: 16px;
	}

	button {
		margin-top: 1em;
	}

	.to-register {
		max-width: 414px;
		margin: 30px auto;
		padding: 0 32px;
		box-sizing: border-box;
	}

	.to-register .to-register-sub-header {
		text-align: center;
		letter-spacing: 1px;
		color: #aaa;
		margin: 20px 0 0;
		background: url(/images/wwwridge/border.png) repeat-x left center;
		overflow: hidden;
		clear: both;
	}

	.to-register .to-register-btn {
		width: 220px;
		margin: 10px auto 0;
	}

	.to-register .to-register-btn a {
		display: block;
		height: 44px;
		line-height: 44px;
		font-size: 15px;
		color: #fff;
		text-align: center;
		font-weight: 700;
		text-decoration: none;
		background-color: #80b306;
		transition: all 0.1s ease-in;
		border-radius: 3px;
	}

	.submit-button {
		border: none;
		background: #5279e7;
		padding: 10px 20px;
		color: #fff;
		font-size: 16px;
		font-weight: bold;
		margin: 0 auto;
		width: 100%;
		letter-spacing: 1px;
		transition: all 0.1s ease-in;
		display: block;
		-moz-border-radius: 5px;
		-webkit-border-radius: 5px;
		border-radius: 5px;
		margin: 5px 0 0 0;
	}
</style>
