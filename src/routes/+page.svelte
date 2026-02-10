<script lang="ts">
  let { data } = $props();
  const c = data.content;
</script>

<svelte:head>
  <title>Sportrail Football | Player Development & Coach Education — {c.badge}</title>
  <meta name="description" content="{c.subtitle}" />
</svelte:head>

<!-- Hero -->
<section class="relative bg-sport-dark overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-sport-red/40 via-sport-dark to-sport-dark"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
    <div class="max-w-3xl">
      <div class="flex items-center gap-2 mb-6">
        <span class="px-3 py-1 bg-sport-red/20 text-sport-red text-xs font-sport-heading font-semibold rounded-full uppercase tracking-wider">{c.badge}</span>
        <span class="px-3 py-1 bg-sport-gold/20 text-sport-gold text-xs font-sport-heading font-semibold rounded-full uppercase tracking-wider">Since 2016</span>
      </div>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-sport-heading font-black text-white leading-tight mb-6">
        {c.title_line1}<br/>
        <span class="text-sport-red">{c.title_line2}</span>
      </h1>
      <p class="text-lg sm:text-xl text-sport-gray-300 font-sport-body leading-relaxed mb-10 max-w-2xl">
        {c.subtitle}
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <a href="/players" class="px-8 py-4 bg-sport-red hover:bg-red-700 text-white text-center font-sport-heading font-bold rounded-xl transition-colors text-lg">
          Player Programs
        </a>
        <a href="/courses" class="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-center font-sport-heading font-bold rounded-xl transition-colors text-lg border border-white/20">
          Coach Education
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Two Tracks -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <span class="text-sport-red text-sm font-sport-heading font-semibold uppercase tracking-wider">Two Paths to Excellence</span>
      <h2 class="text-3xl sm:text-4xl font-sport-heading font-black text-sport-dark mt-3">Choose Your Track</h2>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <!-- Player Track -->
      <div class="relative bg-gradient-to-br from-sport-red to-sport-dark rounded-3xl p-8 lg:p-10 text-white overflow-hidden group hover:scale-[1.02] transition-transform">
        <div class="absolute top-0 right-0 w-32 h-32 bg-sport-red/10 rounded-full -translate-y-8 translate-x-8"></div>
        <div class="relative">
          <div class="w-14 h-14 bg-sport-red/20 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-7 h-7 text-sport-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          </div>
          <h3 class="text-2xl font-sport-heading font-bold mb-3">For Players</h3>
          <p class="text-sport-gray-300 mb-6 leading-relaxed">
            Development camps, professional trial opportunities, and immersive training programs in Portugal and Spain.
            Train where Europe's best players are made.
          </p>
          <ul class="space-y-3 mb-8">
            {#each ['Elite development camps (U14-U21)', 'Professional club trial placements', 'Summer intensive programs', 'International player pathways', 'Train at top Portuguese & Spanish facilities'] as item}
              <li class="flex items-center gap-2 text-sm">
                <svg class="w-4 h-4 text-sport-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                {item}
              </li>
            {/each}
          </ul>
          <a href="/players" class="inline-flex items-center gap-2 px-6 py-3 bg-sport-red hover:bg-white hover:text-sport-dark font-sport-heading font-semibold rounded-xl transition-colors">
            Explore Player Programs
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      </div>

      <!-- Coach Track -->
      <div class="relative bg-gradient-to-br from-sport-gold/90 to-sport-gold/70 rounded-3xl p-8 lg:p-10 text-sport-dark overflow-hidden group hover:scale-[1.02] transition-transform">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
        <div class="relative">
          <div class="w-14 h-14 bg-sport-dark/10 rounded-2xl flex items-center justify-center mb-6">
            <svg class="w-7 h-7 text-sport-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
          </div>
          <h3 class="text-2xl font-sport-heading font-bold mb-3">For Coaches</h3>
          <p class="text-sport-dark/80 mb-6 leading-relaxed">
            DGERT & IPDJ certified continuing education. Learn from 70+ elite faculty including UEFA Pro coaches,
            sporting directors, and sports scientists.
          </p>
          <ul class="space-y-3 mb-8">
            {#each ['IPDJ accredited credit units', 'UEFA Pro licensed instructors', 'Tailored courses for every specialization', 'Online & in-person formats', 'Scouting, analysis, S&C specializations'] as item}
              <li class="flex items-center gap-2 text-sm">
                <svg class="w-4 h-4 text-sport-dark shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                {item}
              </li>
            {/each}
          </ul>
          <a href="/courses" class="inline-flex items-center gap-2 px-6 py-3 bg-sport-dark hover:bg-sport-red text-white font-sport-heading font-semibold rounded-xl transition-colors">
            Explore Coach Programs
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Stats -->
<section class="py-20 bg-sport-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-8">
      {#each c.stats as stat}
        <div class="text-center">
          <div class="text-3xl sm:text-4xl font-sport-heading font-black text-sport-red">{stat.value}</div>
          <div class="text-sm text-sport-gray-500 font-sport-body mt-1">{stat.label}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Why Sportrail -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <span class="text-sport-red text-sm font-sport-heading font-semibold uppercase tracking-wider">Why Sportrail</span>
      <h2 class="text-3xl sm:text-4xl font-sport-heading font-black text-sport-dark mt-3 mb-4">
        {c.why_sportrail.title}
      </h2>
      <p class="text-sport-gray-500 max-w-2xl mx-auto">
        {c.why_sportrail.description}
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each c.why_sportrail.benefits as item}
        <div class="bg-sport-light rounded-2xl p-6 border border-sport-gray-100 hover:border-sport-red/30 transition-colors">
          <div class="text-3xl mb-3">{item.icon}</div>
          <h3 class="font-sport-heading font-bold text-sport-dark text-lg mb-2">{item.title}</h3>
          <p class="text-sport-gray-500 text-sm leading-relaxed">{item.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Upcoming Events -->
<section class="py-24 bg-sport-dark">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <span class="text-sport-gold text-sm font-sport-heading font-semibold uppercase tracking-wider">2026 Calendar</span>
      <h2 class="text-3xl sm:text-4xl font-sport-heading font-black text-white mt-3">Upcoming Programs & Events</h2>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each [
        { title: 'Summer Player Development Camp', date: 'June - August 2026', location: 'Lisbon & Algarve, Portugal', type: 'Players' },
        { title: 'International Pro Trials Week', date: 'July 2026', location: 'Lisbon, Portugal', type: 'Players' },
        { title: 'Sportrail Football Science Conference', date: 'September 2026', location: 'Oeiras, Portugal', type: 'Coaches' },
        { title: 'Coaching Masterclass Series', date: 'Year-round', location: 'Online & In-person', type: 'Coaches' },
        { title: 'Easter Intensive Camp', date: 'April 2026', location: 'Portugal & Spain', type: 'Players' },
        { title: 'International Scouting Conference', date: 'November 2026', location: 'Oeiras, Portugal', type: 'Coaches' },
      ] as event}
        <div class="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
          <div class="flex items-center gap-2 mb-3">
            <span class="px-2 py-0.5 text-xs font-sport-heading font-semibold rounded-full {event.type === 'Players' ? 'bg-sport-red/20 text-sport-red' : 'bg-sport-gold/20 text-sport-gold'}">{event.type}</span>
          </div>
          <h3 class="font-sport-heading font-bold text-white text-lg mb-2">{event.title}</h3>
          <div class="space-y-1 text-sm text-sport-gray-400">
            <p>{event.date}</p>
            <p>{event.location}</p>
          </div>
        </div>
      {/each}
    </div>

    <div class="text-center mt-12">
      <a href="/contact" class="inline-flex px-8 py-4 bg-sport-red hover:bg-red-700 text-white font-sport-heading font-bold rounded-xl transition-colors text-lg">
        Register Your Interest
      </a>
    </div>
  </div>
</section>

<!-- Trusted By -->
<section class="py-16 bg-sport-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <p class="text-center text-sm text-sport-gray-400 font-sport-heading uppercase tracking-wider mb-8">Trusted by professionals from</p>
    <div class="flex flex-wrap items-center justify-center gap-8 lg:gap-12 opacity-60">
      {#each ['Casa Pia AC', 'SC Torreense', 'FC Famalicão', 'Sporting CP', 'Swedish Federation', 'German Federation', 'Viking FC', 'Flamengo'] as partner}
        <span class="font-sport-heading font-bold text-sport-gray-600 text-sm lg:text-base">{partner}</span>
      {/each}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-24 bg-gradient-to-br from-sport-red to-sport-dark">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl sm:text-4xl font-sport-heading font-black text-white mb-6">
      Ready to Start Your Journey?
    </h2>
    <p class="text-lg text-sport-gray-300 mb-10 max-w-2xl mx-auto">
      Whether you're a player looking for your next opportunity or a coach ready to elevate your career,
      Sportrail is your gateway to Iberian football excellence.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/players" class="px-8 py-4 bg-sport-red hover:bg-white hover:text-sport-dark text-white font-sport-heading font-bold rounded-xl transition-colors text-lg">
        I'm a Player
      </a>
      <a href="/courses" class="px-8 py-4 bg-sport-gold hover:bg-white hover:text-sport-dark text-sport-dark font-sport-heading font-bold rounded-xl transition-colors text-lg">
        I'm a Coach
      </a>
    </div>
  </div>
</section>
