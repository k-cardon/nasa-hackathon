<h1 class="text-3xl font-bold center mx-10 mt-10 p-5">Will It Rain On My Parade?</h1>
<p class="mx-10 p-5">NASA Hackathon 2025</p>
<p class="mx-10 px-5">Which location would you like to search?</p>
<p class="mx-10 px-5">What kind of weather are you looking for?</p>
<ul class="mx-10 px-8"><li>Temperature</li><li>Precipitation</li><li>Sun</li></ul>
<p class="mx-10 px-5">What kind of weather do you want to avoid?</p>
<ul class="mx-10 px-8"><li>Temperature</li><li>Precipitation</li><li>Sun</li></ul>

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


