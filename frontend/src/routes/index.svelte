<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const prerender = true;
	export const load: Load = async ({ fetch }) => {
		try {
			const url = `${env.API_DOMAIN}/jobs/`;
			const res = await fetch(url);
			if (res.ok) {
				return {
					props: {
						jobs: await res.json()
					},
					status: 200
				};
			} else {
				return {
					status: res.status,
					error: new Error(`Could not load ${url}`)
				};
			}
		} catch (err) {
			return {
				props: {
					jobs: []
				},
				status: 200
			};
		}
	};
</script>

<script lang="ts">
	import Select from 'svelte-select';
	import allTags from '../constants/allTags';
	import { format } from 'timeago.js';
	import env from '$lib/env';

	export let jobs: {
		id: string;
		title: string;
		company: { name: string; slug: string };
		slug: string;
		postedDate: string;
	}[];

	/**
	 * Fetch list of jobs from the server
	 * @param filters
	 * @param loadMore - if true response will be appended in the `jobs` list
	 */
	async function fetchFilteredList(filters: string[], loadMore: boolean = false) {
		const skip = jobs.length;
		const res = await fetch(
			`${env.API_DOMAIN}/jobs/?` +
				(filters?.length ? `filter=${filters.join(',')}` : '') +
				(loadMore ? `&skip=${skip}` : ``)
		);
		const json = await res.json();
		if (loadMore) jobs = jobs.concat(json);
		else jobs = json;
	}
	
	const selectItems = Object.entries(allTags).map((item) => ({ value: item[0], label: item[1] }));
	let filterValues = undefined;

	const handleSelect = (e) => {
		filterValues = e.detail;
		fetchFilteredList(filterValues?.map((val) => val.value) || []);
	}

	function loadMore() {
		fetchFilteredList(filterValues?.map((val) => val.value) || [], true);
	}

</script>

<svelte:head>
	<title>UnnWhiteboard</title>
</svelte:head>

<section class=" px-2  ">
	<div class="py-6 md:py-20 bg-blue-50 flex items-center flex-col">
		<h1 class="text-4xl font-semibold text-gray-800 text-center">
			Get the <span class="text-blue-500">Right Job</span><br />you deserve
		</h1>
		<span class="mt-5 text-center max-w-xl text-gray-600"
			>Tired of solving bogus question in job interview? Get hired by companies that don't require
			you to solve bogus questions on whiteboard.</span
		>
		<div class="pt-11 w-full justify-center flex">
			<Select
				items={selectItems}
				value={filterValues}
				on:select={handleSelect}
				isMulti={true}
				placeholder="Filter"
				containerClasses="w-full md:w-2/3 mx-8"
			/>
		</div>
	</div>
	<div class="flex items-center flex-col py-12 bg-gray-100 resultsWrapper">
		{#if jobs}
			{#each jobs as job}
				<li
					class="p-2 bg-white my-2 rounded-md border-4 border-white hover:border-blue-500 list-none cardWrapper w-2/3"
				>
					<a class="flex flex-col" href={`/job/${job.slug}`}>
						<span class="text-gray-700"
							><a href={`/company/${job.company.slug}`}>{job.company.name}</a></span
						>
						<span class="text-lg">{job.title}</span>
					</a>
					{(job.postedDate && format(job.postedDate)) || ''}
				</li>
			{/each}
			<button class="mt-4 border-2 border-blue-500 hover:border-blue-800 p-2 rounded-md" on:click={loadMore}>Load More</button>
		{:else}
			Jobs not loaded
		{/if}
	</div>
</section>

<style>
	.cardWrapper {
		max-width: 650px;
	}
	.resultsWrapper{
		background-color: #f7f9fc;
	}
</style>
