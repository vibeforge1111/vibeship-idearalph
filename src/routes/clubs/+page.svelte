<svelte:head>
  <title>For Clubs & Organizations | Sportrail Football</title>
  <meta name="description" content="Custom training programs for football clubs. Staff development, consulting, and tailored education solutions from Sportrail." />
</svelte:head>

<!-- Hero -->
<section class="bg-sport-dark py-20 lg:py-28">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl">
      <span class="text-sport-gold text-sm font-sport-heading font-semibold uppercase tracking-wider">B2B Solutions</span>
      <h1 class="text-4xl sm:text-5xl font-sport-heading font-black text-white mt-3 mb-6">
        Elevate Your Club's Coaching Staff
      </h1>
      <p class="text-lg text-sport-gray-300 font-sport-body leading-relaxed">
        We create customized training programs tailored to your club's specific needs.
        From academy staff development to first-team coaching enhancement — delivered
        by our network of 70+ elite professionals.
      </p>
    </div>
  </div>
</section>

<!-- Services -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-sport-heading font-black text-sport-dark mb-12">What We Offer Clubs</h2>

    <div class="grid md:grid-cols-2 gap-8">
      {#each [
        {
          title: 'Custom Staff Training',
          icon: '🎯',
          description: 'Bespoke education programs designed around your club\'s game model, philosophy, and development needs. Delivered on-site or online.',
          features: ['Needs assessment & program design', 'On-site delivery at your facilities', 'Ongoing evaluation & follow-up', 'DGERT certified — counts for license renewal'],
        },
        {
          title: 'Academy Development Consulting',
          icon: '🏟️',
          description: 'Strategic consulting for youth academy setup, restructuring, or enhancement. Based on best practices from top Portuguese academies.',
          features: ['Academy structure & curriculum design', 'Coach recruitment & development planning', 'Player pathway optimization', 'Benchmarking against elite academies'],
        },
        {
          title: 'Coaching Staff Assessment',
          icon: '📊',
          description: 'Professional evaluation of your coaching staff\'s competencies with actionable development recommendations.',
          features: ['Individual coach profiling', 'Gap analysis & development plans', 'Mentoring program setup', 'Performance tracking metrics'],
        },
        {
          title: 'Conference & Workshop Hosting',
          icon: '🎤',
          description: 'Bring our conference-quality speakers and content directly to your organization for private events and workshops.',
          features: ['Custom speaker selection from 70+ faculty', 'Full event planning & logistics', 'Interactive workshop formats', 'Certificate of completion for attendees'],
        },
      ] as service}
        <div class="bg-sport-light rounded-2xl p-8 border border-sport-gray-100">
          <div class="text-3xl mb-4">{service.icon}</div>
          <h3 class="text-xl font-sport-heading font-bold text-sport-dark mb-3">{service.title}</h3>
          <p class="text-sport-gray-500 font-sport-body text-sm leading-relaxed mb-4">{service.description}</p>
          <ul class="space-y-2">
            {#each service.features as feature}
              <li class="flex items-center gap-2 text-sm text-sport-gray-600">
                <svg class="w-4 h-4 text-sport-red shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                {feature}
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Partners -->
<section id="consulting" class="py-24 bg-sport-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-sport-heading font-black text-sport-dark mb-4">Clubs That Trust Us</h2>
      <p class="text-sport-gray-500 font-sport-body">We've delivered programs for clubs across Portugal and Europe.</p>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {#each [
        'SL Benfica', 'Sporting Clube de Braga', 'Casa Pia AC', 'SC Farense',
        'Rio Ave FC', 'Estoril Praia', 'Sevilla FC', 'FC London',
      ] as club}
        <div class="bg-white rounded-xl p-5 flex items-center justify-center h-20 border border-sport-gray-100">
          <span class="text-sm font-sport-heading font-semibold text-sport-gray-700 text-center">{club}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-24 bg-sport-red">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl font-sport-heading font-black text-white mb-4">Let's Build Your Program</h2>
    <p class="text-sport-gray-300 font-sport-body mb-8 max-w-2xl mx-auto">
      Tell us about your club's needs and we'll design a custom training solution.
      No obligation — we start with a free consultation.
    </p>
    <a href="/contact" class="inline-flex px-8 py-4 bg-sport-red hover:bg-sport-gold text-white font-sport-heading font-bold rounded-xl transition-colors">
      Request a Consultation
    </a>
  </div>
</section>
