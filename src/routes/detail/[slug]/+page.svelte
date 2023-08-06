<script lang="ts">
	import { Textarea, Button, Badge, Input, Hr, A } from 'flowbite-svelte';
	import BookmarkIcon from '../../../components/BookmarkIcon.svelte';
	import BlogCard from '../../../components/BlogCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const user_id = data.session?.user.id as string;
</script>

<div class="px-4 sm:px-6 md:px-8">
	<div class="max-w-3xl mx-auto">
		<article class="relative pt-10">
			<div>
				<Badge>{data.tag_name}</Badge>
			</div>
			<div class="flex mt-3">
				<h1
					class="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-200 md:text-3xl mr-6"
				>
					{data.title}
				</h1>
				<form class="flex align-center" method="POST" action="?/saveBookmark">
					<button>
						<div class="hidden">
							<Input value={data.id} name="resource_id" id="resource_id" />
						</div>
						<BookmarkIcon alreadyBookmarked={data.alreadyBookmarked} />
					</button>
				</form>
			</div>
			<div class="text-sm leading-6">
				<dl>
					<dt class="sr-only">Date</dt>
					<dd class="absolute top-0 inset-x-0 text-slate-700 dark:text-slate-400">
						<time>{data.created_at}</time>
					</dd>
				</dl>
			</div>

			{#if data.user_name}
				<div class="mt-6">
					<ul class="flex flex-wrap text-sm leading-6 -mt-6 -mx-5">
						<li class="flex items-center font-medium whitespace-nowrap px-5 mt-6">
							<div class="text-sm leading-4">
								<div class="text-slate-900 dark:text-slate-200">@{data.user_name}</div>
							</div>
						</li>
					</ul>
				</div>
			{/if}

			<div class="mt-12 prose prose-slate dark:prose-dark">
				<p>
					{data.description}
				</p>
			</div>
		</article>

		<A href={data.url} class="mt-12 text-sky-500">元サイトに移動</A>

		{#if user_id}
			<Hr class="my-12" />
			<div>
				<h3 class="px-2 mb-8 text-xl font-bold">メモ一覧 ({data.memos.length})</h3>

				{#each data.memos as memo}
					<div class="px-2 mb-4">
						<time class="text-sm text-gray-500">{memo.created_at}</time>
						<p class="leading-relaxed">
							{memo.content}
						</p>
					</div>
				{/each}

				<form method="POST" action="?/submitMemo">
					<Textarea class="mb-4" placeholder="メモを入力" name="memo" id="memo">
						<div slot="footer" class="flex items-center justify-between">
							<Button type="submit" class="bg-sky-500 hover:bg-sky-700" on:click|once
								>メモを送信</Button
							>
						</div>
					</Textarea>
					<div class="hidden">
						<Input value={data.id} name="resource_id" id="resource_id" />
					</div>
				</form>
			</div>
		{/if}

		{#if data.relatedResources.length > 0}
			<h3 class="px-2 mt-16 mb-8 text-xl font-bold">関連投稿</h3>
			<div class="mb-4 flex flex-row overflow-x-scroll">
				{#each data.relatedResources as resource}
					<BlogCard {resource} />
				{/each}
			</div>
		{/if}
	</div>
</div>
