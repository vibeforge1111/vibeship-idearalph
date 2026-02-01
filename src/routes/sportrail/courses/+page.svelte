<svelte:head>
  <title>Courses & Masterclasses | Sportrail Football</title>
  <meta name="description" content="DGERT & IPDJ certified football coaching courses. Sports Director, Scouting, Match Analysis, Goalkeeper Training, S&C and more. Enroll now." />
</svelte:head>

<!-- Hero -->
<section class="bg-sport-dark py-20 lg:py-28">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl">
      <span class="text-sport-accent text-sm font-sport-heading font-semibold uppercase tracking-wider">Education</span>
      <h1 class="text-4xl sm:text-5xl font-sport-heading font-black text-white mt-3 mb-6">
        Courses & Masterclasses
      </h1>
      <p class="text-lg text-sport-gray-300 font-sport-body leading-relaxed">
        All programs are certified by DGERT and accredited by IPDJ. Earn credit units toward
        your coaching license renewal while learning from the best in the game.
      </p>
    </div>
  </div>
</section>

<!-- Credit Info -->
<section class="py-8 bg-sport-accent/10 border-b border-sport-accent/20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-wrap items-center justify-center gap-6 text-sm font-sport-body">
      <div class="flex items-center gap-2">
        <span class="font-semibold text-sport-primary">In-person:</span>
        <span class="text-sport-gray-600">0.2 UC per hour</span>
      </div>
      <div class="w-px h-4 bg-sport-gray-300"></div>
      <div class="flex items-center gap-2">
        <span class="font-semibold text-sport-primary">Online:</span>
        <span class="text-sport-gray-600">0.1 UC per hour</span>
      </div>
      <div class="w-px h-4 bg-sport-gray-300"></div>
      <div class="flex items-center gap-2">
        <span class="font-semibold text-sport-primary">Payment:</span>
        <span class="text-sport-gray-600">3 interest-free installments available</span>
      </div>
    </div>
  </div>
</section>

<!-- Flagship Programs -->
<section id="certification" class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl font-sport-heading font-black text-sport-dark mb-8">Flagship Programs</h2>

    <div class="grid md:grid-cols-2 gap-8">
      {#each [
        {
          title: 'Sports Director Course in Football',
          edition: '4th Edition',
          price: 250,
          original: 400,
          description: 'Comprehensive program covering football club management, recruitment strategy, academy structure, and sporting direction. Designed for coaches transitioning to leadership roles or professionals seeking to enter football management.',
          topics: ['Club Management & Governance', 'Recruitment & Transfer Strategy', 'Academy Development Models', 'Financial Planning in Football', 'Communication & Media Relations', 'Legal Framework in Sport'],
          format: 'Online + In-person sessions',
          featured: true,
        },
        {
          title: 'Scouting Course in Youth Football',
          edition: '2nd Edition',
          price: 150,
          original: 225,
          description: 'Professional scouting education covering talent identification, player assessment frameworks, report writing, and building scouting networks. Learn from scouts working at top European clubs.',
          topics: ['Talent Identification Models', 'Player Assessment Criteria', 'Scouting Report Writing', 'Video Analysis for Scouting', 'Building Scouting Networks', 'Youth Development Pathways'],
          format: 'Online + In-person sessions',
          featured: true,
        },
      ] as course}
        <div class="bg-gradient-to-br from-sport-primary to-sport-secondary rounded-2xl overflow-hidden {course.featured ? 'ring-2 ring-sport-gold' : ''}">
          <div class="p-8">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sport-gold text-xs font-sport-heading font-semibold uppercase tracking-wider">{course.edition}</span>
              {#if course.featured}
                <span class="px-3 py-1 bg-sport-gold/20 text-sport-gold text-xs font-sport-heading font-bold rounded-full">FLAGSHIP</span>
              {/if}
            </div>
            <h3 class="text-2xl font-sport-heading font-bold text-white mb-3">{course.title}</h3>
            <p class="text-sport-gray-300 font-sport-body text-sm leading-relaxed mb-6">{course.description}</p>

            <div class="mb-6">
              <h4 class="text-white font-sport-heading font-semibold text-sm mb-3">What You'll Learn:</h4>
              <div class="grid grid-cols-2 gap-2">
                {#each course.topics as topic}
                  <div class="flex items-center gap-2 text-sport-gray-300 text-sm">
                    <span class="w-1.5 h-1.5 bg-sport-accent rounded-full shrink-0"></span>
                    <span>{topic}</span>
                  </div>
                {/each}
              </div>
            </div>

            <div class="flex items-center justify-between pt-6 border-t border-white/10">
              <div>
                <div class="flex items-baseline gap-2">
                  <span class="text-3xl font-sport-heading font-black text-white">€{course.price}</span>
                  <span class="text-sport-gray-400 line-through text-sm">€{course.original}</span>
                </div>
                <span class="text-sport-gray-400 text-xs">{course.format}</span>
              </div>
              <a href="/sportrail/contact" class="px-6 py-3 bg-sport-accent hover:bg-white hover:text-sport-primary text-white font-sport-heading font-semibold rounded-xl transition-colors">
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Masterclasses -->
<section id="masterclasses" class="py-24 bg-sport-light">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-2xl font-sport-heading font-black text-sport-dark mb-2">Specialization Masterclasses</h2>
    <p class="text-sport-gray-500 font-sport-body mb-8">Focused, intensive programs on specific coaching domains.</p>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each [
        {
          title: 'Match Analysis',
          price: 60,
          original: 90,
          icon: '📊',
          description: 'Professional match analysis techniques. Video breakdown, tactical pattern recognition, and data-driven insights.',
        },
        {
          title: 'Elite Training Methods',
          price: 60,
          original: 90,
          icon: '🏋️',
          description: 'Advanced training methodologies from top-level coaching staffs. Session design, periodization, and player development.',
        },
        {
          title: 'Football Training',
          price: 150,
          original: 250,
          icon: '⚽',
          description: 'Comprehensive football training course. Game models, training principles, and practical exercise design.',
        },
        {
          title: 'Goalkeeper Training',
          price: 60,
          original: 90,
          icon: '🧤',
          description: 'Specialized goalkeeper coaching. Technical development, decision making, distribution, and modern GK role.',
        },
        {
          title: 'Training & Match Practical Issues',
          price: 90,
          original: 120,
          icon: '📋',
          description: 'Real-world coaching challenges. Match-day preparation, half-time adjustments, and in-game management.',
        },
        {
          title: 'Strength & Conditioning',
          price: 60,
          original: 90,
          icon: '💪',
          description: 'Football-specific S&C. Physical preparation, injury prevention, load management, and performance optimization.',
        },
      ] as mc}
        <div class="bg-white rounded-2xl p-6 border border-sport-gray-100 hover:border-sport-accent/30 hover:shadow-lg transition-all">
          <div class="text-3xl mb-3">{mc.icon}</div>
          <h3 class="font-sport-heading font-bold text-sport-dark text-lg mb-2">{mc.title}</h3>
          <p class="text-sport-gray-500 font-sport-body text-sm leading-relaxed mb-4">{mc.description}</p>
          <div class="flex items-center justify-between pt-4 border-t border-sport-gray-100">
            <div class="flex items-baseline gap-2">
              <span class="text-2xl font-sport-heading font-black text-sport-primary">€{mc.price}</span>
              <span class="text-sm text-sport-gray-400 line-through">€{mc.original}</span>
            </div>
            <a href="/sportrail/contact" class="text-sm font-sport-heading font-semibold text-sport-accent hover:text-sport-primary transition-colors">
              Enroll →
            </a>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- E-Learning -->
<section class="py-24 bg-white">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <span class="text-sport-accent text-sm font-sport-heading font-semibold uppercase tracking-wider">Online Learning</span>
    <h2 class="text-3xl font-sport-heading font-black text-sport-dark mt-3 mb-4">E-Learning Academy</h2>
    <p class="text-sport-gray-500 font-sport-body leading-relaxed mb-8 max-w-2xl mx-auto">
      Access our growing library of courses from anywhere in the world through our dedicated
      e-learning platform. Study at your own pace with the same quality education and
      IPDJ credit units.
    </p>
    <a href="https://academy.sportrail.pt" target="_blank" rel="noopener"
      class="inline-flex px-8 py-4 bg-sport-primary hover:bg-sport-secondary text-white font-sport-heading font-semibold rounded-xl transition-colors">
      Visit Academy Platform →
    </a>
  </div>
</section>
