<!-- TODO リソースの詳細表示、コメント、いいね　-->
<!-- markdown-itでmarkdownをhtmlへ変換　-->
<script lang="ts">
	export let title = '';
	export let tags: string[] = [];
	export let created_at = '';
	export let url = '';
	export let ogp_url = '';
	export let description = '';
	export let data;
</script>

<div
	class="notranslate"
	spellcheck="true"
	placeholder="Untitled"
	data-content-editable-leaf="true"
	contenteditable="true"
	style="
    max-width: 100%;
    width: 100%;
    white-space: pre-wrap;
    word-break: break-word;
    caret-color: rgb(55, 53, 47);
    padding: 3px 2px;
  "
>
	{title}
</div>

<div style="display: flex; padding-bottom: 4px; width: 100%;">
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
					{created_at}
				</div>
			</div>
		</div>
	</div>
</div>
<div style="display: flex; padding-bottom: 4px; width: 100%;">
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
		{#each tags as tag}
			<div
				style="display: flex; align-items: center; flex-shrink: 1; min-width: 0px; max-width: 100%; height: 20px; border-radius: 3px; padding-left: 6px; padding-right: 6px; font-size: 14px; line-height: 120%; color: rgb(28, 56, 41); background: rgb(219, 237, 219); margin: 0px 6px 6px 0px;"
			>
				<div
					style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: inline-block; height: 20px; line-height: 20px;"
				>
					{tag}
				</div>
			</div>
		{/each}
	</div>
</div>

<div style="display: flex; padding-bottom: 4px; width: 100%;">
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
							>{url}</span
						></a
					>
				</div>
			</div>
		</div>
	</div>
</div>

<img alt="" data-external="yes" src={ogp_url} style="max-width: 647px;" />

<div
	style="max-width: 100%; width: 100%; white-space: pre-wrap; word-break: break-word; caret-color: rgb(55, 53, 47); padding: 3px 2px;"
>
	{description}
</div>
