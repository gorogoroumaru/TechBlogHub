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

<div class="body-box">
	<form on:submit={handleSignUp}>
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
</div>

<style>
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
