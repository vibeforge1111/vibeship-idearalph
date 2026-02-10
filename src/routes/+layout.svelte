<script lang="ts">
  import '../app.css';

  let { children } = $props();
  let mobileMenuOpen = $state(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/players', label: 'For Players' },
    { href: '/courses', label: 'For Coaches' },
    { href: '/about', label: 'About' },
    { href: '/coaches', label: 'Our Experts' },
    { href: '/conferences', label: 'Events' },
    { href: '/blog', label: 'Insights' },
    { href: '/contact', label: 'Contact' },
  ];
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<!-- Navigation -->
<nav class="bg-sport-dark/95 backdrop-blur-sm fixed w-full z-50 border-b border-sport-gray-800/20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16 lg:h-20">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2">
        <img src="/sportrail-logo.svg" alt="Sportrail" class="h-10 lg:h-12 w-auto" />
      </a>

      <!-- Desktop Nav -->
      <div class="hidden lg:flex items-center gap-1">
        {#each navLinks as link}
          <a
            href={link.href}
            class="px-3 py-2 text-sm font-sport-body text-sport-gray-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {link.label}
          </a>
        {/each}
        <a
          href="/contact"
          class="ml-4 px-5 py-2.5 bg-sport-red hover:bg-red-700 text-white text-sm font-sport-heading font-semibold rounded transition-colors uppercase"
        >
          Get a Quote
        </a>
      </div>

      <!-- Mobile menu button -->
      <button
        class="lg:hidden text-white p-2"
        onclick={() => mobileMenuOpen = !mobileMenuOpen}
        aria-label="Toggle menu"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {#if mobileMenuOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          {/if}
        </svg>
      </button>
    </div>

    <!-- Mobile Nav -->
    {#if mobileMenuOpen}
      <div class="lg:hidden pb-4 border-t border-sport-gray-800/20 mt-2 pt-4">
        {#each navLinks as link}
          <a
            href={link.href}
            class="block px-4 py-3 text-sport-gray-200 hover:text-white hover:bg-white/10 rounded-lg font-sport-body"
            onclick={() => mobileMenuOpen = false}
          >
            {link.label}
          </a>
        {/each}
        <a
          href="/contact"
          class="block mt-3 mx-4 px-5 py-3 bg-sport-red text-white text-center font-sport-heading font-semibold rounded uppercase"
          onclick={() => mobileMenuOpen = false}
        >
          Get a Quote
        </a>
      </div>
    {/if}
  </div>
</nav>

<!-- Page Content -->
<main class="pt-16 lg:pt-20 bg-white min-h-screen font-sport-body text-sport-gray-800">
  {@render children()}
</main>

<!-- Footer -->
<footer class="bg-sport-dark text-sport-gray-300 font-sport-body">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      <!-- Brand -->
      <div class="lg:col-span-1">
        <div class="flex items-center gap-3 mb-4">
          <img src="/sportrail-logo.svg" alt="Sportrail" class="h-10 w-auto" />
        </div>
        <p class="text-sm text-sport-gray-400 leading-relaxed mb-4">
          Portugal's premier football education institution. Developing elite players and coaches since 2016.
        </p>
        <div class="flex gap-3">
          <a href="https://facebook.com/sportrailpt" target="_blank" rel="noopener" class="w-9 h-9 bg-white/10 hover:bg-sport-red rounded-lg flex items-center justify-center transition-colors" aria-label="Facebook">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href="https://instagram.com/sportrail_pt" target="_blank" rel="noopener" class="w-9 h-9 bg-white/10 hover:bg-sport-red rounded-lg flex items-center justify-center transition-colors" aria-label="Instagram">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://www.linkedin.com/showcase/sportrail-global" target="_blank" rel="noopener" class="w-9 h-9 bg-white/10 hover:bg-sport-red rounded-lg flex items-center justify-center transition-colors" aria-label="LinkedIn">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
      </div>

      <!-- For Players -->
      <div>
        <h3 class="text-white font-sport-heading font-semibold text-sm uppercase tracking-wider mb-4">For Players</h3>
        <ul class="space-y-2.5">
          <li><a href="/players" class="text-sm hover:text-sport-red transition-colors">Player Programs</a></li>
          <li><a href="/players#development" class="text-sm hover:text-sport-red transition-colors">Development Camps</a></li>
          <li><a href="/players#trials" class="text-sm hover:text-sport-red transition-colors">Pro Trials</a></li>
          <li><a href="/players#international" class="text-sm hover:text-sport-red transition-colors">International Players</a></li>
        </ul>
      </div>

      <!-- For Coaches -->
      <div>
        <h3 class="text-white font-sport-heading font-semibold text-sm uppercase tracking-wider mb-4">For Coaches</h3>
        <ul class="space-y-2.5">
          <li><a href="/courses" class="text-sm hover:text-sport-red transition-colors">Coach Education</a></li>
          <li><a href="/courses#tailored" class="text-sm hover:text-sport-red transition-colors">Tailored Courses</a></li>
          <li><a href="/conferences" class="text-sm hover:text-sport-red transition-colors">Events & Conferences</a></li>
          <li><a href="/coaches" class="text-sm hover:text-sport-red transition-colors">Our Experts</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h3 class="text-white font-sport-heading font-semibold text-sm uppercase tracking-wider mb-4">Contact</h3>
        <ul class="space-y-2.5 text-sm">
          <li class="flex items-start gap-2">
            <svg class="w-4 h-4 mt-0.5 shrink-0 text-sport-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <span>Rua Sao Salvador da Baia,<br/>ED. AERLIS, 2780-019 Oeiras</span>
          </li>
          <li class="flex items-center gap-2">
            <svg class="w-4 h-4 shrink-0 text-sport-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            <a href="mailto:geral@sportrail.pt" class="hover:text-sport-red transition-colors">geral@sportrail.pt</a>
          </li>
          <li class="flex items-center gap-2">
            <svg class="w-4 h-4 shrink-0 text-sport-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            <a href="tel:+351924355598" class="hover:text-sport-red transition-colors">+351 924 355 598</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Certifications Bar -->
    <div class="mt-12 pt-8 border-t border-sport-secondary/30">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2 text-xs text-sport-gray-400">
            <div class="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-sport-red font-sport-heading font-bold text-[10px]">DGERT</div>
            <span>Certified Entity</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-sport-gray-400">
            <div class="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-sport-red font-sport-heading font-bold text-[10px]">IPDJ</div>
            <span>Accredited</span>
          </div>
        </div>
        <p class="text-xs text-sport-gray-500">&copy; {new Date().getFullYear()} Sportrail. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>
