<script lang="ts">
  import { Alert } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons";
</script>

<style>
  .alert {
    margin: 50%;
    padding-left: 60%;

  }
</style>


<Alert color="red" class="alert">
  {#snippet icon()}<InfoCircleSolid class="h-5 w-5"/>{/snippet}
  <span class="font-bold">Under development!</span>
  More features coming soon!
</Alert>