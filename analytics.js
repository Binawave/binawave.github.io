(() => {
  if (location.hostname !== 'binawave.app' && location.hostname !== 'www.binawave.app') return;
  const id = 'G-V5Q8KM8P9J', key = 'binawave-analytics-consent';
  const en = document.documentElement.lang === 'en';
  let enabled = false, loaded = false, saved;
  try { saved = localStorage.getItem(key); } catch (_) {}
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag('consent', 'default', {analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  function enable() {
    enabled = true;
    window['ga-disable-' + id] = false;
    gtag('consent', 'update', {analytics_storage:'granted'});
    if (loaded) return;
    loaded = true;
    gtag('js', new Date());
    gtag('config', id, {allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin+location.pathname});
    const script = document.createElement('script'); script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.append(script);
  }
  const panel = document.createElement('section'); panel.className = 'analytics-choice';
  panel.setAttribute('aria-label', en ? 'Analytics preferences' : 'アクセス解析の設定');
  panel.innerHTML = `<p>${en ? 'May we use Google Analytics cookies to understand visits and improve this website?' : 'サイト改善のため、Google AnalyticsのCookieを使用して閲覧状況を解析してよいですか？'} <a href="${en?'/en/privacy/':'/privacy/'}">${en?'Privacy policy':'プライバシーポリシー'}</a></p><div><button type="button" data-choice="yes">${en?'Allow':'許可する'}</button><button type="button" data-choice="no">${en?'Decline':'許可しない'}</button></div>`;
  document.body.append(panel); panel.hidden = saved === 'yes' || saved === 'no';
  panel.addEventListener('click', event => {
    const button = event.target.closest('[data-choice]'); if (!button) return;
    const value = button.dataset.choice;
    try { localStorage.setItem(key,value); } catch (_) {}
    if (value === 'yes') enable();
    else {
      enabled = false; window['ga-disable-' + id] = true;
      gtag('consent','update',{analytics_storage:'denied'});
      document.cookie.split(';').forEach(cookie => {
        const name = cookie.split('=')[0].trim();
        if (!name.startsWith('_ga')) return;
        ['', '; domain=binawave.app', '; domain=.binawave.app'].forEach(domain => { document.cookie = name+'=; Max-Age=0; path=/'+domain; });
      });
    }
    panel.hidden = true;
  });
  const settings = document.createElement('button'); settings.type='button'; settings.className='analytics-settings';
  settings.textContent=en?'Cookie settings':'Cookie設定'; settings.onclick=()=>{panel.hidden=false;panel.querySelector('button').focus();};
  (document.querySelector('footer') || document.body).append(settings);
  if (saved === 'yes') enable();
  document.addEventListener('click', event => {
    const link=event.target.closest('a[href]');
    if (enabled && link && new URL(link.href).hostname === 'apps.apple.com') gtag('event','app_store_click',{site_language:document.documentElement.lang,page_path:location.pathname,transport_type:'beacon'});
  });
})();
