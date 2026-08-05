(function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = document.body.classList.toggle('nav-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const year = document.querySelector('#current-year');
  if (year) year.textContent = new Date().getFullYear();

  // Cloudflare Web Analytics with private browser-level opt-out.
  const analyticsToken = '8d2373e097ef4c7c8ceb94f0b50b8275';
  const storageKey = 'disable-cloudflare-analytics';

  try {
    const params = new URLSearchParams(window.location.search);

    if (params.get('analytics') === 'off') {
      localStorage.setItem(storageKey, 'true');
      params.delete('analytics');
      window.history.replaceState({}, document.title, window.location.pathname + (params.toString() ? '?' + params.toString() : '') + window.location.hash);
    }

    if (params.get('analytics') === 'on') {
      localStorage.removeItem(storageKey);
      params.delete('analytics');
      window.history.replaceState({}, document.title, window.location.pathname + (params.toString() ? '?' + params.toString() : '') + window.location.hash);
    }

    if (localStorage.getItem(storageKey) !== 'true') {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
      script.dataset.cfBeacon = JSON.stringify({ token: analyticsToken });
      document.head.appendChild(script);
    }
  } catch (e) {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.dataset.cfBeacon = JSON.stringify({ token: analyticsToken });
    document.head.appendChild(script);
  }
})();
