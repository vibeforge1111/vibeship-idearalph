<svelte:head>
  <title>Conferences & Events | Sportrail Football</title>
  <meta name="description" content="Sportrail Football Science Conference and International Scouting Conference. World-class speakers, networking, and knowledge sharing." />
</svelte:head>

<!-- Hero -->
<section class="bg-sport-dark py-20 lg:py-28">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl">
      <span class="text-sport-gold text-sm font-sport-heading font-semibold uppercase tracking-wider">Events</span>
      <h1 class="text-4xl sm:text-5xl font-sport-heading font-black text-white mt-3 mb-6">
        International Conferences
      </h1>
      <p class="text-lg text-sport-gray-300 font-sport-body leading-relaxed">
        Where the global football community comes together to share knowledge, debate the future,
        and build connections that last careers.
      </p>
    </div>
  </div>
</section>

<!-- Conferences -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="space-y-16">

      <!-- Football Science Conference -->
      <div class="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-sport-red/10 rounded-full mb-4">
            <span class="text-sport-red text-sm font-sport-heading font-semibold">Annual Event</span>
          </div>
          <h2 class="text-3xl font-sport-heading font-black text-sport-dark mb-4">Football Science Conference</h2>
          <p class="text-sport-gray-600 font-sport-body leading-relaxed mb-6">
            Our flagship academic event bringing together sports scientists, researchers, performance
            coaches, and PhD-level professionals to present cutting-edge research in football science.
          </p>
          <div class="space-y-3 mb-6">
            {#each [
              'Sports science research presentations',
              'Performance & conditioning innovation',
              'Injury prevention methodologies',
              'Data analytics in football',
              'Technology & wearables in sport',
              'Networking with researchers worldwide',
            ] as topic}
              <div class="flex items-center gap-3 text-sport-gray-600 text-sm">
                <span class="w-1.5 h-1.5 bg-sport-red rounded-full shrink-0"></span>
                {topic}
              </div>
            {/each}
          </div>
          <a href="/contact" class="inline-flex px-6 py-3 bg-sport-red hover:bg-red-700 text-white font-sport-heading font-semibold rounded-xl transition-colors">
            Register Interest
          </a>
        </div>
        <div class="bg-gradient-to-br from-sport-red to-sport-accent rounded-2xl p-10 text-center">
          <div class="text-5xl mb-3">🔬</div>
          <h3 class="text-xl font-sport-heading font-bold text-white mb-2">Football Science Conference</h3>
          <p class="text-white/70 text-sm mb-6">Research • Innovation • Performance</p>
          <div class="bg-white/10 rounded-xl p-4">
            <p class="text-white/80 text-sm">2026 edition dates coming soon. Join our mailing list to be notified.</p>
          </div>
        </div>
      </div>

      <hr class="border-sport-gray-200" />

      <!-- Scouting Conference -->
      <div class="grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-sport-gold/10 rounded-full mb-4">
            <span class="text-sport-gold text-sm font-sport-heading font-semibold">Annual Event</span>
          </div>
          <h2 class="text-3xl font-sport-heading font-black text-sport-dark mb-4">International Scouting Conference</h2>
          <p class="text-sport-gray-600 font-sport-body leading-relaxed mb-6">
            A dedicated event debating the present and future of the scouting profession. Meet and
            connect with scouts, recruitment professionals, and sporting directors from around the world.
          </p>
          <div class="space-y-3 mb-6">
            {#each [
              'Talent identification best practices',
              'Data-driven scouting methods',
              'Scouting report frameworks',
              'Youth development pathways',
              'Building scouting networks',
              'Networking with scouts & recruiters globally',
            ] as topic}
              <div class="flex items-center gap-3 text-sport-gray-600 text-sm">
                <span class="w-1.5 h-1.5 bg-sport-gold rounded-full shrink-0"></span>
                {topic}
              </div>
            {/each}
          </div>
          <a href="/contact" class="inline-flex px-6 py-3 bg-sport-red hover:bg-red-700 text-white font-sport-heading font-semibold rounded-xl transition-colors">
            Register Interest
          </a>
        </div>
        <div class="bg-gradient-to-br from-sport-dark to-sport-primary rounded-2xl p-10 text-center">
          <div class="text-5xl mb-3">🔍</div>
          <h3 class="text-xl font-sport-heading font-bold text-white mb-2">International Scouting Conference</h3>
          <p class="text-white/70 text-sm mb-6">Scouting • Recruitment • Talent</p>
          <div class="bg-white/10 rounded-xl p-4">
            <p class="text-white/80 text-sm">2026 edition dates coming soon. Join our mailing list to be notified.</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- Past Speakers -->
<section class="py-24 bg-sport-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl font-sport-heading font-black text-sport-dark mb-4">Past Speakers Include</h2>
    <p class="text-sport-gray-500 font-sport-body mb-12">Professionals from top clubs and organizations worldwide.</p>
    <div class="flex flex-wrap justify-center gap-3">
      {#each [
        'Damir Dugandzic (German FA)',
        'Daniel Parnell (Assoc. of Sporting Directors)',
        'Martin Buchheitt (S&C)',
        'Carlos Balsalobre (Sports Science)',
        'Jose Boto (Sporting Director)',
        'Luis Castro (UEFA Pro)',
        'Renato Paiva (Coach)',
        'Diogo Teixeira (Sporting CP)',
        'Rodrigo Paiva (Flamengo)',
      ] as speaker}
        <span class="px-4 py-2 bg-white rounded-full text-sm font-sport-body text-sport-gray-700 border border-sport-gray-200">{speaker}</span>
      {/each}
    </div>
  </div>
</section>
