function insertVenueDetails(items) {
  items.forEach(item => {
    const venueName = item.venue?.name;
    const venueAddress = item.venue?.location?.address;
    if (venueName && venueAddress) {
      const searchString = `${venueName}, ${venueAddress}`;
      const searchBox = document.getElementById('searchboxinput');
      if (searchBox) {
        searchBox.value = searchString;
        // Trigger any necessary events to simulate user input
        searchBox.dispatchEvent(new Event('input', { bubbles: true }));
        // Simulate hitting the Enter key
        const enterEvent = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'Enter', code: 'Enter' });
        searchBox.dispatchEvent(enterEvent);
      }
    }
  });
}

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'insertVenues') {
    insertVenueDetails(request.items);
    sendResponse({ status: 'success' });
  }
});
