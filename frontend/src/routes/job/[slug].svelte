<script context="module">
	import env from '$lib/env';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, session, stuff }) {
		const url = `http://${env.API_DOMAIN}/job/${page.params.slug}/`;
		const resJob = await fetch(url);
		if (resJob.ok) {
			return {
				props: {
					job: await resJob.json()
				}
			};
		}

		return {
			status: resJob.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
	export let job: any;
	import SvelteMarkdown from 'svelte-markdown';
</script>

<section class=" py-20 flex  justify-center">
	<div class="flex max-w-7xl px-2 text-gray-900 gap-3">
		<div class="flex-1 markdown">
			<b>Posted on:</b>
			{new Date(job.postedDate).toDateString().slice(3)}
			<SvelteMarkdown source={job.description} />
		</div>
		<div class="flex-1 flex flex-col items-center rightColumn">
			About the company
			<a class="bg-blue-400 text-white rounded-sm px-4 py-2 " href={job.applyUrl}>Apply Now</a>
		</div>
	</div>
</section>

<style>
	.centerColumn {
		flex: 1;
	}
	.rightColumn {
		flex: 1;
		max-width: 250px;
	}

	.markdown > :global(p) {
		margin: 16px 0 16px 0 !important;
	}
	.markdown > :global(ol) {
		list-style: decimal;
	}
	.markdown > :global(ul) {
		list-style: disc;
	}
	.markdown > :global(ul > li) {
		margin-left: 1em;
	}
</style>
