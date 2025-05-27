(async () => {
  let config;
  try {
    const res = await fetch(chrome.runtime.getURL('config.json'));
    config = await res.json();
  } catch (e) {
    console.error('Jira-Multi-Avatar: config.json missing or invalid', e);
    return;
  }

  const { multipleAssigneesFieldId, avatars } = config;

  function addAvatarsToCard(card) {
    const customField = card.querySelector(`#${multipleAssigneesFieldId}`);

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
      if (!url) return;

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

  // Run once after initial load, and then every 10 minutes
  setTimeout(processAllCards, 600000);

  // Watch for SPA updates (drag-&-drop, column changes, etc.)
  new MutationObserver(processAllCards).observe(document.body, {
    childList: true,
    subtree: true
  });
})();
