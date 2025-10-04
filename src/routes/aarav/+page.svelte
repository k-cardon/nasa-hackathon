<script>
  import { fly, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { onMount } from "svelte";
  import { DropdownHeader } from "flowbite-svelte";

  let showPopup = true;
  let selectedWeather = null;
  let flyIcon = false;

  const weatherOptions = ["Sunny", "Cloudy", "Windy", "Snowy"];

  function toggleWeather(option) {
    selectedWeather = selectedWeather === option ? null : option;
  }

  function handleShowLocations() {
    flyIcon = true;
    // wait for icon animation before closing popup
    setTimeout(() => {
      showPopup = false;
    }, 600);
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;600&display=swap');

  * {
    font-family: 'Rubik', sans-serif;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center; /* horizontal */
    align-items: center;     /* vertical */
    background: rgba(0,0,0,0); /* optional dark backdrop */
    z-index: 1000;
    }

  .popup {
    position: relative;
    max-width: 600px;
    margin: 0px auto;
    padding: 20px 20px;
    border-radius: 1rem;
    background: white;
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    text-align: center;
  }

  .weather-btns {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .weather-btn {
    padding: 0.6rem 1.2rem;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    background: #ddd;
    color: #222;
  }

  .weather-btn.active {
    background: #6fcf97;
    color: white;
  }

  .show-btn {
    margin-top: 1rem;
    padding: 0.8rem 1.5rem;
    background: #4da6ff;
    border: none;
    border-radius: 0.6rem;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .show-btn:hover {
    background: #3385e6;
  }

  .info-icon {
    position: absolute;
    top: 0.8rem;
    right: 1rem;
    font-size: 1.2rem;
    cursor: pointer;
    user-select: none;
  }

  .location {
    margin-top: 1rem;
    font-size: 0.9rem;
  }
</style>

{#if showPopup}
    <div class="overlay">
        <div class="popup" transition:fly={{ y: 50, duration: 400, easing: cubicOut }}>
            <div class="info-icon"
            transition:fly|local={{ y: flyIcon ? -200 : 0, duration: 600, easing: cubicOut }}>
            ⓘ
            </div>

    <h2>Welcome</h2>
    <p>What weather are you looking for today?</p>

    <div class="weather-btns">
      {#each weatherOptions as option}
        <button
          class="weather-btn {selectedWeather === option ? 'active' : ''}"
          on:click={() => toggleWeather(option)}
          transition:fade>
          {option}
        </button>
      {/each}
    </div>

    <button class="show-btn" on:click={handleShowLocations}>
      Show locations
    </button>

    <div class="location">
      Current location:
    <DropdownHeader>
        <span class="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
        <span class="block truncate text-sm font-medium">name@flowbite.com</span>
    </DropdownHeader>
      <select>
        <option>Gothenburg</option>
        <option>Coming soon...</option>
      </select>
    </div>
  </div>
  </div>
{/if}
