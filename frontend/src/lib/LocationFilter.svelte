<script lang="ts">
	import Select from 'svelte-select';
	import env from '$lib/env';
	import { onMount } from 'svelte';

	export let selectedValue = undefined;
	let defaultItems = [];
	const loadOptions = async (filterText: string) => {
		const res = await fetch(`${env.API_DOMAIN}/location?q=${filterText}`);
		const json: { match: string[] } = await res.json();
		const items = json.match.map((value) => ({ value, label: value }));
		return items;
	};

	onMount(async () => {
        defaultItems = await loadOptions('')
    });

	function handleSelect(event) {
		console.log('selected item', event.detail);
		// .. do something here 🙂
	}

</script>

<Select
	bind:value={selectedValue}
	items={defaultItems}
	on:select={handleSelect}
	placeholder="📍 Location"
	{loadOptions}
	{...$$restProps}
	containerClasses="mx-8 flex-1"
/>
