<svelte:head>
  <title>Sportrail Football - Premier Coaching Education in Portugal</title>
  <meta name="description" content="Portugal's leading football coaching education institution. DGERT & IPDJ certified. 2,500+ coaches trained since 2016. Courses, masterclasses, and conferences." />
  <meta property="og:title" content="Sportrail Football - Premier Coaching Education" />
  <meta property="og:description" content="Elevate your coaching career with Portugal's top football education institution. World-class faculty, certified programs." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://sportrailfootball.com" />
</svelte:head>

<!-- Hero -->
<section class="relative bg-sport-dark overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-sport-primary/90 via-sport-dark to-sport-dark"></div>
  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-20 left-10 w-72 h-72 bg-sport-accent rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-sport-gold rounded-full blur-3xl"></div>
  </div>

  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
    <div class="max-w-3xl">
      <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-sport-accent/20 border border-sport-accent/30 rounded-full mb-6">
        <div class="w-2 h-2 bg-sport-accent rounded-full animate-pulse"></div>
        <span class="text-sport-accent text-sm font-sport-body font-medium">DGERT & IPDJ Certified</span>
      </div>

      <h1 class="text-4xl sm:text-5xl lg:text-6xl font-sport-heading font-black text-white leading-tight mb-6">
        Where Portugal's
        <span class="text-sport-accent">Elite Coaches</span>
        Are Made
      </h1>

      <p class="text-lg sm:text-xl text-sport-gray-300 font-sport-body leading-relaxed mb-8 max-w-2xl">
        The football coaching education institution trusted by 2,500+ coaches worldwide.
        Learn from UEFA Pro licensed coaches, sporting directors, and top professionals
        who shape the future of the game.
      </p>

      <div class="flex flex-wrap gap-4">
        <a href="/sportrail/courses" class="px-8 py-4 bg-sport-accent hover:bg-sport-secondary text-white font-sport-heading font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-sport-accent/20">
          Explore Courses
        </a>
        <a href="/sportrail/about" class="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-sport-heading font-semibold rounded-xl transition-all border border-white/20">
          Our Story
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Stats -->
<section class="relative -mt-12 z-10">
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {#each [
        { value: '2,500+', label: 'Coaches Trained', sub: 'Since 2016' },
        { value: '70+', label: 'Expert Faculty', sub: 'International roster' },
        { value: '10+', label: 'Partner Clubs', sub: 'Including SL Benfica' },
        { value: '8+', label: 'Years', sub: 'Of excellence' },
      ] as stat}
        <div class="bg-white rounded-2xl p-6 shadow-lg shadow-sport-primary/5 border border-sport-gray-100 text-center">
          <div class="text-3xl lg:text-4xl font-sport-heading font-black text-sport-primary">{stat.value}</div>
          <div class="text-sm font-sport-body font-semibold text-sport-gray-700 mt-1">{stat.label}</div>
          <div class="text-xs text-sport-gray-400 mt-0.5">{stat.sub}</div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Why Sportrail -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl sm:text-4xl font-sport-heading font-black text-sport-dark mb-4">
        Why Coaches Choose Sportrail
      </h2>
      <p class="text-sport-gray-500 font-sport-body max-w-2xl mx-auto">
        We don't just teach theory. We connect you with the coaches and professionals
        who are shaping football at the highest level.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      {#each [
        {
          icon: '🎓',
          title: 'Certified Education',
          description: 'DGERT and IPDJ accredited programs that count toward your coaching license renewal. Earn credit units with every course.'
        },
        {
          icon: '🌍',
          title: 'World-Class Network',
          description: 'Learn from coaches at Sporting CP, SL Benfica, Casa Pia AC, Sevilla FC, and professionals from across Europe and beyond.'
        },
        {
          icon: '⚽',
          title: 'Practical Excellence',
          description: 'From tactical periodization to scouting, match analysis to goalkeeper training — specialized knowledge that transforms your coaching.'
        },
      ] as feature}
        <div class="bg-sport-light rounded-2xl p-8 border border-sport-gray-100 hover:border-sport-accent/30 transition-colors">
          <div class="text-4xl mb-4">{feature.icon}</div>
          <h3 class="text-xl font-sport-heading font-bold text-sport-dark mb-3">{feature.title}</h3>
          <p class="text-sport-gray-500 font-sport-body leading-relaxed">{feature.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Featured Courses -->
<section class="py-24 bg-sport-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-wrap items-end justify-between gap-4 mb-12">
      <div>
        <h2 class="text-3xl sm:text-4xl font-sport-heading font-black text-sport-dark mb-2">Featured Programs</h2>
        <p class="text-sport-gray-500 font-sport-body">Advance your career with our most popular courses.</p>
      </div>
      <a href="/sportrail/courses" class="text-sport-accent hover:text-sport-primary font-sport-heading font-semibold transition-colors">
        View All Courses →
      </a>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each [
        {
          title: 'Sports Director Course in Football',
          edition: '4th Edition',
          price: '€250',
          original: '€400',
          tags: ['Leadership', 'Management'],
          description: 'Master the art of football club management. From recruitment strategy to academy development.'
        },
        {
          title: 'Scouting Course in Youth Football',
          edition: '2nd Edition',
          price: '€150',
          original: '€225',
          tags: ['Scouting', 'Youth'],
          description: 'Develop professional scouting skills. Identify talent, create reports, and build scouting networks.'
        },
        {
          title: 'Match Analysis Masterclass',
          edition: 'Specialization',
          price: '€60',
          original: '€90',
          tags: ['Tactical', 'Analysis'],
          description: 'Learn professional match analysis techniques used by top-level coaching staffs across Europe.'
        },
        {
          title: 'Elite Training Specialization',
          edition: 'Masterclass',
          price: '€60',
          original: '€90',
          tags: ['Training', 'Methodology'],
          description: 'Advanced training methodologies from coaches working at the highest level of professional football.'
        },
        {
          title: 'Goalkeeper Training Masterclass',
          edition: 'Specialization',
          price: '€60',
          original: '€90',
          tags: ['Goalkeeper', 'Specialist'],
          description: 'Specialized goalkeeper coaching techniques from elite GK coaches across Portuguese and international football.'
        },
        {
          title: 'Strength & Conditioning Masterclass',
          edition: 'Performance',
          price: '€60',
          original: '€90',
          tags: ['S&C', 'Performance'],
          description: 'Football-specific strength and conditioning methods from leading sports scientists and performance coaches.'
        },
      ] as course}
        <div class="bg-white rounded-2xl overflow-hidden border border-sport-gray-100 hover:border-sport-accent/30 hover:shadow-lg transition-all group">
          <div class="bg-gradient-to-br from-sport-primary to-sport-secondary p-6">
            <span class="text-sport-accent/80 text-xs font-sport-heading font-semibold uppercase tracking-wider">{course.edition}</span>
            <h3 class="text-white font-sport-heading font-bold text-lg mt-1 group-hover:text-sport-gold transition-colors">{course.title}</h3>
          </div>
          <div class="p-6">
            <p class="text-sport-gray-500 text-sm leading-relaxed mb-4">{course.description}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              {#each course.tags as tag}
                <span class="px-2.5 py-0.5 bg-sport-accent/10 text-sport-accent text-xs font-medium rounded-full">{tag}</span>
              {/each}
            </div>
            <div class="flex items-center justify-between pt-4 border-t border-sport-gray-100">
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-sport-heading font-black text-sport-primary">{course.price}</span>
                <span class="text-sm text-sport-gray-400 line-through">{course.original}</span>
              </div>
              <a href="/sportrail/courses" class="text-sm font-sport-heading font-semibold text-sport-accent hover:text-sport-primary transition-colors">
                Learn More →
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Partners -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-sport-heading font-black text-sport-dark mb-4">Trusted Partners</h2>
      <p class="text-sport-gray-500 font-sport-body">We collaborate with leading clubs, federations, and organizations.</p>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
      {#each [
        'SL Benfica',
        'Sporting Clube de Braga',
        'Casa Pia AC',
        'SC Farense',
        'Rio Ave FC',
        'Swedish FA',
        'Sevilla FC',
        'FC London',
        'IPDJ',
        'ThermoHuman',
        'BuildUp Sports',
        'Municipio de Loule',
      ] as partner}
        <div class="bg-sport-light rounded-xl p-4 flex items-center justify-center h-20 border border-sport-gray-100 hover:border-sport-accent/30 transition-colors">
          <span class="text-sm font-sport-heading font-semibold text-sport-gray-600 text-center">{partner}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Conferences -->
<section class="py-24 bg-sport-dark">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <span class="text-sport-gold text-sm font-sport-heading font-semibold uppercase tracking-wider">Events</span>
        <h2 class="text-3xl sm:text-4xl font-sport-heading font-black text-white mt-2 mb-6">
          International Conferences
        </h2>
        <p class="text-sport-gray-300 font-sport-body leading-relaxed mb-6">
          Sportrail organizes major international conferences bringing together the world's top football minds.
          Our events are where knowledge meets networking at the highest level.
        </p>
        <div class="space-y-4 mb-8">
          {#each [
            { name: 'Football Science Conference', desc: 'Research, sports science, and performance innovation' },
            { name: 'International Scouting Conference', desc: 'The present and future of talent identification' },
          ] as conf}
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 bg-sport-accent rounded-full mt-2 shrink-0"></div>
              <div>
                <div class="text-white font-sport-heading font-semibold">{conf.name}</div>
                <div class="text-sport-gray-400 text-sm">{conf.desc}</div>
              </div>
            </div>
          {/each}
        </div>
        <a href="/sportrail/conferences" class="inline-flex px-6 py-3 bg-sport-accent hover:bg-sport-secondary text-white font-sport-heading font-semibold rounded-xl transition-colors">
          View Upcoming Events
        </a>
      </div>

      <div class="bg-gradient-to-br from-sport-primary to-sport-secondary rounded-2xl p-10 text-center">
        <div class="text-6xl font-sport-heading font-black text-white/20 mb-4">2026</div>
        <h3 class="text-2xl font-sport-heading font-bold text-white mb-3">Season Opening Soon</h3>
        <p class="text-sport-gray-300 font-sport-body mb-6">Join coaches from around the world at our upcoming events. Early registration available.</p>
        <a href="/sportrail/contact" class="inline-flex px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-sport-heading font-semibold rounded-xl border border-white/20 transition-colors">
          Get Notified
        </a>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="py-24 bg-gradient-to-br from-sport-primary via-sport-secondary to-sport-accent">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-3xl sm:text-4xl lg:text-5xl font-sport-heading font-black text-white mb-6">
      Ready to Elevate Your Coaching?
    </h2>
    <p class="text-lg text-white/80 font-sport-body mb-8 max-w-2xl mx-auto">
      Join 2,500+ coaches who have advanced their careers with Sportrail.
      Certified education, world-class faculty, real connections.
    </p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="/sportrail/courses" class="px-8 py-4 bg-white text-sport-primary font-sport-heading font-bold rounded-xl hover:bg-sport-gold hover:text-sport-dark transition-all shadow-lg">
        Browse Courses
      </a>
      <a href="/sportrail/contact" class="px-8 py-4 bg-white/10 text-white font-sport-heading font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all">
        Contact Us
      </a>
    </div>
  </div>
</section>
