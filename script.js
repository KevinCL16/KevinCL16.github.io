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

  // Cloudflare Web Analytics with a private browser-level opt-out.
  // This is a public site identifier embedded in the client-side beacon,
  // not an account credential or Cloudflare API token.
  const analyticsSiteId = '8d2373e097ef4c7c8ceb94f0b50b8275';
  const storageKey = 'disable-cloudflare-analytics';
  const cookieName = 'disable_cloudflare_analytics';
  const params = new URLSearchParams(window.location.search);
  const analyticsMode = params.get('analytics');

  function setOptOut(enabled) {
    try {
      if (enabled) {
        localStorage.setItem(storageKey, 'true');
      } else {
        localStorage.removeItem(storageKey);
      }
    } catch (error) {
      // Cookie below remains as a fallback when localStorage is unavailable.
    }

    if (enabled) {
      document.cookie = cookieName + '=true; Max-Age=31536000; Path=/; SameSite=Lax; Secure';
    } else {
      document.cookie = cookieName + '=; Max-Age=0; Path=/; SameSite=Lax; Secure';
    }
  }

  function isOptedOut() {
    try {
      if (localStorage.getItem(storageKey) === 'true') return true;
    } catch (error) {
      // Fall through to the cookie check.
    }

    return document.cookie
      .split(';')
      .map(function (part) { return part.trim(); })
      .some(function (part) { return part === cookieName + '=true'; });
  }

  function cleanAnalyticsParameter() {
    try {
      params.delete('analytics');
      const query = params.toString();
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname + (query ? '?' + query : '') + window.location.hash
      );
    } catch (error) {
      // URL cleanup is cosmetic; analytics behavior is already decided.
    }
  }

  function loadAnalytics() {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.dataset.cfBeacon = JSON.stringify({ token: analyticsSiteId });
    document.head.appendChild(script);
  }

  if (analyticsMode === 'off') {
    setOptOut(true);
    cleanAnalyticsParameter();
    return;
  }

  if (analyticsMode === 'on') {
    setOptOut(false);
    cleanAnalyticsParameter();
  }

  if (analyticsMode === 'status') {
    const optedOut = isOptedOut();
    window.alert('Cloudflare Analytics is ' + (optedOut ? 'OFF' : 'ON') + ' in this browser.');
    cleanAnalyticsParameter();
    if (optedOut) return;
  }

  if (!isOptedOut()) {
    loadAnalytics();
  }
})();
