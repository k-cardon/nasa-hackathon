<script>
  // --- LOCATION (Gothenburg) ---
  const user = {
    city: 'Gothenburg',
    lat: 57.7089,
    lon: 11.9746
  };

  // --- FILTERS ---
  let allFilters = ['Parks', 'Viewpoint', 'Waterfront', 'Playground', 'Historic'];
  let selectedFilters = ['Parks', 'Viewpoint'];
  let showAddMenu = false;

  function removeFilter(tag) {
    selectedFilters = selectedFilters.filter(t => t !== tag);
  }
  function addFilter(tag) {
    if (!selectedFilters.includes(tag)) selectedFilters = [...selectedFilters, tag];
    showAddMenu = false;
  }

  // --- MOCK "NASA Power API" STYLE DATA (replace with real API data later) ---
  // coords are real-ish; tune as you like
  let places = [
    {
      id: 1,
      name: 'Slottsskogen Park',
      type: 'Parks',
      lat: 57.6847,
      lon: 11.9360,
      sun: 78,          // %
      temp: 18,         // °C
      rainChance: 12,   // %
      wind: 3.4         // m/s
    },
    {
      id: 2,
      name: 'Skansen Kronan Viewpoint',
      type: 'Viewpoint',
      lat: 57.6963,
      lon: 11.9514,
      sun: 70,
      temp: 17,
      rainChance: 20,
      wind: 4.1
    },
    {
      id: 3,
      name: 'Keillers Park (Ramberget)',
      type: 'Viewpoint',
      lat: 57.7206,
      lon: 11.9389,
      sun: 62,
      temp: 16,
      rainChance: 35,
      wind: 5.2
    },
    {
      id: 4,
      name: 'Kungsparken',
      type: 'Parks',
      lat: 57.7029,
      lon: 11.9658,
      sun: 74,
      temp: 18,
      rainChance: 15,
      wind: 3.2
    },
    {
      id: 5,
      name: 'Röda Sten Waterfront',
      type: 'Waterfront',
      lat: 57.6912,
      lon: 11.9165,
      sun: 55,
      temp: 16,
      rainChance: 40,
      wind: 6.3
    }
  ];

  // --- HELPERS ---
  const toRad = d => (d * Math.PI) / 180;
  function haversineKm(a, b) {
    // distance between two {lat, lon}
    const R = 6371;
    const dLat = toRad(b.lat - a.lat);
    const dLon = toRad(b.lon - a.lon);
    const lat1 = toRad(a.lat);
    const lat2 = toRad(b.lat);
    const h =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  }

  function score(p) {
    // simple “nice weather” score: more sun, less rain/wind, temp comfort at ~20°C
    const sun = p.sun;                // 0-100
    const rain = 100 - p.rainChance;  // higher is better
    const wind = Math.max(0, 10 - p.wind * 2) * 10; // ~ 0..100 (calm better)
    const tempComfort = 100 - Math.min(100, Math.abs(20 - p.temp) * 7);
    // weights
    return 0.45 * sun + 0.25 * rain + 0.15 * wind + 0.15 * tempComfort;
  }

  // derived lists
  $: visible = places
    .filter(p => selectedFilters.length === 0 || selectedFilters.includes(p.type))
    .map(p => ({
      ...p,
      distanceKm: haversineKm({ lat: user.lat, lon: user.lon }, p),
      score: score(p)
    }))
    .sort((a, b) => b.score - a.score);

  $: best = visible[0];
  $: alternatives = visible.slice(1, 3);
  $: worst = visible.slice(-2);

  function pct(n) {
    return `${Math.round(n)}%`;
  }
  function km(n) {
    return `${n.toFixed(1)} km`;
  }
</script>

<!-- TOP BAR -->
<div class="max-w-3xl mx-auto mt-6">
  <div class="rounded-2xl border bg-white/70 backdrop-blur-md shadow-sm p-4">
    <div class="flex items-center gap-2 mb-2">
      <div class="text-xl">🧭</div>
      <div class="font-semibold">Filters</div>
    </div>

    <!-- Selected chips -->
    <div class="flex flex-wrap gap-2">
      {#if selectedFilters.length === 0}
        <span class="text-sm text-gray-500">No filters selected</span>
      {/if}
      {#each selectedFilters as tag}
        <button
          class="group inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-gradient-to-br from-gray-50 to-white hover:from-white hover:to-gray-50 shadow-sm"
          on:click={() => removeFilter(tag)}
          title="Remove filter">
          <span class="text-sm">{tag}</span>
          <span class="text-gray-500 group-hover:text-red-600">✕</span>
        </button>
      {/each}

      <!-- Add button + popover -->
      <div class="relative">
        <button
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-blue-50 hover:bg-blue-100 text-blue-700 shadow-sm"
          on:click={() => (showAddMenu = !showAddMenu)}>
          ➕ Add…
        </button>

        {#if showAddMenu}
          <div
            class="absolute z-10 mt-2 w-48 rounded-xl border bg-white shadow-lg p-2">
            {#each allFilters.filter(f => !selectedFilters.includes(f)) as f}
              <button
                class="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
                on:click={() => addFilter(f)}>
                {f}
              </button>
            {/each}
            {#if allFilters.filter(f => !selectedFilters.includes(f)).length === 0}
              <div class="px-3 py-2 text-sm text-gray-500">Nothing to add</div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>

<!-- RESULTS -->
<div class="max-w-3xl mx-auto mt-6 space-y-5">

  <!-- BEST -->
  <section class="rounded-3xl border bg-white/80 backdrop-blur-md shadow p-5">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-lg font-semibold">Best</h2>
      <span class="text-xs text-gray-500">From {user.city} • {user.lat.toFixed(4)}, {user.lon.toFixed(4)}</span>
    </div>

    {#if best}
      <div class="rounded-2xl p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border shadow-sm">
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="text-2xl font-bold">{best.name}</div>
            <div class="text-sm text-gray-600">{best.type} • {km(best.distanceKm)}</div>
            <div class="text-xs text-gray-500 mt-1">
              {best.lat.toFixed(4)}, {best.lon.toFixed(4)}
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm text-gray-500">Score</div>
            <div class="text-2xl font-semibold">{Math.round(best.score)}</div>
          </div>
        </div>

        <!-- Metrics row -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <div class="rounded-xl border bg-white p-3 shadow-sm">
            <div class="text-sm text-gray-500">☀️ Sun</div>
            <div class="text-lg font-semibold">{pct(best.sun)}</div>
          </div>
          <div class="rounded-xl border bg-white p-3 shadow-sm">
            <div class="text-sm text-gray-500">🌡️ Temp</div>
            <div class="text-lg font-semibold">{best.temp}°C</div>
          </div>
          <div class="rounded-xl border bg-white p-3 shadow-sm">
            <div class="text-sm text-gray-500">🌧️ Rain</div>
            <div class="text-lg font-semibold">{best.rainChance}%</div>
          </div>
          <div class="rounded-xl border bg-white p-3 shadow-sm">
            <div class="text-sm text-gray-500">🌬️ Wind</div>
            <div class="text-lg font-semibold">{best.wind} m/s</div>
          </div>
        </div>
      </div>
    {:else}
      <div class="text-sm text-gray-500">No places match the active filters.</div>
    {/if}
  </section>

  <!-- ALTERNATIVES -->
  <section class="rounded-3xl border bg-white/80 backdrop-blur-md shadow p-5">
    <h2 class="text-lg font-semibold mb-3">Alternative locations</h2>
    {#if alternatives.length > 0}
      <div class="grid sm:grid-cols-2 gap-4">
        {#each alternatives as p}
          <div class="rounded-2xl border bg-white p-4 shadow-sm hover:shadow-md transition">
            <div class="flex items-start justify-between">
              <div>
                <div class="font-semibold">{p.name}</div>
                <div class="text-xs text-gray-500">{p.type} • {km(p.distanceKm)}</div>
              </div>
              <div class="text-sm text-gray-600">⭐ {Math.round(p.score)}</div>
            </div>
            <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div class="rounded-lg bg-gray-50 p-2">☀️ {pct(p.sun)}</div>
              <div class="rounded-lg bg-gray-50 p-2">🌡️ {p.temp}°C</div>
              <div class="rounded-lg bg-gray-50 p-2">🌧️ {p.rainChance}%</div>
              <div class="rounded-lg bg-gray-50 p-2">🌬️ {p.wind} m/s</div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-sm text-gray-500">No alternatives right now.</div>
    {/if}
  </section>

  <!-- WORST -->
  <section class="rounded-3xl border bg-white/80 backdrop-blur-md shadow p-5">
    <h2 class="text-lg font-semibold mb-3">Worst</h2>
    {#if worst.length > 0}
      <div class="grid sm:grid-cols-2 gap-4">
        {#each worst as p}
          <div class="rounded-2xl border bg-white p-4 opacity-80">
            <div class="flex items-start justify-between">
              <div>
                <div class="font-semibold">{p.name}</div>
                <div class="text-xs text-gray-500">{p.type} • {km(p.distanceKm)}</div>
              </div>
              <div class="text-sm text-gray-600">⭐ {Math.round(p.score)}</div>
            </div>
            <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div class="rounded-lg bg-gray-50 p-2">☀️ {pct(p.sun)}</div>
              <div class="rounded-lg bg-gray-50 p-2">🌡️ {p.temp}°C</div>
              <div class="rounded-lg bg-gray-50 p-2">🌧️ {p.rainChance}%</div>
              <div class="rounded-lg bg-gray-50 p-2">🌬️ {p.wind} m/s</div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-sm text-gray-500">Nothing terrible — yay!</div>
    {/if}
  </section>
</div>

<style>
  /* optional soft background for the whole page */
  :global(body) {
    background:
      radial-gradient(1000px 600px at 0% 0%, #e0f2fe55, transparent),
      radial-gradient(800px 500px at 100% 20%, #ede9fe55, transparent),
      radial-gradient(700px 400px at 50% 100%, #dcfce755, transparent);
  }
</style>
