<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const prerender = true;
	export const load: Load = async ({ fetch }) => {
		const url = 'https://jsonplaceholder.typicode.com/todos/';
		const res = await fetch(url);
		if (res.ok) {
			return {
				props: {
					todos: await res.json()
				}
			};
		} else {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			};
		}
	};
</script>

<script lang="ts">
	import Select from 'svelte-select';
	import allTags from '../constants/allTags';
	export let todos: { id: number; title: string }[];
	const selectItems = Object.entries(allTags).map((item) => ({ value: item[0], label: item[1] }));
	let filterValues = undefined;
	const handleSelect = (e) => {
		filterValues = e.detail;
	};
</script>

<svelte:head>
	<title>UnnWhiteboard</title>
</svelte:head>

<section class=" px-2  ">
	<div class="py-6 md:py-20 bg-blue-50 flex items-center flex-col">
		<h1 class="text-4xl font-semibold text-gray-800 text-center">
			Get the <span class="text-blue-500">Right Job</span><br />you deserver
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
	<div class="flex items-center flex-col py-12 bg-gray-100">
		{#if todos}
			{#each todos as todo}
				<li class="p-2 bg-white my-2 rounded-md border-4 border-white hover:border-blue-500 list-none cardWrapper w-2/3">{todo.title}</li>
			{/each}
		{:else}
			Todos not loaded
		{/if}
	</div>
</section>


<style>
	.cardWrapper{
		max-width: 650px;
	}
	</style>