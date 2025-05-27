(async () => {
  // ---- 1. Load configuration ------------------------------------------------
  let cfg;
  try {
    const res = await fetch(chrome.runtime.getURL('config.json'));
    cfg = await res.json();
  } catch (e) {
    console.error('Jira-Multi-Avatar: config.json missing or invalid', e);
    return;
  }

  const { customFieldId, avatars } = cfg;

  // ---- 2. Core logic --------------------------------------------------------
  function addAvatarsToCard(card) {
    const customField = card.querySelector(`#${customFieldId}`);
    if (!customField) return;
    if (card.querySelector('.custom-multi-avatar')) return; // no duplicates

    const names = customField.textContent
        .trim()
        .split(/,| og |\/|;/)
        .map(n => n.trim())
        .filter(Boolean);

    const avatarAnchor = card.querySelector('.ghx-avatar-img')?.parentElement;
    if (!avatarAnchor) return;

    names.forEach(name => {
      const url = avatars[name];
      if (!url) return;  // skip if no URL configured

      const img = document.createElement('img');
      img.className = 'custom-multi-avatar';
      img.src = url;
      img.alt = name;
      img.title = name;
      Object.assign(img.style, {
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        marginLeft: '4px',
        objectFit: 'cover',
        flexShrink: '0'
      });
      avatarAnchor.appendChild(img);
    });
  }

  function processAllCards() {
    document.querySelectorAll('.js-issue').forEach(addAvatarsToCard);
  }

  // Run once after initial load
  setTimeout(processAllCards, 10000);

  // Watch for SPA updates (drag-&-drop, column changes, etc.)
  new MutationObserver(processAllCards).observe(document.body, {
    childList: true,
    subtree: true
  });
})();
