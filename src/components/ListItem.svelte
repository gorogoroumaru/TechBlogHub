<script lang="ts">
	export let url = '';
	export let image = '';
	export let title = '';
	export let summary = '';
	export let metadata = '';
	export let created = '';
</script>

<div class="card">
	<div class="card-image card__image">
		<div class="image-wrapper card-image__wrapper" style="background-image: url({image});" />
		<div class="card-image__overlay" />
	</div>
	<div class="card__content">
		<div class="card-title card__title">
			<a class="link card-title-link" href={url} target="_blank" rel="noopener noreferrer"
				>{title}</a
			>
		</div>
		<div class="card-metadata">
			<div class="card-metadata-source">
				<a class="link card-metadata-source-link" href="https://speakerdeck.com">{metadata} </a>
				/
				<span
					class="ago"
					title="Published: Sun, 30 Apr 2023 01:42:00 GMT
    Received: Sun, 30 Apr 2023 01:51:37 GMT">{created}</span
				>
			</div>
		</div>
		<div class="card-summary">
			<div>{summary}</div>
		</div>
	</div>
</div>

<style>
	.card {
		border: 1px solid rgba(0, 0, 0, 0);
		border-radius: 0.25rem;
		display: flex;
		gap: 20px;
		margin-bottom: 20px;
		margin-left: -12px;
		margin-right: -12px;
		margin-top: -12px;
		max-width: 624px;
		padding: 12px;
	}
	.card-image {
		height: 78px;
		width: 120px;
		position: relative;
	}
	.image-wrapper {
		height: 100%;
		width: 100%;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
		border: 0;
		border-radius: 0.25rem;
		box-shadow: rgba(0, 0, 0, 0.05) 0 0 0 1px inset;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80px;
		margin: 0;
		opacity: 1;
		overflow: hidden;
		width: 100px;
	}
	.card-image__overlay {
		background-color: rgba(0, 0, 0, 0.54);
		border-radius: 0.25rem;
		opacity: 0;
		position: absolute;
		transition: opacity 0.3s linear;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
	}
	.link {
		color: #333333;
	}
	.card__content {
		flex: 1;
	}
	.card-title {
		display: inline-block;
		font-size: 16px;
		letter-spacing: -0.04em;
		line-height: 1.25em;
		margin-bottom: 0.25rem;
		width: 70%;
		word-break: break-word;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		color: #333;
		cursor: pointer;
		display: block;
		font-weight: 700;
	}
	.card-metadata {
		color: #9e9e9e;
		font-size: 13px;
		line-height: 18px;
		overflow: visible;
	}
	.card-metadata-source {
		direction: ltr;
		display: inline-block;
	}
	.card-summary {
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		display: -webkit-box;
		overflow: hidden;
		font-size: 13px;
		line-height: 18px;
		margin-bottom: 0;
		margin-top: 0.25rem;
		word-break: break-word;
		color: #9e9e9e;
		font-size: 13px;
		line-height: 17px;
	}
</style>
