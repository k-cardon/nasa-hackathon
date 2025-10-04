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

<script>
	let todos = $state([
		{ done: false, text: 'finish Svelte tutorial' },
		{ done: false, text: 'build an app' },
		{ done: false, text: 'world domination' }
	]);

	function add() {
		todos.push({
			done: false,
			text: ''
		});
	}

	function clear() {
		todos = todos.filter((t) => !t.done);
	}

	let remaining = $derived(todos.filter((t) => !t.done).length);
</script>

<div class="centered">
	<h1>todos</h1>

	<ul class="todos">
		{#each todos as todo}
			<li class={{ done: todo.done }}>
				<input
					type="checkbox"
					checked={todo.done}
				/>

				<input
					type="text"
					placeholder="What needs to be done?"
					value={todo.text}
				/>
			</li>
		{/each}
	</ul>

	<p>{remaining} remaining</p>

	<button onclick={add}>
		Add new
	</button>

	<button onclick={clear}>
		Clear completed
	</button>
</div>

<style>
	.centered {
		max-width: 20em;
		margin: 0 auto;
	}

	.done {
		opacity: 0.4;
	}

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


