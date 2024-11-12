<script>
  export let duration;
  export let price;
  export let features;
  export let popular = false;

  function handleClick() {
    const url = `https://wa.me/your-number?text=I'm interested in the ${duration} plan for $${price}`;
    window.open(url, '_blank');
  }
</script>

<div class="transform transition-all duration-300 hover:scale-105">
  <div class={`relative bg-secondary p-6 rounded-lg ${popular ? 'border-2 border-primary' : ''}`}>
    {#if popular}
      <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <span class="bg-primary text-dark px-4 py-1 rounded-full text-sm font-bold">Most Popular</span>
      </div>
    {/if}
    <h3 class="text-white text-xl mb-4">{duration}</h3>
    <div class="text-primary text-4xl font-bold mb-6">
      <sup class="text-lg">$</sup>{price}
    </div>
    <ul class="text-gray-400 mb-6 min-h-[160px]">
      {#each features as feature}
        <li class="mb-3 flex items-center">
          <span class="text-primary mr-2">✓</span>
          {feature}
        </li>
      {/each}
    </ul>
    <button 
      on:click={handleClick}
      class="w-full bg-primary text-dark px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
    >
      <span>Get Started</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</div>