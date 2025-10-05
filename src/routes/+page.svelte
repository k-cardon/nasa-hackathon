<script>
	let location = 'Gothenburg';
	let weatherOptions = [
		{ id: 1, text: 'Sunny' },
		{ id: 2, text: 'Cloudy' },
		{ id: 3, text: 'Rainy' },
		{ id: 4, text: 'Snowy' }
	];
	let preferredWeather = $state('');
	//let placesOfInterest = $state('');
	//let date = $state('');
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
	<div
		class="align-center flex md:h-[75%] md:w-[60%] flex-col justify-center rounded-lg"
	>
		<p class="mr-30 text-right">our mission</p>
		<div class="md:mx-30 mb-5 rounded-sm border-2 border-solid border-black">
			<h1 class="flex justify-center pt-3 text-center text-3xl">Welcome</h1>
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
						<input class="w-1/2 rounded" type="date" name="date" />
					</label>
				</div>

				<div>
					<label for="preferred-locations">
						<p>Where would you like to go?</p>
						<input
							class="w-5/6 rounded"
							name="preferred-locations"
							type="text"
							placeholder="Parks, concert venues, beaches..."
						/>
					</label>
				</div>

				<div>
					<button
						class="m-4 w-1/2 rounded border-2 border-solid border-sky-300 bg-sky-200 p-2 text-lg font-semibold text-sky-800 shadow hover:bg-sky-300"
						type="submit"
					>
						Show locations
					</button>
				</div>

				<div class="p-8 md:p-0">
					<span>Current location: </span>
					<input name="location" class="m-2" bind:value={location} />
				</div>
			</form>
		</div>
	</div>
</div>

<style>
</style>
