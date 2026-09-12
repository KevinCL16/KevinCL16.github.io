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

  const newsList = document.querySelector('#news .news-list');
  if (newsList && !newsList.querySelector('[data-news="organizing-intelligence-over-time"]')) {
    const entries = [
      {
        id: 'organizing-intelligence-over-time',
        date: 'Sep 2026',
        type: 'Survey · Position',
        title: 'Organizing Intelligence Over Time',
        summary: 'Human–AI collaboration as joint cognitive development.',
        href: '/organizing-intelligence-over-time.html',
        external: false
      },
      {
        id: 'harness-learning',
        date: 'Sep 2026',
        type: 'Essay',
        title: 'The Harness Learning Stack',
        summary: 'A post-training-like stack around environments, trajectories, graders, credit assignment, and harness updates.',
        href: '/harness-learning.html',
        external: false
      },
      {
        id: 'awesome-longitudinal-ai-agents',
        date: 'Sep 2026',
        type: 'Literature map',
        title: 'Awesome Longitudinal AI Agents',
        summary: 'A curated map of research on agents and Human–AI systems that change through accumulated experience.',
        href: 'https://github.com/KevinCL16/awesome-longitudinal-ai-agents',
        external: true
      }
    ];

    entries.slice().reverse().forEach(function (entry) {
      const item = document.createElement('a');
      item.className = 'news-item';
      item.dataset.news = entry.id;
      item.href = entry.href;
      if (entry.external) {
        item.target = '_blank';
        item.rel = 'noopener noreferrer';
      }
      item.innerHTML = [
        '<time class="news-date">' + entry.date + '</time>',
        '<span class="news-type">' + entry.type + '</span>',
        '<span class="news-text"><strong>' + entry.title + '</strong><span class="news-summary"> — ' + entry.summary + '</span></span>',
        '<span class="news-arrow" aria-hidden="true">↗</span>'
      ].join('');
      newsList.prepend(item);
    });
  }

  // Both analytics systems share this browser-level opt-out.
  // The Cloudflare beacon token is public client-side configuration, not a secret.
  const analyticsSiteId = '8d2373e097ef4c7c8ceb94f0b50b8275';
  const pageviewCounterEndpoint = 'https://kevincl16-page-counter.teslacpp.workers.dev/hit';
  const storageKey = 'disable-cloudflare-analytics';
  const visitorStorageKey = 'anonymous-pageview-visitor-id';
  const cookieName = 'disable_cloudflare_analytics';
  const params = new URLSearchParams(window.location.search);
  const analyticsMode = params.get('analytics');

  function setOptOut(enabled) {
    try {
      if (enabled) {
        localStorage.setItem(storageKey, 'true');
        localStorage.removeItem(visitorStorageKey);
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

  function getAnonymousVisitorId() {
    try {
      const existing = localStorage.getItem(visitorStorageKey);
      if (existing && /^[A-Za-z0-9_-]{16,128}$/.test(existing)) return existing;

      let id;
      if (window.crypto && typeof window.crypto.randomUUID === 'function') {
        id = window.crypto.randomUUID();
      } else if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
        const bytes = new Uint8Array(16);
        window.crypto.getRandomValues(bytes);
        id = Array.from(bytes, function (byte) {
          return byte.toString(16).padStart(2, '0');
        }).join('');
      }

      if (!id) return null;
      localStorage.setItem(visitorStorageKey, id);
      return id;
    } catch (error) {
      return null;
    }
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

  function countPageview() {
    if (!pageviewCounterEndpoint) return;

    const visitorId = getAnonymousVisitorId();
    fetch(pageviewCounterEndpoint, {
      method: 'POST',
      mode: 'cors',
      credentials: 'omit',
      cache: 'no-store',
      keepalive: true,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visitorId ? { visitor_id: visitorId } : {})
    }).catch(function () {
      // Analytics must never interfere with page rendering.
    });
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
    countPageview();
  }
})();
