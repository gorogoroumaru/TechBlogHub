<script lang="ts">
	export let tags: string[] = [];
	let input = '';

	function handleInput() {
		tags = [...tags, input];
		input = '';
	}
</script>

<div
	class="notion-scroller vertical horizontal"
	style="
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    background: rgba(242, 241, 238, 0.6);
    cursor: text;
    overflow: auto;
    padding: 8px 9px 1px;
    width: 100%;
    min-height: 34px;
    font-size: 14px;
    z-index: 1;
    margin-right: 0px;
    margin-bottom: 0px;
  "
>
	{#if tags}
		{#each tags as tag}
			<div
				style="
      display: flex;
      align-items: center;
      flex-shrink: 1;
      min-width: 0px;
      max-width: 100%;
      height: 20px;
      border-radius: 3px;
      padding-left: 6px;
      padding-right: 0px;
      font-size: 14px;
      line-height: 120%;
      color: rgb(73, 41, 14);
      background: rgb(250, 222, 201);
      margin: 0px 6px 6px 0px;
    "
			>
				<div
					style="
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-flex;
        align-items: center;
      "
				>
					<div style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis">{tag}</div>
				</div>
				<div
					role="button"
					tabindex="0"
					class="notion-token-remove-button"
					style="
        user-select: none;
        transition: background 20ms ease-in 0s;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 0;
        flex-shrink: 0;
        margin-left: 2px;
        margin-right: 2px;
        width: 20px;
        height: 20px;
      "
				>
					<svg
						viewBox="0 0 8 8"
						class="closeThick"
						style="
          width: 8px;
          height: 8px;
          display: block;
          fill: inherit;
          flex-shrink: 0;
          backface-visibility: hidden;
          opacity: 0.5;
        "
					>
						<polygon
							points="8 1.01818182 6.98181818 0 4 2.98181818 1.01818182 0 0 1.01818182 2.98181818 4 0 6.98181818 1.01818182 8 4 5.01818182 6.98181818 8 8 6.98181818 5.01818182 4"
						/>
					</svg>
				</div>
			</div>
		{/each}
	{/if}
	<div
		style="
      display: flex;
      align-items: center;
      border: none;
      padding: 0px;
      width: auto;
      background: transparent;
      font-size: inherit;
      line-height: 20px;
      flex: 1 1 60px;
      min-width: 60px;
      margin: 0px 6px 6px 0px;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    "
	>
		<input
			placeholder="このリソースのタグを入力して下さい"
			type="text"
			size="1"
			style="
        font-size: inherit;
        line-height: inherit;
        border: none;
        outline: none;
        background: none;
        width: 100%;
        display: block;
        resize: none;
        padding: 0px;
        height: 18px;
      "
			bind:value={input}
			on:change={handleInput}
		/>
	</div>
</div>
