<script lang="ts">
	import type { PageProps } from './$types';

	let location = 'Stockholm';
	let weatherOptions = [
		{ id: 1, text: 'Sunny' },
		{ id: 2, text: 'Cloudy' },
		{ id: 3, text: 'Rainy' }
	];
	let preferredWeather = $state('');

	let { form }: PageProps = $props();
	let showResult = $state(false);
	let searchAgain = $state(false);
	//let placesOfInterest = $state('');
	//let date = $state('');
</script>

{#if !form?.success}
	<div class="flex h-full w-full flex-col items-center justify-center gap-4 p-5 text-center">
		<div class="align-center flex h-[75%] w-[60%] flex-col justify-center rounded-lg">
			<div class="mx-30 mb-5 rounded-sm border-2 border-solid border-black">
				<h1 class="flex justify-center p-3 text-center text-3xl">Welcome</h1>
				<form method="POST" class="flex flex-col gap-3">
					<p class="mx-5">What weather are you looking for today?</p>
					<div class="flex flex-row justify-center">
						{#each weatherOptions as weather (weather.id)}
							<div class="flex flex-row">
								<input type="checkbox" id={weather.text} name={weather.text} class="peer hidden" />
								<label
									for={weather.text}
									class="m-2 rounded border-2 border-gray-400 bg-gray-100 px-2 py-2 font-semibold text-gray-800 shadow peer-checked:border-emerald-500 hover:border-emerald-500 hover:bg-emerald-200 hover:text-emerald-500"
								>
									{weather.text}
								</label>
							</div>
						{/each}
					</div>

					<div>
						<label for="date">
							<p>When would you like to go?</p>
							<input class="w-1/2 rounded" type="date" name="date" required />
						</label>
					</div>

					<div>
						<label for="preferred-locations">
							<p>Where would you like to go?</p>
							<input
								class="w-5/6 rounded"
								name="preferred-locations"
								type="text"
								placeholder="Gothenburg, Malmo..."
							/>
						</label>
					</div>

					<div>
						<button
							class="m-4 w-1/2 rounded border-2 border-solid border-sky-300 bg-sky-200 p-2 pb-4 text-lg font-semibold text-sky-800 shadow hover:bg-sky-300"
							type="submit"
						>
							Show locations <br>(Allow upto 60 seconds for a redirect)
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{:else}
	<div class="flex h-full w-full flex-col items-center justify-center gap-4 p-5 text-center">
		{#each form.ranked_cities as city (city)}
			<div
				class="mb-5 flex h-1/3 w-1/2 flex-col items-center justify-center gap-4 rounded-sm border-2 border-solid border-black p-5 text-center md:mx-30"
			>
				<div class="flex w-[75%] flex-row justify-center">
					<p class="font-medium">
						{city[0]}
					</p>
				</div>
				<div class="flex w-[75%] flex-row justify-center gap-12">
					<p>Cloudiness:</p>
					<p class="font-medium">
						{city[1].toFixed(2)}%
					</p>
				</div>
				<div class="flex w-[75%] flex-row justify-center gap-12">
					<p>Total precipitation:</p>
					<p class="font-medium">
						{city[2].toFixed(2)}mm/day
					</p>
				</div>
				<div class="flex w-[75%] flex-row justify-center gap-12">
					<p>Temperature:</p>
					<p class="font-medium">
						{city[3].toFixed(2)}°C
					</p>
				</div>
			</div>
		{/each}
		<a href="/">Search again?</a>
	</div>
{/if}

<style>
</style>
