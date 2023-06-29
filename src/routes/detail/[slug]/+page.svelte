<!-- TODO リソースの詳細表示、コメント、いいね　-->
<!-- https://flowbite.com/blocks/publisher/comments/ -->
<!-- TODO markdown-itでmarkdownをhtmlへ変換　-->
<script lang="ts">
	import { Toolbar, ToolbarButton, ToolbarGroup, Textarea, Button } from 'flowbite-svelte';

	export let data;
</script>

<h1
	style="text-align:center; font-size: 32px; background-color: #EDF2F6; padding: 20px; margin-bottom: 10px"
>
	{data.title}
</h1>

<div class="tag-container">
	<div
		style="display: flex; align-items: center; height: 34px; width: 160px; flex: 0 0 auto; color: rgba(55, 53, 47, 0.65);"
	>
		<div
			role="button"
			tabindex="0"
			style="user-select: none; transition: background 20ms ease-in 0s; cursor: pointer; display: flex; align-items: center; height: 100%; width: 100%; border-radius: 3px; padding: 0px 6px;"
		>
			<div
				style="display: flex; align-items: center; line-height: 120%; min-width: 0px; font-size: 14px;"
			>
				<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Created</div>
			</div>
		</div>
	</div>
	<div
		style="display: flex; margin-left: 4px; height: 100%; flex: 1 1 auto; flex-direction: column; min-width: 0px;"
	>
		<div
			style="display: flex; align-items: center; margin-left: 4px; height: 100%; flex: 1 1 auto; min-width: 0px;"
		>
			<div
				style="display: inline-block; align-items: center; border-radius: 3px; width: 100%; min-height: 34px; padding: 6px 8px 7px; font-size: 14px; overflow: hidden;"
			>
				<div
					style="line-height: 1.5; word-break: break-word; white-space: pre-wrap; pointer-events: none;"
				>
					{data.created_at}
				</div>
			</div>
		</div>
	</div>
</div>
<div class="tag-container">
	<div
		style="display: flex; align-items: center; height: 34px; width: 160px; flex: 0 0 auto; color: rgba(55, 53, 47, 0.65);"
	>
		<div
			role="button"
			tabindex="0"
			style="user-select: none; transition: background 20ms ease-in 0s; cursor: pointer; display: flex; align-items: center; height: 100%; width: 100%; border-radius: 3px; padding: 0px 6px;"
		>
			<div
				style="display: flex; align-items: center; line-height: 120%; min-width: 0px; font-size: 14px;"
			>
				<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Tags</div>
			</div>
		</div>
	</div>
	<div style="display: flex; flex-wrap: wrap; padding-top: 8px; padding-bottom: 2px;">
		<div
			style="display: flex; align-items: center; flex-shrink: 1; min-width: 0px; max-width: 100%; height: 20px; border-radius: 3px; padding-left: 6px; padding-right: 6px; font-size: 14px; line-height: 120%; color: rgb(28, 56, 41); background: rgb(219, 237, 219); margin: 0px 6px 6px 0px;"
		>
			<div
				style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inline-block; height: 20px; line-height: 20px;"
			>
				{data.tag_name}
			</div>
		</div>
	</div>
</div>

<div class="tag-container">
	<div
		style="display: flex; align-items: center; height: 34px; width: 160px; flex: 0 0 auto; color: rgba(55, 53, 47, 0.65);"
	>
		<div style="width: 22px; margin-left: -22px; opacity: 0;">
			<div
				role="button"
				tabindex="-1"
				style="user-select: none; transition: background 20ms ease-in 0s; cursor: grab; display: flex; align-items: center; justify-content: center; width: 18px; height: 24px; border-radius: 3px; fill: rgba(55, 53, 47, 0.35);"
			/>
		</div>
		<div
			role="button"
			tabindex="0"
			style="user-select: none; transition: background 20ms ease-in 0s; cursor: pointer; display: flex; align-items: center; height: 100%; width: 100%; border-radius: 3px; padding: 0px 6px;"
		>
			<div
				style="display: flex; align-items: center; line-height: 120%; min-width: 0px; font-size: 14px;"
			>
				<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">URL</div>
			</div>
		</div>
	</div>
	<div
		style="display: flex; margin-left: 4px; height: 100%; flex: 1 1 auto; flex-direction: column; min-width: 0px;"
	>
		<div
			style="display: flex; align-items: center; margin-left: 4px; height: 100%; flex: 1 1 auto; min-width: 0px;"
		>
			<div style="display: flex; height: 100%; flex: 1 1 auto;">
				<div
					role="button"
					tabindex="0"
					style="user-select: none; transition: background 20ms ease-in 0s; cursor: pointer; display: inline-block; align-items: center; border-radius: 3px; width: 100%; min-height: 34px; padding: 6px 8px 7px; font-size: 14px; overflow: hidden;"
				>
					<a
						href="https://hackmd.io/@dikosec/S1Tp3uN5F#"
						target="_blank"
						rel="noopener noreferrer"
						style="display: block; color: inherit; text-decoration: none; user-select: none; cursor: pointer;"
						><span
							style="line-height: 1.5; word-break: break-word; white-space: pre-wrap; pointer-events: none; background-image: linear-gradient(to right, rgba(55, 53, 47, 0.16) 0%, rgba(55, 53, 47, 0.16) 100%); background-repeat: repeat-x; background-position: 0px 100%; background-size: 100% 1px;"
							>{data.url}</span
						></a
					>
				</div>
			</div>
		</div>
	</div>
</div>

<img alt="" data-external="yes" src={data.ogp_url} style="max-width: 647px;" />

<div class="description">
	{data.description}
</div>

<!-- TODO コメントをデータベースに送信　-->
<div class="comment">
	<form>
		<label for="editor" class="sr-only">Publish post</label>
		<Textarea id="editor" rows="8" class="mb-4" placeholder="Write a comment">
			<Toolbar slot="header" embedded>
				<ToolbarGroup>
					<ToolbarButton name="Attach file"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
							/></svg
						></ToolbarButton
					>
					<ToolbarButton name="Embed map"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
							/><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
							/></svg
						></ToolbarButton
					>
					<ToolbarButton name="Upload image"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
							/></svg
						></ToolbarButton
					>
				</ToolbarGroup>
				<ToolbarGroup>
					<ToolbarButton name="Format code"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
							/></svg
						></ToolbarButton
					>
					<ToolbarButton name="Add emoji"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
							/></svg
						></ToolbarButton
					>
				</ToolbarGroup>
				<ToolbarButton name="send" slot="end"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
						/></svg
					></ToolbarButton
				>
			</Toolbar>
		</Textarea>
		<Button>Publish post</Button>
	</form>
</div>

<style>
	.tag-container {
		display: flex;
		padding-left: 28px;
		width: 100%;
	}

	.description {
		font-size: 16px;
		line-height: 28px;
		padding: 28px;
	}

	.comment {
		padding: 24px;
	}
</style>
