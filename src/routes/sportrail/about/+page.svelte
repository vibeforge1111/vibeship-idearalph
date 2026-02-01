<svelte:head>
  <title>About Sportrail - Our Story | Sportrail Football</title>
  <meta name="description" content="Founded in 2016, Sportrail is Portugal's leading football coaching education institution. DGERT & IPDJ certified, 2,500+ coaches trained worldwide." />
</svelte:head>

<!-- Hero -->
<section class="bg-sport-dark py-20 lg:py-28">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl">
      <span class="text-sport-accent text-sm font-sport-heading font-semibold uppercase tracking-wider">About Us</span>
      <h1 class="text-4xl sm:text-5xl font-sport-heading font-black text-white mt-3 mb-6">
        Building the Future of Football Coaching Since 2016
      </h1>
      <p class="text-lg text-sport-gray-300 font-sport-body leading-relaxed">
        Sportrail was founded with a clear mission: to provide world-class continuing education
        for football coaches and professionals. Based in Oeiras, Portugal, we have become the
        country's most recognized independent coaching education institution.
      </p>
    </div>
  </div>
</section>

<!-- Story -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-16">
      <div>
        <h2 class="text-3xl font-sport-heading font-black text-sport-dark mb-6">Our Story</h2>
        <div class="space-y-4 text-sport-gray-600 font-sport-body leading-relaxed">
          <p>
            Founded in October 2016, Sportrail emerged from a simple observation: the best coaching
            education doesn't come from textbooks — it comes from the people living the game at the
            highest level.
          </p>
          <p>
            Portugal has become the world's greatest exporter of football coaching talent. From Jose
            Mourinho to Ruben Amorim, from Abel Ferreira to Sergio Conceicao — Portuguese coaches
            lead clubs on every continent. Sportrail exists to continue this tradition of excellence.
          </p>
          <p>
            We built a network of over 70 expert faculty members — UEFA Pro coaches, sporting
            directors, sports scientists, scouts, and analysts — who deliver practical, real-world
            education that you simply cannot find elsewhere.
          </p>
          <p>
            Today, we are recognized as one of the top football coaching education companies in
            Portugal, having trained over 2,500 national and international coaches. We are certified
            by DGERT and accredited by IPDJ, ensuring every course counts toward your professional
            development.
          </p>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-sport-light rounded-2xl p-8 border border-sport-gray-100">
          <h3 class="text-xl font-sport-heading font-bold text-sport-dark mb-4">Our Mission</h3>
          <p class="text-sport-gray-600 font-sport-body leading-relaxed">
            To provide world-class continuing professional education that empowers football coaches
            and professionals to reach their full potential — through access to elite knowledge,
            practical methodology, and a global network of peers.
          </p>
        </div>

        <div class="bg-sport-light rounded-2xl p-8 border border-sport-gray-100">
          <h3 class="text-xl font-sport-heading font-bold text-sport-dark mb-4">Our Vision</h3>
          <p class="text-sport-gray-600 font-sport-body leading-relaxed">
            To be the global reference point for football coaching education — where the world comes
            to learn the Portuguese way of developing coaches and shaping the beautiful game.
          </p>
        </div>

        <div class="bg-sport-light rounded-2xl p-8 border border-sport-gray-100">
          <h3 class="text-xl font-sport-heading font-bold text-sport-dark mb-4">Our Values</h3>
          <ul class="space-y-2 text-sport-gray-600 font-sport-body">
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-sport-accent rounded-full"></span> Excellence in education delivery</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-sport-accent rounded-full"></span> Practical over theoretical knowledge</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-sport-accent rounded-full"></span> Access to elite professional networks</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-sport-accent rounded-full"></span> Continuous innovation in coaching science</li>
            <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 bg-sport-accent rounded-full"></span> International perspective, Portuguese roots</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Timeline -->
<section class="py-24 bg-sport-light">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-sport-heading font-black text-sport-dark mb-12 text-center">Our Journey</h2>

    <div class="space-y-8">
      {#each [
        { year: '2016', title: 'Foundation', desc: 'Sportrail is founded in Oeiras, Portugal with a mission to transform football coaching education.' },
        { year: '2017-18', title: 'Building the Network', desc: 'Established partnerships with top Portuguese clubs and began building our roster of elite faculty.' },
        { year: '2019', title: 'DGERT Certification', desc: 'Achieved DGERT certification, making our programs officially recognized for continuing professional development.' },
        { year: '2020', title: 'Digital Expansion', desc: 'Launched our e-learning platform (academy.sportrail.pt) to reach coaches globally, accelerated by pandemic-era demand.' },
        { year: '2021-22', title: 'International Growth', desc: 'Partnerships with Swedish FA, Sevilla FC, FC London. Launched International Scouting Conference and Football Science Conference.' },
        { year: '2023-24', title: '2,500+ Coaches', desc: 'Surpassed 2,500 coaches trained. Expanded faculty to 70+ international experts. Partnerships with SL Benfica and Sporting Braga.' },
        { year: '2025-26', title: 'Global Scale', desc: 'Launching sportrailfootball.com for international reach. Expanding course catalog. New conference series across Europe.' },
      ] as milestone}
        <div class="flex gap-6">
          <div class="shrink-0 w-24 text-right">
            <span class="font-sport-heading font-black text-sport-accent text-lg">{milestone.year}</span>
          </div>
          <div class="relative pb-8 border-l-2 border-sport-accent/30 pl-6">
            <div class="absolute -left-[9px] top-1 w-4 h-4 bg-sport-accent rounded-full border-4 border-sport-light"></div>
            <h3 class="font-sport-heading font-bold text-sport-dark text-lg">{milestone.title}</h3>
            <p class="text-sport-gray-500 font-sport-body mt-1">{milestone.desc}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Certifications -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 class="text-3xl font-sport-heading font-black text-sport-dark mb-12 text-center">Certifications & Accreditations</h2>

    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div class="bg-sport-light rounded-2xl p-8 border border-sport-gray-100 text-center">
        <div class="w-16 h-16 bg-sport-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span class="font-sport-heading font-black text-sport-primary text-xl">DGERT</span>
        </div>
        <h3 class="font-sport-heading font-bold text-sport-dark text-lg mb-2">DGERT Certified</h3>
        <p class="text-sport-gray-500 font-sport-body text-sm">
          Certified by the Directorate General for Employment and Labour Relations (DGERT),
          ensuring our training programs meet national quality standards for professional education.
        </p>
      </div>

      <div class="bg-sport-light rounded-2xl p-8 border border-sport-gray-100 text-center">
        <div class="w-16 h-16 bg-sport-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span class="font-sport-heading font-black text-sport-primary text-xl">IPDJ</span>
        </div>
        <h3 class="font-sport-heading font-bold text-sport-dark text-lg mb-2">IPDJ Accredited</h3>
        <p class="text-sport-gray-500 font-sport-body text-sm">
          Accredited by the Portuguese Institute for Sport and Youth (IPDJ). Our courses earn
          credit units (UC) that count toward coaching license renewal.
        </p>
      </div>
    </div>
  </div>
</section>
