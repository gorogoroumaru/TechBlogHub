<!-- TODO いいねボタンの配置　-->
<!-- https://flowbite.com/blocks/publisher/comments/ -->
<!-- TODO markdown-itでmarkdownをhtmlへ変換　-->
<!-- TODO 元記事に移動できるボタン -->
<script lang="ts">
	import { Toolbar, ToolbarButton, Textarea, Button, Badge } from 'flowbite-svelte';

	export let data;
</script>

<div class="px-4 sm:px-6 md:px-8">
	<div class="max-w-3xl mx-auto">
		<article class="relative pt-10">
			<h1
				class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl"
			>
				{data.title}
			</h1>
			<div class="text-sm leading-6">
				<dl>
					<dt class="sr-only">Date</dt>
					<dd class="absolute top-0 inset-x-0 text-slate-700 dark:text-slate-400">
						<time>{data.created_at}</time>
					</dd>
				</dl>
			</div>
			<div class="mt-3">
				<Badge>{data.tag_name}</Badge>
			</div>
			<div class="mt-6">
				<ul class="flex flex-wrap text-sm leading-6 -mt-6 -mx-5">
					<li class="flex items-center font-medium whitespace-nowrap px-5 mt-6">
						<div class="text-sm leading-4">
							<div class="text-slate-900 dark:text-slate-200">Adam Wathan</div>
							<div class="mt-1">
								<a
									href="https://twitter.com/adamwathan"
									class="text-sky-500 hover:text-sky-600 dark:text-sky-400">@adamwathan</a
								>
							</div>
						</div>
					</li>
				</ul>
			</div>

			<div class="mt-12 prose prose-slate dark:prose-dark">
				<p>
					{data.description}
				</p>
			</div>
		</article>
		<Button class="mt-12" color="alternative" outline>元サイトに移動</Button>
		<!-- TODO コメントをデータベースに送信　-->
		<div class="mt-12">
			<div class="p-2 text-center border">
				<h3 class="text-xl font-medium">コメント欄</h3>
				<img
					class="mx-auto my-8"
					src="https://zenn.dev/images/drawing/discussion.png"
					width="300"
					alt="there is no comment"
				/>
			</div>
			<form>
				<Textarea class="mb-4" placeholder="Write a comment">
					<div slot="footer" class="flex items-center justify-between">
						<Button type="submit" class="bg-blue-500">Post comment</Button>
						<Toolbar embedded>
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
							<ToolbarButton name="Set location"
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
						</Toolbar>
					</div>
				</Textarea>
			</form>
		</div>
	</div>
</div>
