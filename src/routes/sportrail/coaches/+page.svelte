<svelte:head>
  <title>Our Coaches & Faculty | Sportrail Football</title>
  <meta name="description" content="70+ expert faculty including UEFA Pro coaches, sporting directors, sports scientists, and scouts from top European clubs." />
</svelte:head>

<!-- Hero -->
<section class="bg-sport-dark py-20 lg:py-28">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl">
      <span class="text-sport-accent text-sm font-sport-heading font-semibold uppercase tracking-wider">Faculty</span>
      <h1 class="text-4xl sm:text-5xl font-sport-heading font-black text-white mt-3 mb-6">
        70+ World-Class Experts
      </h1>
      <p class="text-lg text-sport-gray-300 font-sport-body leading-relaxed">
        Our faculty is our greatest asset. UEFA Pro coaches, sporting directors from top clubs,
        leading sports scientists, and international scouting professionals — all sharing
        real-world knowledge you won't find in any textbook.
      </p>
    </div>
  </div>
</section>

<!-- Faculty Grid -->
<section class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <!-- Categories -->
    <div class="mb-16">
      <h2 class="text-2xl font-sport-heading font-black text-sport-dark mb-8">Coaches & Managers</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {#each [
          { name: 'Luis Castro', role: 'UEFA Pro Coach', flag: '🇵🇹' },
          { name: 'Renato Paiva', role: 'Football Coach', flag: '🇵🇹' },
          { name: 'Joao Tralhao', role: 'Football Coach', flag: '🇵🇹' },
          { name: 'Oscar Cano', role: 'Football Coach', flag: '🇪🇸' },
          { name: 'Andoni Bombin', role: 'UEFA Pro / Director of Methodology', flag: '🇪🇸' },
          { name: 'Mariana Cabral', role: 'Football Coach', flag: '🇵🇹' },
          { name: 'Goncalo Nunes', role: 'Football Coach', flag: '🇵🇹' },
          { name: 'Joao Nuno Fonseca', role: 'Football Coach', flag: '🇵🇹' },
          { name: 'Gil Sousa', role: 'Football Coach', flag: '🇵🇹' },
          { name: 'Joel Rocha', role: 'Futsal Coach', flag: '🇵🇹' },
          { name: 'Blessing Lumueno', role: 'Football Coach', flag: '🇨🇩' },
          { name: 'Ruben Pinheiro', role: 'Football Coach', flag: '🇵🇹' },
          { name: 'Carlos Pinto', role: 'U19 Coach, SC Torreense', flag: '🇵🇹' },
        ] as coach}
          <div class="bg-sport-light rounded-xl p-4 border border-sport-gray-100 hover:border-sport-accent/30 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-sport-primary/10 rounded-full flex items-center justify-center text-lg">{coach.flag}</div>
              <div>
                <div class="font-sport-heading font-bold text-sport-dark text-sm">{coach.name}</div>
                <div class="text-sport-gray-500 text-xs">{coach.role}</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="mb-16">
      <h2 class="text-2xl font-sport-heading font-black text-sport-dark mb-8">Sporting Directors & Management</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {#each [
          { name: 'Jose Boto', role: 'Sporting Director', flag: '🇵🇹' },
          { name: 'David Caiado', role: 'Sporting Director', flag: '🇵🇹' },
          { name: 'Diogo Boa Alma', role: 'Sporting Director', flag: '🇵🇹' },
          { name: 'Jose Couceiro', role: 'Sports Consultant', flag: '🇵🇹' },
          { name: 'Rui Abreu', role: 'President SAD', flag: '🇵🇹' },
          { name: 'Rui Lanca', role: 'Sporting Director', flag: '🇵🇹' },
          { name: 'Eduardo Covelo Mateo', role: 'Youth Football Director', flag: '🇪🇸' },
          { name: 'Daniel Parnell', role: 'CEO, Association of Sporting Directors', flag: '🇬🇧' },
          { name: 'Jason Stephens', role: 'Football Business Specialist', flag: '🇬🇧' },
          { name: 'Jose Collado', role: 'International Projects Director', flag: '🇪🇸' },
          { name: 'Duarte Damas', role: 'Business Development Manager', flag: '🇵🇹' },
        ] as director}
          <div class="bg-sport-light rounded-xl p-4 border border-sport-gray-100 hover:border-sport-accent/30 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-sport-gold/10 rounded-full flex items-center justify-center text-lg">{director.flag}</div>
              <div>
                <div class="font-sport-heading font-bold text-sport-dark text-sm">{director.name}</div>
                <div class="text-sport-gray-500 text-xs">{director.role}</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="mb-16">
      <h2 class="text-2xl font-sport-heading font-black text-sport-dark mb-8">Sports Science & Performance</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {#each [
          { name: 'Adam Centofanti', role: 'S&C Coach', flag: '🇬🇧' },
          { name: 'Alex Calder', role: 'Head of Performance', flag: '🇬🇧' },
          { name: 'Andrea Riboli', role: 'Sports Scientist / Head of Sports Science', flag: '🇮🇹' },
          { name: 'Carlos Balsalobre', role: 'Sports Scientist', flag: '🇪🇸' },
          { name: 'Hugo Correia', role: 'S&C Coach', flag: '🇵🇹' },
          { name: 'Ismael Fernandez', role: 'Sports Scientist', flag: '🇪🇸' },
          { name: 'Joao Francisco Almeida', role: 'Head of Performance', flag: '🇵🇹' },
          { name: 'John Grace', role: 'Head of Performance', flag: '🇬🇧' },
          { name: 'Kyle Davey', role: 'Neck Injury Expert', flag: '🇬🇧' },
          { name: 'Martin Buchheitt', role: 'S&C Coach', flag: '🇫🇷' },
          { name: 'Miguel Alonso', role: 'Physical Preparation Coach', flag: '🇪🇸' },
          { name: 'Pablo Diaz', role: 'Physical Preparation Coach', flag: '🇪🇸' },
          { name: 'Nuno Mateus', role: 'Professor & Researcher', flag: '🇵🇹' },
          { name: 'Rick Cost', role: 'High Performance Director', flag: '🇳🇱' },
          { name: 'Derek Hansen', role: 'Performance Specialist', flag: '🇨🇦' },
        ] as scientist}
          <div class="bg-sport-light rounded-xl p-4 border border-sport-gray-100 hover:border-sport-accent/30 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-sport-accent/10 rounded-full flex items-center justify-center text-lg">{scientist.flag}</div>
              <div>
                <div class="font-sport-heading font-bold text-sport-dark text-sm">{scientist.name}</div>
                <div class="text-sport-gray-500 text-xs">{scientist.role}</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="mb-16">
      <h2 class="text-2xl font-sport-heading font-black text-sport-dark mb-8">Analysis, Scouting & Specialist</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {#each [
          { name: 'Andres Bretones', role: 'Tactical Analyst', flag: '🇪🇸' },
          { name: 'Anselmo Ruiz de Alarcon', role: 'Data Analyst', flag: '🇪🇸' },
          { name: 'Eduardo Rosalino', role: 'Analyst', flag: '🇵🇹' },
          { name: 'Ramon Alturo', role: 'Analyst', flag: '🇪🇸' },
          { name: 'Jose Laranjeira', role: 'Senior Scout', flag: '🇵🇹' },
          { name: 'Pedro Ferreira', role: 'Head of Recruitment', flag: '🇵🇹' },
          { name: 'Diogo Teixeira', role: 'Technical Coordinator U14/U15, Sporting CP', flag: '🇵🇹' },
          { name: 'Carlos Silva', role: 'Sports Advisor', flag: '🇵🇹' },
          { name: 'Hugo Vicente', role: 'Director of Methodology, Viking FC', flag: '🇵🇹' },
          { name: 'Bram van de Vinne', role: 'Football Specialist', flag: '🇳🇱' },
        ] as analyst}
          <div class="bg-sport-light rounded-xl p-4 border border-sport-gray-100 hover:border-sport-accent/30 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-sport-primary/10 rounded-full flex items-center justify-center text-lg">{analyst.flag}</div>
              <div>
                <div class="font-sport-heading font-bold text-sport-dark text-sm">{analyst.name}</div>
                <div class="text-sport-gray-500 text-xs">{analyst.role}</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div class="mb-16">
      <h2 class="text-2xl font-sport-heading font-black text-sport-dark mb-8">Goalkeeper Coaches</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {#each [
          { name: 'Eduardo Cachulo', role: 'Goalkeeper Coach', flag: '🇵🇹' },
          { name: 'Jaime Pombo', role: 'Goalkeeper Coach', flag: '🇵🇹' },
          { name: 'Javier Barbero', role: 'Goalkeeper Coach', flag: '🇪🇸' },
          { name: 'Ricardo Pereira', role: 'Goalkeeper Coach', flag: '🇵🇹' },
        ] as gk}
          <div class="bg-sport-light rounded-xl p-4 border border-sport-gray-100 hover:border-sport-accent/30 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-sport-accent/10 rounded-full flex items-center justify-center text-lg">{gk.flag}</div>
              <div>
                <div class="font-sport-heading font-bold text-sport-dark text-sm">{gk.name}</div>
                <div class="text-sport-gray-500 text-xs">{gk.role}</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-sport-heading font-black text-sport-dark mb-8">Communication & Media</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {#each [
          { name: 'Carlos Daniel', role: 'Journalist', flag: '🇵🇹' },
          { name: 'Catalina Ramirez', role: 'Director of Communication, Casa Pia AC', flag: '🇨🇴' },
          { name: 'Diogo Kotscho', role: 'Director of Communication', flag: '🇧🇷' },
          { name: 'Pedro Sa', role: 'Director of Communication, FC Famalicao', flag: '🇵🇹' },
          { name: 'Rodrigo Paiva', role: 'Director of Communication, Flamengo', flag: '🇧🇷' },
          { name: 'Ruben Martins', role: 'Social Media Manager', flag: '🇵🇹' },
          { name: 'Jose Miguel Nora', role: 'Sports Lawyer', flag: '🇵🇹' },
        ] as media}
          <div class="bg-sport-light rounded-xl p-4 border border-sport-gray-100 hover:border-sport-accent/30 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-sport-gold/10 rounded-full flex items-center justify-center text-lg">{media.flag}</div>
              <div>
                <div class="font-sport-heading font-bold text-sport-dark text-sm">{media.name}</div>
                <div class="text-sport-gray-500 text-xs">{media.role}</div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>

  </div>
</section>

<!-- CTA -->
<section class="py-16 bg-sport-primary">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h2 class="text-2xl font-sport-heading font-black text-white mb-4">Want to Join Our Faculty?</h2>
    <p class="text-sport-gray-300 font-sport-body mb-6">We're always looking for exceptional professionals to share their knowledge.</p>
    <a href="/sportrail/contact" class="inline-flex px-8 py-3 bg-sport-accent hover:bg-sport-gold text-white font-sport-heading font-semibold rounded-xl transition-colors">
      Apply as Faculty
    </a>
  </div>
</section>
