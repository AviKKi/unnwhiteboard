<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, session, stuff }) {
		const url = `http://localhost:8000/job/${page.params.slug}/`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					job: await res.json()
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
	export let job: any;
</script>

<section class=" px-2  ">
	{JSON.stringify(job)}
</section>
