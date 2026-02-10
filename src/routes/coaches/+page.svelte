<script lang="ts">
  let { data } = $props();
  const c = data.content;
</script>

<svelte:head>
  <title>{c.title} | Sportrail Football</title>
  <meta name="description" content="{c.heading} - {c.description}" />
</svelte:head>

<!-- Hero -->
<section class="bg-sport-dark py-20 lg:py-28">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl">
      <span class="text-sport-red text-sm font-sport-heading font-semibold uppercase tracking-wider">{c.title}</span>
      <h1 class="text-4xl sm:text-5xl font-sport-heading font-black text-white mt-3 mb-6">
        {c.heading}
      </h1>
      <p class="text-lg text-sport-gray-300 font-sport-body leading-relaxed">
        {c.description}
      </p>
    </div>
  </div>
</section>

<!-- Expert Grid -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {#each c.categories as category, i}
      <div class={i < c.categories.length - 1 ? 'mb-16' : ''}>
        <h2 class="text-2xl font-sport-heading font-black text-sport-dark mb-8">{category.name}</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {#each category.experts as expert}
            <div class="bg-sport-light rounded-xl p-4 border border-sport-gray-100 hover:border-sport-red/30 transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-sport-red/10 rounded-full flex items-center justify-center text-lg">{expert.flag}</div>
                <div>
                  <div class="font-sport-heading font-bold text-sport-dark text-sm">{expert.name}</div>
                  <div class="text-sport-gray-500 text-xs">{expert.role}</div>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>

<!-- CTA -->
<section class="py-16 bg-sport-red">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-2xl font-sport-heading font-black text-white mb-4">{c.cta_title}</h2>
    <p class="text-sport-gray-300 font-sport-body mb-6">{c.cta_text}</p>
    <a href="/contact" class="inline-flex px-8 py-3 bg-sport-red hover:bg-sport-gold text-white font-sport-heading font-semibold rounded-xl transition-colors">
      {c.cta_button}
    </a>
  </div>
</section>
