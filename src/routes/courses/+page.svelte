<script lang="ts">
  let { data } = $props();
  const c = data.content;
</script>

<svelte:head>
  <title>Coach Education | Sportrail Football — {c.title}</title>
  <meta name="description" content="{c.subtitle}" />
</svelte:head>

<!-- Hero -->
<section class="bg-sport-dark py-20 lg:py-28">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl">
      <span class="text-sport-gold text-sm font-sport-heading font-semibold uppercase tracking-wider">For Coaches</span>
      <h1 class="text-4xl sm:text-5xl font-sport-heading font-black text-white mt-3 mb-6">
        Coach Education<br/><span class="text-sport-gold">In-Person & Online</span>
      </h1>
      <p class="text-lg text-sport-gray-300 font-sport-body leading-relaxed">
        {c.subtitle}
      </p>
    </div>
  </div>
</section>

<!-- Flagship Programs -->
<section id="certification" class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl font-sport-heading font-black text-sport-dark mb-8">Flagship Programs</h2>

    <div class="grid md:grid-cols-2 gap-8">
      {#each c.flagship_programs as course}
        <div class="bg-gradient-to-br from-sport-red to-sport-secondary rounded-2xl overflow-hidden ring-2 ring-sport-gold">
          <div class="p-8">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sport-gold text-xs font-sport-heading font-semibold uppercase tracking-wider">{course.edition}</span>
              <span class="px-3 py-1 bg-sport-gold/20 text-sport-gold text-xs font-sport-heading font-bold rounded-full">FLAGSHIP</span>
            </div>
            <h3 class="text-2xl font-sport-heading font-bold text-white mb-3">{course.title}</h3>
            <p class="text-sport-gray-300 font-sport-body text-sm leading-relaxed mb-6">{course.description}</p>

            <div class="mb-6">
              <h4 class="text-white font-sport-heading font-semibold text-sm mb-3">What You'll Learn:</h4>
              <div class="grid grid-cols-2 gap-2">
                {#each course.topics.split(', ') as topic}
                  <div class="flex items-center gap-2 text-sport-gray-300 text-sm">
                    <span class="w-1.5 h-1.5 bg-sport-red rounded-full shrink-0"></span>
                    <span>{topic}</span>
                  </div>
                {/each}
              </div>
            </div>

            <div class="flex items-center justify-between pt-6 border-t border-white/10">
              <span class="text-sport-gray-400 text-sm">{course.format}</span>
              <a href="/contact" class="px-6 py-3 bg-sport-red hover:bg-white hover:text-sport-red text-white font-sport-heading font-semibold rounded-xl transition-colors">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Tailored Courses -->
<section id="tailored" class="py-24 bg-sport-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl font-sport-heading font-black text-sport-dark mb-2">Tailored Courses</h2>
    <p class="text-sport-gray-500 font-sport-body mb-8">Focused, intensive programs on specific coaching domains.</p>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each c.tailored_courses as mc}
        <div class="bg-white rounded-2xl p-6 border border-sport-gray-100 hover:border-sport-red/30 hover:shadow-lg transition-all">
          <div class="text-3xl mb-3">{mc.icon}</div>
          <h3 class="font-sport-heading font-bold text-sport-dark text-lg mb-2">{mc.title}</h3>
          <p class="text-sport-gray-500 font-sport-body text-sm leading-relaxed mb-4">{mc.description}</p>
          <div class="pt-4 border-t border-sport-gray-100">
            <a href="/contact" class="inline-flex items-center gap-2 text-sm font-sport-heading font-semibold text-sport-red hover:text-red-700 transition-colors">
              Get a Quote
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
