<svelte:head>
  <title>Insights & Articles | Sportrail Football</title>
  <meta name="description" content="Football coaching insights, tactical analysis, scouting methodologies, and sports science articles from Sportrail's expert faculty." />
</svelte:head>

<!-- Hero -->
<section class="bg-sport-dark py-20 lg:py-28">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl">
      <span class="text-sport-accent text-sm font-sport-heading font-semibold uppercase tracking-wider">Knowledge Hub</span>
      <h1 class="text-4xl sm:text-5xl font-sport-heading font-black text-white mt-3 mb-6">
        Insights & Articles
      </h1>
      <p class="text-lg text-sport-gray-300 font-sport-body leading-relaxed">
        Expert knowledge from our faculty. Tactical analysis, coaching methodology,
        scouting insights, and sports science — all in one place.
      </p>
    </div>
  </div>
</section>

<!-- Content Categories -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Featured / Topics -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {#each [
        { title: 'Coaching Methodology', icon: '📋', count: 'Tactical periodization, game models, training design', color: 'sport-primary' },
        { title: 'Scouting & Recruitment', icon: '🔍', count: 'Talent identification, reports, network building', color: 'sport-accent' },
        { title: 'Match Analysis', icon: '📊', count: 'Tactical patterns, video analysis, data insights', color: 'sport-secondary' },
        { title: 'Sports Science', icon: '🔬', count: 'Performance, S&C, injury prevention, load management', color: 'sport-gold' },
        { title: 'Youth Development', icon: '🌱', count: 'Academy pathways, player development, age-group coaching', color: 'sport-primary' },
        { title: 'Football Management', icon: '🏢', count: 'Club structure, sporting direction, business of football', color: 'sport-accent' },
      ] as category}
        <div class="bg-sport-light rounded-2xl p-6 border border-sport-gray-100 hover:border-sport-accent/30 transition-colors cursor-pointer">
          <div class="text-3xl mb-3">{category.icon}</div>
          <h3 class="font-sport-heading font-bold text-sport-dark text-lg mb-1">{category.title}</h3>
          <p class="text-sport-gray-500 text-sm">{category.count}</p>
        </div>
      {/each}
    </div>

    <!-- Sample Articles -->
    <h2 class="text-2xl font-sport-heading font-black text-sport-dark mb-8">Latest Articles</h2>

    <div class="space-y-6">
      {#each [
        {
          title: 'Why Portugal Produces the World\'s Best Football Coaches',
          excerpt: 'From Mourinho to Amorim, from Conceicao to Abel Ferreira — an analysis of the Portuguese coaching education system and culture that continues to shape global football.',
          category: 'Coaching Methodology',
          readTime: '8 min read',
        },
        {
          title: 'The Evolution of Scouting in Youth Football',
          excerpt: 'How data analytics and traditional scouting eye are merging to create a new generation of talent identifiers. Insights from our International Scouting Conference.',
          category: 'Scouting & Recruitment',
          readTime: '6 min read',
        },
        {
          title: 'Tactical Periodization: Beyond the Buzzword',
          excerpt: 'A practical breakdown of how top Portuguese coaches implement tactical periodization in their weekly training cycles. With real examples from Liga Portugal.',
          category: 'Coaching Methodology',
          readTime: '10 min read',
        },
        {
          title: 'Building an Academy Scouting Network from Scratch',
          excerpt: 'Step-by-step guide to establishing a youth scouting operation. Frameworks, report templates, and network development strategies from senior scouts.',
          category: 'Scouting & Recruitment',
          readTime: '7 min read',
        },
        {
          title: 'The Role of the Modern Sporting Director',
          excerpt: 'What does a sporting director actually do? Career pathways, daily responsibilities, and the skills needed. With insights from our Sports Director Course faculty.',
          category: 'Football Management',
          readTime: '9 min read',
        },
        {
          title: 'Load Management in Youth Football: What Science Tells Us',
          excerpt: 'Evidence-based approaches to managing training load in developing players. When to push, when to rest, and how to monitor effectively.',
          category: 'Sports Science',
          readTime: '6 min read',
        },
      ] as article}
        <article class="bg-sport-light rounded-2xl p-6 lg:p-8 border border-sport-gray-100 hover:border-sport-accent/20 transition-colors">
          <div class="flex flex-wrap items-center gap-3 mb-3">
            <span class="px-3 py-1 bg-sport-accent/10 text-sport-accent text-xs font-sport-heading font-semibold rounded-full">{article.category}</span>
            <span class="text-sport-gray-400 text-xs">{article.readTime}</span>
          </div>
          <h3 class="text-xl font-sport-heading font-bold text-sport-dark mb-2 hover:text-sport-accent transition-colors cursor-pointer">
            {article.title}
          </h3>
          <p class="text-sport-gray-500 font-sport-body text-sm leading-relaxed">{article.excerpt}</p>
        </article>
      {/each}
    </div>

    <!-- Coming Soon -->
    <div class="mt-12 text-center">
      <div class="bg-sport-primary/5 rounded-2xl p-8 border border-sport-primary/10">
        <h3 class="font-sport-heading font-bold text-sport-dark text-lg mb-2">More Content Coming Soon</h3>
        <p class="text-sport-gray-500 text-sm mb-4">
          We're building our English content library. Subscribe to be notified when new articles are published.
        </p>
        <a href="/sportrail/contact" class="inline-flex px-6 py-3 bg-sport-primary hover:bg-sport-secondary text-white font-sport-heading font-semibold rounded-xl transition-colors">
          Subscribe to Updates
        </a>
      </div>
    </div>

  </div>
</section>
