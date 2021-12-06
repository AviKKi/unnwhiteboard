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
	import { format as timeago } from 'timeago.js';
	import { Jumper } from 'svelte-loading-spinners';

	import allTags from '../constants/allTags';
	import LocationFilter from '$lib/LocationFilter.svelte';
	import env from '$lib/env';
	export let jobs: {
		id: string;
		title: string;
		company: { name: string; slug: string };
		slug: string;
		postedDate: string;
		location: string
	}[];

	/**
	 * Fetch list of jobs from the server
	 * @param filters
	 * @param loadMore - if true response will be appended in the `jobs` list
	 */
	async function fetchFilteredList(
		filters: string[],
		locationFilter: any,
		loadMore: boolean = false
	) {
		loading = true;
		try {
			const skip = jobs.length;
			const res = await fetch(
				`${env.API_DOMAIN}/jobs/?` +
					(filters?.length ? `filter=${filters.join(',')}` : '') +
					(locationFilter ? `&location=${locationFilter.value}` : '') +
					(loadMore ? `&skip=${skip}` : ``)
			);
			const json = await res.json();
			if (loadMore) jobs = jobs.concat(json);
			else jobs = json;
		} catch (err) {
			console.log(err);
		}
		loading = false;
	}

	const selectItems = Object.entries(allTags).map((item) => ({ value: item[0], label: item[1] }));
	let filterValues = undefined;
	let selectedLocation = undefined;
	let loading = false;
	const handleSelect = (e) => {
		filterValues = e.detail;
	};

	function loadMore() {
		fetchFilteredList(filterValues?.map((val) => val.value) || [], selectedLocation, true);
	}

	$: fetchFilteredList(filterValues?.map((val) => val.value) || [], selectedLocation);
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
			>No Leetcode, no inverting the binary tree. <br />Companies below will interview you on
			questions that resemble day-to-day work of a developer.</span
		>
		<div class="pt-11 md:w-3/4 w-full justify-center flex gap-2 flex-col-reverse md:flex-row">
			<Select
				items={selectItems}
				value={filterValues}
				on:select={handleSelect}
				isMulti={true}
				placeholder="Filter"
				containerClasses="mx-8 flex-1"
				isDisabled={loading}
			/>
			<LocationFilter isDisabled={loading} bind:selectedValue={selectedLocation} />
		</div>
	</div>
	<div class="flex relative items-center flex-col py-12 bg-gray-100 resultsWrapper">
		{#if loading}
			<div
				class="bg-white z-40 absolute top-0 left-0 w-full h-full bg-opacity-25 flex justify-center "
			>
				<div class="fixed">
					<Jumper size="60" color="#3b82f6" unit="px" duration="1s" />
				</div>
			</div>
		{/if}
		{#if jobs}
			{#each jobs as job}
				<li
					class="p-2 bg-white my-2 rounded-md border-4 border-white hover:border-blue-500 list-none cardWrapper w-full md:w-2/3"
				>
					<a class="flex flex-col" href={`/job/${job.slug}`}>
						<span class="text-gray-700"
							><a href={`/company/${job.company.slug}`}>{job.company.name}</a></span
						>
						<span class="text-lg">{job.title}</span>
					</a>
					<span class="text-gray-700">{(job.postedDate && timeago(job.postedDate)) || ''}</span> | <span class="text-gray-700">{job.location}</span>
				</li>
			{/each}
			<button
				class="mt-4 border-2 border-blue-500 hover:border-blue-800 p-2 rounded-md"
				on:click={loadMore}>Load More</button
			>
		{:else}
			Jobs not loaded
		{/if}
	</div>
</section>

<style>
	.cardWrapper {
		max-width: 650px;
	}
	.resultsWrapper {
		background-color: #f7f9fc;
	}
	.flex-4 {
		flex: 4;
	}
</style>
