<script lang="ts">
  import { Alert, Button, Dropdown, DropdownItem, DropdownGroup, DropdownHeader, Card } from "flowbite-svelte";
  import { blur } from "svelte/transition"
  import { ChevronDownOutline, InfoCircleSolid } from "flowbite-svelte-icons";
	import { cubicInOut } from "svelte/easing";

  import { ButtonToggleGroup, ButtonToggle } from "flowbite-svelte";

  let weather = ""; // track selected option
  let selected = "Select a place...";

  function handleSingleSelect(value: string | null) {
    weather = value;
    console.log("Weather:", value);
  }

  function choose(option) {
    selected = option;
  }
</script>

<style>
  .text {
    margin: auto;
    padding-bottom: 1%;
    font-family: "Rubik";
    font-weight: bold;
    font-size: larger;
    text-align: center;
  }

  .buttons {
    margin: auto;
    align-self: center;

  }

  .clearup {
    display: block;
    clear: both;
  }

</style>

<Alert
  color="amber"
  border
  dismissable
  transition={blur}
  params={{duration:200,easing:cubicInOut}}
>
  {#snippet icon()}
    <InfoCircleSolid class="h-5 w-5" />
  {/snippet}
  Under maintenance! This is just a demo of PlanMyWeather
</Alert>

<Card size="xl" class="p-10 h-max-100 w-xl mx-auto" color="primary-50">
  <h5 class="text">Welcome to PlanMy Weather!<br></h5>

  <div class="card">
  
  <!-- Weather buttons -->

  <h4><br>Choose the desirable weather</h4>

  <form method="POST">
    <input type="hidden" name="chosenWeather" bind:value={weather} />

    <ButtonToggleGroup onSelect={handleSingleSelect} class="buttons">
      <ButtonToggle color="yellow" value="Sunny" selected={weather === "Sunny"}>Sunny</ButtonToggle>
      <ButtonToggle color="sky" value="Rainy" selected={weather === "Rainy"}>Rainy</ButtonToggle>
      <ButtonToggle color="indigo" value="Cloudy" selected={weather === "Cloudy"}>Cloudy</ButtonToggle>
    </ButtonToggleGroup>

    <h4><br>Where are you?</h4>

    <Button>Location</Button>

    <Dropdown>

      <DropdownHeader>
        <span class="block truncate text-sm font-medium">More locations coming soon!</span>
      </DropdownHeader>
      
      <DropdownGroup>
        <DropdownItem onclick={selected === "Gothenburg"}>Gothenburg</DropdownItem>
        <DropdownItem onclick={selected === "Malmo"}>Stockholm</DropdownItem>
        <DropdownItem onclick={selected == "Stockholm"}>Malmö</DropdownItem>
      </DropdownGroup>

    </Dropdown>

    <p><br></p>
    <Button type="submit" color="blue" class="button">Show weather</Button>

  </form>
  </div>
</Card>