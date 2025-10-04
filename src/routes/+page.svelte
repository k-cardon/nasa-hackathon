<script>
    let location = 'Gothenburg'
    let weatherOptions = [
        {id: 1, text: 'Precipitation'},
        {id: 2, text: 'Temperature'},
        {id: 3, text: 'Sun'}
    ];

    let avoid_weather = '';
    let preferred_weather = '';

    function handleSubmit(event) {
        event.preventDefault();
        alert(`you are looking for ${preferred_weather} and you want to avoid ${avoid_weather} in ${location}`)
    }    
</script>

<h1 class="text-3xl font-bold center mx-10 mt-10 p-5">Will It Rain On My Parade?</h1>
<p class="mx-10 p-5">NASA Hackathon 2025</p>
<form onsubmit={handleSubmit}>
    <p class="mx-10 px-5">Which location would you like to search?</p>
    <input class="mx-15 px-5" bind:value={location} />

    <p class="mx-10 px-5">What kind of weather are you looking for?</p>
    <select class="mx-15 px-5" bind:value={preferred_weather}>
        <option value='' disabled selected>Select one</option>
		{#each weatherOptions as weather}
			<option>{weather.text}</option>
		{/each}
	</select>

    <p class="mx-10 px-5">What kind of weather do you want to avoid?</p>
    <select class="mx-15 px-5" bind:value={preferred_weather}>
        <option value='' disabled selected>Select one</option>
		{#each weatherOptions as weather}
			<option>{weather.text}</option>
		{/each}
	</select>

    <button disabled={!preferred_weather} type="submit"> Submit </button>
</form>

