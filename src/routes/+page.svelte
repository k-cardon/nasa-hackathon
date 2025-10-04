<script>
    let location = 'Gothenburg'
    let weatherOptions = [
        {id: 1, text: 'Sunny'},
        {id: 2, text: 'Cloudy'},
        {id: 3, text: 'Windy'},
        {id: 4, text: 'Snowy'}
    ];
    let preferred_weather = '';
</script>

<div class="gap-4 w-full h-full items-center text-center justify-center p-5  ">
    <div class="border-black border-2 border-solid rounded-lg">
        <p class="my-5 mx-30 px-10 text-center border-black border-2 border-solid rounded-sm">Some URL ourwebsite.com/somewebsite</p>
        <p class="mr-30 text-right">our mission</p>
            <div class="border-black border-2 border-solid rounded-sm mb-5 mx-30">
                <h1 class="flex text-3xl justify-center text-center pt-3">Welcome</h1>
                <form>
                    <p class="mx-5 p-5">What weather are you looking for today?</p>
                        <div>
                        {#each weatherOptions as weather}
                            <button
                                type="button"
                                class="bg-gray-100 text-gray-800 hover:bg-emerald-200 hover:text-emerald-500 hover:border-emerald-500 font-semibold py-2 px-2 m-2 border-2 border-gray-400 rounded shadow"
                                on:click={() => preferred_weather = weather.text}
                                class:selected={preferred_weather === weather.text}>
                                {weather.text}
                            </button>
                        {/each}
                        </div>
                    <div>
                        <button class="text-lg bg-sky-200 border-sky-300 border-2 border-solid hover:bg-sky-300 text-sky-800 font-semibold m-4 p-2 rounded shadow w-1/2" disabled={!preferred_weather} type="submit"> Show locations </button>
                    </div>
                    <div>
                        <span>Current location: </span><input class="m-5" bind:value={location} />
                    </div>
                </form>
            </div>
    </div>
</div>

<style>
	li {
		display: flex;
	}

	input[type="text"] {
		flex: 1;
		padding: 0.5em;
		margin: -0.2em 0;
		border: none;
	}
</style>


