<script>
	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	/**
	 * @type {any}
	 */
	let email;
	/**
	 * @type {any}
	 */
	let password;

	// TODO optionsでメタデータを追加　ユーザー名など
	// https://supabase.com/docs/guides/auth/managing-user-data
	const handleSignUp = async () => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`
			}
		});
		console.log(data, error);
	};
</script>

<h2 class="login-title">ユーザー登録</h2>
<div class="body-box">
	<form on:submit={handleSignUp}>
		<div
			tabindex="0"
			role="button"
			aria-labelledby="button-label"
			class="nsm7Bb-HzV7m-LgbsSe hJDwNd-SxQuSe i5vt6e-Ia7Qfc uaxL4e-RbRzK"
			style="width:350px; max-width:400px; min-width:min-content;"
		>
			<div class="nsm7Bb-HzV7m-LgbsSe-MJoBVe" />
			<div class="nsm7Bb-HzV7m-LgbsSe-bN97Pc-sM5MNb">
				<div class="nsm7Bb-HzV7m-LgbsSe-Bz112c">
					<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 48 48"
						class="LgbsSe-Bz112c"
						><g
							><path
								fill="#EA4335"
								d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
							/><path
								fill="#4285F4"
								d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
							/><path
								fill="#FBBC05"
								d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
							/><path
								fill="#34A853"
								d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
							/><path fill="none" d="M0 0h48v48H0z" /></g
						></svg
					>
				</div>
				<span class="nsm7Bb-HzV7m-LgbsSe-BPrWId">Google で登録</span><span
					class="L6cTce"
					id="button-label">Google で登録</span
				>
			</div>
		</div>
		<p id="alternate-message"><span>もしくは</span></p>
		<div>
			<div class="input-item">
				<div class="input-item-inner">
					<input
						aria-label="ユーザーID"
						name="name"
						value=""
						aria-required="true"
						autocomplete="username"
						title="3文字以上の半角英数字"
						autocapitalize="off"
						type="text"
						placeholder="ユーザーID"
						id="username-input"
					/>
				</div>
			</div>
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

	p {
		display: block;
		margin-block-start: 1em;
		margin-block-end: 1em;
		margin-inline-start: 0px;
		margin-inline-end: 0px;
	}

	.nsm7Bb-HzV7m-LgbsSe {
		-webkit-border-radius: 4px;
		border-radius: 4px;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		-webkit-transition: background-color 0.218s, border-color 0.218s;
		transition: background-color 0.218s, border-color 0.218s;
		-webkit-user-select: none;
		-webkit-appearance: none;
		background-color: #fff;
		background-image: none;
		border: 1px solid #dadce0;
		color: #3c4043;
		cursor: pointer;
		font-family: 'Google Sans', arial, sans-serif;
		font-size: 14px;
		height: 40px;
		letter-spacing: 0.25px;
		outline: none;
		overflow: hidden;
		padding: 0 12px;
		position: relative;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		width: auto;
	}

	.nsm7Bb-HzV7m-LgbsSe .nsm7Bb-HzV7m-LgbsSe-bN97Pc-sM5MNb {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-align-items: center;
		align-items: center;
		-webkit-flex-direction: row;
		flex-direction: row;
		justify-content: space-between;
		-webkit-flex-wrap: nowrap;
		flex-wrap: nowrap;
		height: 100%;
		position: relative;
		width: 100%;
	}

	.nsm7Bb-HzV7m-LgbsSe .nsm7Bb-HzV7m-LgbsSe-Bz112c {
		height: 18px;
		margin-right: 8px;
		min-width: 18px;
		width: 18px;
	}

	.nsm7Bb-HzV7m-LgbsSe .nsm7Bb-HzV7m-LgbsSe-BPrWId {
		-webkit-flex-grow: 1;
		flex-grow: 1;
		font-family: 'Google Sans', arial, sans-serif;
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		vertical-align: top;
	}

	.L6cTce {
		display: none;
	}

	#alternate-message {
		text-align: center;
		font-size: 0.75em;
		letter-spacing: 1px;
		color: #aaa;
		margin: 20px 0 0;
		background: url(/images/wwwridge/border.png) repeat-x left center;
		overflow: hidden;
		clear: both;
		margin: 16px 0 16px 0;
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
		margin: 20px 0 0 0;
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
</style>
