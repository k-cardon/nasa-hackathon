<script lang="ts">
	import type { PageProps } from './$types';
	import { ButtonToggle, ButtonToggleGroup } from 'flowbite-svelte';

	let location = 'Stockholm';
	let weatherOptions = [
		{ id: 1, text: 'Sunny', color: "yellow"},
		{ id: 2, text: 'Cloudy', color: "blue" },
		{ id: 3, text: 'Rainy', color: "indigo" }
	];
	let preferredWeather = $state('');
	let weather = "";

	let { form }: PageProps = $props();
    let showResult = $state(false);
    let searchAgain = $state(false);
	//let placesOfInterest = $state('');
	//let date = $state('');

	function handleSingleSelect(value: string | null) {
		weather = value;
		console.log("Weather:", value);
  }
</script>

{#if !form?.success}
	<div class="flex h-full w-full flex-col items-center justify-center gap-4 p-5 text-center">
		<div
			class="align-center flex h-[75%] w-[60%] flex-col justify-center rounded-lg"
		>
			<div class="mx-30 mb-5 rounded-sm border-2 border-solid border-black">
				<h1 class="flex justify-center p-3 text-center text-3xl">Welcome</h1>
				<form method="POST" class="flex flex-col gap-3">
					<p class="mx-5">What weather are you looking for today?</p>
					<div class="flex flex-row justify-center">
						{#each weatherOptions as weather (weather.id)}
							<div class="flex flex-row">
								<input type="hidden" id={weather.text} name={weather.text} bind:value={weather.id} />

								<ButtonToggleGroup onSelect={handleSingleSelect} class="buttons">
								<ButtonToggle 
									for={weather.text}
									color={weather.color} 
									id={weather.text} 
									selected={weather.text === weather.text}
								>
									{weather.text}
								</ButtonToggle>
								</ButtonToggleGroup>
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
							class="m-4 pb-4 w-1/2 rounded border-2 border-solid border-sky-300 bg-sky-200 p-2 text-lg font-semibold text-sky-800 shadow hover:bg-sky-300"
							type="submit"
						>
							Show locations
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
{:else}
        <div class="flex h-full w-full flex-col items-center justify-center gap-4 p-5 text-center">
                {#each form.ranked_cities as city (city)}
                        <div class="flex h-1/3 w-1/2 flex-col items-center justify-center gap-4 p-5 text-center md:mx-30 mb-5 rounded-sm border-2 border-solid border-black">
                <p>{city[0]} {city[1]} {city[2]}</p></div>
            {/each}
            <a href="/">Search again?</a>
        </div>
{/if}

<style>
</style>
