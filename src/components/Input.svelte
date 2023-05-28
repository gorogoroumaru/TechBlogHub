<script lang="ts">
	export let placeholder = '';
	export let isSearchBar = false;
	export let input = '';
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
	{#if isSearchBar}
		<svg
			viewBox="0 0 17 17"
			class="searchNew"
			style="
        width: 18px;
        height: 18px;
        display: block;
        fill: rgba(55, 53, 47, 0.45);
        flex-shrink: 0;
        backface-visibility: hidden;
        margin-right: 10px;
        flex-grow: 0;
      "
		>
			<path
				d="M6.78027 13.6729C8.24805 13.6729 9.60156 13.1982 10.709 12.4072L14.875 16.5732C15.0684 16.7666 15.3232 16.8633 15.5957 16.8633C16.167 16.8633 16.5713 16.4238 16.5713 15.8613C16.5713 15.5977 16.4834 15.3516 16.29 15.1582L12.1504 11.0098C13.0205 9.86719 13.5391 8.45215 13.5391 6.91406C13.5391 3.19629 10.498 0.155273 6.78027 0.155273C3.0625 0.155273 0.0214844 3.19629 0.0214844 6.91406C0.0214844 10.6318 3.0625 13.6729 6.78027 13.6729ZM6.78027 12.2139C3.87988 12.2139 1.48047 9.81445 1.48047 6.91406C1.48047 4.01367 3.87988 1.61426 6.78027 1.61426C9.68066 1.61426 12.0801 4.01367 12.0801 6.91406C12.0801 9.81445 9.68066 12.2139 6.78027 12.2139Z"
			/>
		</svg>
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
			{placeholder}
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
			on:change
		/>
	</div>
</div>
