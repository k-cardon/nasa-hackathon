<!-- --
<script lang="ts">
  import { Alert, Button, Dropdown, DropdownItem, DropdownGroup, DropdownHeader, Card } from "flowbite-svelte";
  import { blur } from "svelte/transition"
  import { ChevronDownOutline, InfoCircleSolid } from "flowbite-svelte-icons";
	import { cubicInOut } from "svelte/easing";

  import { ButtonToggleGroup, ButtonToggle } from "flowbite-svelte";

  let weather = ""; // track selected option

  function handleSingleSelect(value: string | null) {
    weather = value;
    console.log("Weather:", value);

  }
</script>

<style>
  .text {
    margin: auto;
    padding-bottom: 5%;
    font-family: "Rubik";
    font-weight: bolder;
    font-size: larger;
  }

  .card {
    padding: 50px, 50px, 50px, 50px;
    margin: auto;
  }

  .clearup {
    display: block;
    clear:both;
  }

</style>

<Alert
  color="amber"
  border
  dismissable
  transition={blur}
  params={{duration:500,easing:cubicInOut}}
>
  {#snippet icon()}
    <InfoCircleSolid class="h-5 w-5" />
  {/snippet}
  Under maintenance! This is just a demo of "PlanMyWeather"
</Alert>

<Card size="lg" class="">
  <h5 class="text">What weather are you looking for today?</h5>

  <div class="card">

  <form method="POST">
    <input type="hidden" name="chosenWeather" bind:value={weather} />

    <ButtonToggleGroup onSelect={handleSingleSelect}>
      <ButtonToggle color="yellow" value="Sunny" selected={weather === "Sunny"}>Sunny</ButtonToggle>
      <ButtonToggle color="sky" value="Rainy" selected={weather === "Rainy"}>Rainy</ButtonToggle>
      <ButtonToggle color="indigo" value="Cloudy" selected={weather === "Cloudy"}>Cloudy</ButtonToggle>
    </ButtonToggleGroup>

    <Button class="button">Location</Button>

    <Dropdown>
      <DropdownHeader>
        <span class="block truncate text-sm font-medium">More locations coming soon!</span>
      </DropdownHeader>

      <DropdownGroup>
        <DropdownItem>Gothenburg</DropdownItem>
        <DropdownItem>Stockholm</DropdownItem>
        <DropdownItem>Malmö</DropdownItem>
      </DropdownGroup>
    </Dropdown>

    <Button type="submit" color="blue" class="">Show locations</Button>

  </form>
  </div>
</Card>
-->
