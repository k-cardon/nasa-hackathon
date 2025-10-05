<script lang="ts">
  import { Alert, Button, Dropdown, DropdownItem, DropdownGroup, DropdownHeader } from "flowbite-svelte";
  import { blur } from "svelte/transition"
  import { ChevronDownOutline, InfoCircleSolid } from "flowbite-svelte-icons";
	import type { svelte } from "@sveltejs/vite-plugin-svelte";
	import { cubicInOut } from "svelte/easing";
</script>

<style></style>

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
  Under maintenance! This is just a demo of "Name"
</Alert>


<Button>Choose a location<ChevronDownOutline class="ms-2 h-6 w-6 text-gray dark:text-black" /></Button>
<Dropdown>
  <DropdownHeader>
    <span class="block truncate text-sm font-medium">More locations coming soon!</span>
  </DropdownHeader>
  <DropdownGroup>
    <DropdownItem>Gothenburg</DropdownItem>
  </DropdownGroup>
</Dropdown>

