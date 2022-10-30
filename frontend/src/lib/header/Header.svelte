<script lang="ts">
	import { page } from '$app/stores';
	import logo from './svelte-logo.svg';
	import DiGithubBadge from 'svelte-icons/di/DiGithubBadge.svelte';
	import Twitter from '$lib/components/ShareButtons/Twitter.svelte';
</script>

<header class="flex justify-center py-5 text-gray-900">
	<div class="flex justify-between md:w-3/4 w-full px-2">
		<a href="/" class="text-2xl font-normal"
			><span class="font-semibold text-blue-500">Unn</span>Whiteboard</a
		>
		<div class="flex items-center">
			<div>
				<a href="/" class="mr-5">Home</a>
			</div>
			<div>
				<a href="/about">About</a>
			</div>
			<div class="icon">
				<a href="https://github.com/AviKKi/unnwhiteboard" target="_blank" rel="noopener noreferrer">
					<DiGithubBadge />
				</a>
			</div>
		</div>
	</div>
</header>

<style>
	.icon {
		width: 42px;
		height: 42px;
		margin-left: 10px;
	}
</style>
