<script lang="ts">
  let { data } = $props();
  const c = data.content;
</script>

<svelte:head>
  <title>{c.title} | Sportrail Football</title>
  <meta name="description" content="{c.subtitle}" />
</svelte:head>

<!-- Hero -->
<section class="relative bg-sport-dark overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-sport-accent/30 via-sport-dark to-sport-dark"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
    <div class="max-w-3xl">
      <span class="text-sport-red text-sm font-sport-heading font-semibold uppercase tracking-wider">For Players</span>
      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-sport-heading font-black text-white mt-3 mb-6 leading-tight">
        Your Path to<br/><span class="text-sport-red">Professional Football</span>
      </h1>
      <p class="text-lg sm:text-xl text-sport-gray-300 font-sport-body leading-relaxed mb-10 max-w-2xl">
        {c.subtitle}
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <a href="/contact" class="px-8 py-4 bg-sport-red hover:bg-red-700 text-white text-center font-sport-heading font-bold rounded-xl transition-colors text-lg">
          Apply Now
        </a>
        <a href="#programs" class="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-center font-sport-heading font-bold rounded-xl transition-colors text-lg border border-white/20">
          View Programs
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Why Portugal & Spain -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <span class="text-sport-red text-sm font-sport-heading font-semibold uppercase tracking-wider">Why Iberia</span>
      <h2 class="text-3xl sm:text-4xl font-sport-heading font-black text-sport-dark mt-3 mb-4">
        The Best Place to Develop as a Player
      </h2>
      <p class="text-sport-gray-500 max-w-2xl mx-auto">
        Portugal and Spain have produced more Champions League winners, World Cup finalists, and
        Ballon d'Or nominees than almost any region on earth. Our programs put you in that ecosystem.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each [
        { title: 'Elite Coaching', desc: 'Train under UEFA Pro licensed coaches with experience at Liga Portugal and La Liga clubs.', icon: '🎯' },
        { title: 'Club Access', desc: 'Direct trial opportunities with professional clubs in Portugal and Spain through our network.', icon: '🏟️' },
        { title: 'Year-Round Training', desc: 'Mediterranean climate allows outdoor training 365 days a year. No weather disruptions.', icon: '☀️' },
        { title: 'Scout Visibility', desc: 'Regular exposure to professional scouts from Portuguese, Spanish, and wider European clubs.', icon: '👁️' },
      ] as item}
        <div class="bg-sport-light rounded-2xl p-6 border border-sport-gray-100">
          <div class="text-3xl mb-3">{item.icon}</div>
          <h3 class="font-sport-heading font-bold text-sport-dark mb-2">{item.title}</h3>
          <p class="text-sport-gray-500 text-sm leading-relaxed">{item.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Programs -->
<section id="programs" class="py-24 bg-sport-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <span class="text-sport-red text-sm font-sport-heading font-semibold uppercase tracking-wider">Programs</span>
      <h2 class="text-3xl sm:text-4xl font-sport-heading font-black text-sport-dark mt-3">Player Development Programs</h2>
    </div>

    <div class="space-y-8">
      <!-- Development Camps -->
      <div id="development" class="bg-white rounded-3xl p-8 lg:p-10 border border-sport-gray-100">
        <div class="flex flex-col lg:flex-row lg:items-start gap-8">
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-4">
              <span class="px-3 py-1 bg-sport-red/10 text-sport-red text-xs font-sport-heading font-semibold rounded-full uppercase">Flagship</span>
              <span class="px-3 py-1 bg-sport-red/10 text-sport-red text-xs font-sport-heading font-semibold rounded-full">Ages U14 — U21</span>
            </div>
            <h3 class="text-2xl font-sport-heading font-bold text-sport-dark mb-3">Elite Development Camps</h3>
            <p class="text-sport-gray-500 leading-relaxed mb-6">
              Intensive training programs designed to elevate your game to the next level. Work with professional coaches
              using Portuguese and Spanish methodologies. Technical skills, tactical understanding, physical development,
              and mental performance — all covered in an immersive camp environment.
            </p>
            <div class="grid sm:grid-cols-2 gap-4 mb-6">
              {#each [
                'Daily double sessions with UEFA Pro coaches',
                'Video analysis of your individual performance',
                'Physical testing and development program',
                'Tactical workshops and game understanding',
                'Competitive matches against local academy teams',
                'Individual development report upon completion',
                'Scout exposure opportunities',
                'Accommodation and meals included',
              ] as feature}
                <div class="flex items-start gap-2 text-sm text-sport-gray-600">
                  <svg class="w-4 h-4 text-sport-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  {feature}
                </div>
              {/each}
            </div>
            <div class="flex flex-wrap gap-4 items-center">
              <div class="text-sm text-sport-gray-400">
                <span class="font-sport-heading font-semibold text-sport-dark">Duration:</span> 1-4 weeks
              </div>
              <div class="text-sm text-sport-gray-400">
                <span class="font-sport-heading font-semibold text-sport-dark">Locations:</span> Lisbon, Algarve, Porto
              </div>
              <div class="text-sm text-sport-gray-400">
                <span class="font-sport-heading font-semibold text-sport-dark">When:</span> Year-round (Summer intensives June-Aug)
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pro Trials -->
      <div id="trials" class="bg-white rounded-3xl p-8 lg:p-10 border border-sport-gray-100">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-sport-gold/20 text-sport-gold text-xs font-sport-heading font-semibold rounded-full uppercase">Premium</span>
            <span class="px-3 py-1 bg-sport-red/10 text-sport-red text-xs font-sport-heading font-semibold rounded-full">Ages U16 — Senior</span>
          </div>
          <h3 class="text-2xl font-sport-heading font-bold text-sport-dark mb-3">Professional Club Trials</h3>
          <p class="text-sport-gray-500 leading-relaxed mb-6">
            Leveraging our deep network of club connections across Portugal and Spain, we arrange
            professional trial opportunities for qualified players. You train with club squads, play in
            official matches, and get assessed by professional coaching staff and scouts.
          </p>
          <div class="grid sm:grid-cols-2 gap-4 mb-6">
            {#each [
              'Trial placement at Liga Portugal or Liga Spain clubs',
              'Pre-trial assessment and preparation camp',
              'Training with professional club squads',
              'Participation in official reserve/youth matches',
              'Professional scouting report',
              'Agent and representation guidance',
              'Contract negotiation support if signed',
              'Follow-up placement if first trial unsuccessful',
            ] as feature}
              <div class="flex items-start gap-2 text-sm text-sport-gray-600">
                <svg class="w-4 h-4 text-sport-gold shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                {feature}
              </div>
            {/each}
          </div>
          <div class="flex flex-wrap gap-4 items-center">
            <div class="text-sm text-sport-gray-400">
              <span class="font-sport-heading font-semibold text-sport-dark">Duration:</span> 1-2 weeks per trial
            </div>
            <div class="text-sm text-sport-gray-400">
              <span class="font-sport-heading font-semibold text-sport-dark">Locations:</span> Portugal & Spain (various clubs)
            </div>
            <div class="text-sm text-sport-gray-400">
              <span class="font-sport-heading font-semibold text-sport-dark">Application:</span> Video + CV required
            </div>
          </div>
        </div>
      </div>

      <!-- International Player Pathway -->
      <div id="international" class="bg-white rounded-3xl p-8 lg:p-10 border border-sport-gray-100">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-sport-gray-800/10 text-sport-gray-700 text-xs font-sport-heading font-semibold rounded-full uppercase">International</span>
            <span class="px-3 py-1 bg-sport-red/10 text-sport-red text-xs font-sport-heading font-semibold rounded-full">Ages U16 — U23</span>
          </div>
          <h3 class="text-2xl font-sport-heading font-bold text-sport-dark mb-3">International Player Pathway</h3>
          <p class="text-sport-gray-500 leading-relaxed mb-6">
            A comprehensive program for international players looking to establish themselves in European football.
            Designed for players from Africa, South America, Asia, and North America who want to use Portugal
            and Spain as their gateway into the European game.
          </p>
          <div class="grid sm:grid-cols-2 gap-4 mb-6">
            {#each [
              'Visa and work permit guidance',
              'Integration into local club training',
              'Language and cultural support',
              'Accommodation arrangement',
              'Multiple club trial opportunities',
              'Ongoing development monitoring',
              'Liaison with player\'s home federation',
              'Long-term career pathway planning',
            ] as feature}
              <div class="flex items-start gap-2 text-sm text-sport-gray-600">
                <svg class="w-4 h-4 text-sport-gray-700 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                {feature}
              </div>
            {/each}
          </div>
          <div class="flex flex-wrap gap-4 items-center">
            <div class="text-sm text-sport-gray-400">
              <span class="font-sport-heading font-semibold text-sport-dark">Duration:</span> 1-6 months
            </div>
            <div class="text-sm text-sport-gray-400">
              <span class="font-sport-heading font-semibold text-sport-dark">Locations:</span> Lisbon, Porto, Algarve + Spain
            </div>
            <div class="text-sm text-sport-gray-400">
              <span class="font-sport-heading font-semibold text-sport-dark">Start:</span> Rolling intake
            </div>
          </div>
        </div>
      </div>

      <!-- Summer Intensive -->
      <div class="bg-white rounded-3xl p-8 lg:p-10 border border-sport-gray-100">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-4">
            <span class="px-3 py-1 bg-sport-red/10 text-sport-red text-xs font-sport-heading font-semibold rounded-full uppercase">Seasonal</span>
            <span class="px-3 py-1 bg-sport-red/10 text-sport-red text-xs font-sport-heading font-semibold rounded-full">Ages U14 — U19</span>
          </div>
          <h3 class="text-2xl font-sport-heading font-bold text-sport-dark mb-3">Summer & Easter Intensives</h3>
          <p class="text-sport-gray-500 leading-relaxed mb-6">
            Intensive short-term programs during school holidays. Combine high-level football training with
            the experience of living and training in Portugal or Spain. Ideal for players who want
            a taste of Iberian football culture and methodology without a long-term commitment.
          </p>
          <div class="grid sm:grid-cols-2 gap-4 mb-6">
            {#each [
              '2x daily training sessions',
              'Matches against local academy teams',
              'Beach and futsal cross-training',
              'Cultural excursions and team building',
              'Full board accommodation',
              'Airport transfers included',
              'Highlight video package',
              'Best performer awards and scout referrals',
            ] as feature}
              <div class="flex items-start gap-2 text-sm text-sport-gray-600">
                <svg class="w-4 h-4 text-sport-red shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                {feature}
              </div>
            {/each}
          </div>
          <div class="flex flex-wrap gap-4 items-center">
            <div class="text-sm text-sport-gray-400">
              <span class="font-sport-heading font-semibold text-sport-dark">Summer:</span> June — August 2026
            </div>
            <div class="text-sm text-sport-gray-400">
              <span class="font-sport-heading font-semibold text-sport-dark">Easter:</span> April 2026
            </div>
            <div class="text-sm text-sport-gray-400">
              <span class="font-sport-heading font-semibold text-sport-dark">Duration:</span> 1-2 weeks
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- How It Works -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <span class="text-sport-red text-sm font-sport-heading font-semibold uppercase tracking-wider">Process</span>
      <h2 class="text-3xl sm:text-4xl font-sport-heading font-black text-sport-dark mt-3">How It Works</h2>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each [
        { step: '01', title: 'Apply', desc: 'Submit your application with playing history, video highlights, and the program you\'re interested in.' },
        { step: '02', title: 'Assessment', desc: 'Our team reviews your profile and matches you with the right program, level, and location.' },
        { step: '03', title: 'Train', desc: 'Arrive in Portugal or Spain and begin your program. Full support from day one — transfers, accommodation, coaching.' },
        { step: '04', title: 'Progress', desc: 'Receive your development report, scout feedback, and next-step recommendations. Trial placements for top performers.' },
      ] as step}
        <div class="text-center">
          <div class="w-14 h-14 bg-sport-red/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span class="text-sport-red font-sport-heading font-black text-lg">{step.step}</span>
          </div>
          <h3 class="font-sport-heading font-bold text-sport-dark mb-2">{step.title}</h3>
          <p class="text-sport-gray-500 text-sm leading-relaxed">{step.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- FAQ -->
<section class="py-24 bg-sport-light">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl font-sport-heading font-black text-sport-dark">Frequently Asked Questions</h2>
    </div>

    <div class="space-y-4">
      {#each [
        { q: 'What age groups do you accept?', a: 'Our programs cater to players from U14 to senior level. Each program has specific age requirements listed above. We assess players individually to ensure the right fit.' },
        { q: 'Do I need to speak Portuguese or Spanish?', a: 'No. All programs are delivered in English. Our coaching staff is multilingual and we provide language support for international players on longer programs.' },
        { q: 'What level do I need to be?', a: 'We accept players at competitive club level and above. For trial programs, we require a higher standard — typically academy or semi-professional level. Submit your video and we\'ll assess your suitability.' },
        { q: 'Is accommodation included?', a: 'Yes, all residential programs include full board accommodation, meals, and local transport. Airport transfers are included for international players.' },
        { q: 'What happens if I\'m not selected for a trial?', a: 'Not every player is trial-ready immediately. We provide a detailed development report and recommend a development camp to work on identified areas. Many players return for trials after a development phase.' },
        { q: 'Can parents/guardians accompany younger players?', a: 'For U16 and under, we have dedicated welfare staff. Parents are welcome to accompany players and we can assist with nearby accommodation arrangements.' },
        { q: 'Which clubs do you have trial connections with?', a: 'We work with clubs across Liga Portugal (1st, 2nd, and 3rd divisions) and Spanish leagues. Specific club placements depend on your profile, position, and level. We don\'t publicize all partner clubs to protect our relationships.' },
      ] as faq}
        <div class="bg-white rounded-2xl p-6 border border-sport-gray-100">
          <h3 class="font-sport-heading font-bold text-sport-dark mb-2">{faq.q}</h3>
          <p class="text-sport-gray-500 text-sm leading-relaxed">{faq.a}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-24 bg-gradient-to-br from-sport-red to-sport-dark">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl sm:text-4xl font-sport-heading font-black text-white mb-6">
      Ready to Take the Next Step?
    </h2>
    <p class="text-lg text-sport-gray-300 mb-10 max-w-2xl mx-auto">
      Whether you're looking for a development camp, a professional trial, or a long-term pathway
      into European football — we're here to help you get there.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/contact" class="px-8 py-4 bg-sport-red hover:bg-white hover:text-sport-dark text-white font-sport-heading font-bold rounded-xl transition-colors text-lg">
        Apply Now
      </a>
      <a href="mailto:geral@sportrail.pt" class="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-sport-heading font-bold rounded-xl transition-colors text-lg border border-white/20">
        Email Us Directly
      </a>
    </div>
  </div>
</section>
