import browser from 'webextension-polyfill';

const API_BASE_URL = 'https://codiceamico.app/api/extension';

// Listen for tab updates to show badge if codes are found
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    try {
      const url = new URL(tab.url);
      if (url.protocol.startsWith('http')) {
        const response = await fetch(`${API_BASE_URL}/check?url=${encodeURIComponent(tab.url)}`);
        const data = await response.json();

        if (data.found && data.codes && data.codes.length > 0) {
          await browser.action.setBadgeText({
            text: data.codes.length.toString(),
            tabId: tabId
          });
          await browser.action.setBadgeBackgroundColor({
            color: '#3B82F6', // primary blue
            tabId: tabId
          });
        } else {
          await browser.action.setBadgeText({
            text: '',
            tabId: tabId
          });
        }
      }
    } catch (error) {
      console.error('Error checking for codes:', error);
    }
  }
});
