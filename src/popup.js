document.getElementById('uploadButton').addEventListener('click', function() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const jsonContent = JSON.parse(e.target.result);
        const items = jsonContent.response?.list?.listItems?.items;
        if (items) {
          // Send the items to the content script
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs.length > 0) {
              chrome.tabs.sendMessage(tabs[0].id, { action: 'insertVenues', items: items }, function(response) {
                if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError.message);
                  alert('Error: Could not establish connection to the content script.');
                } else {
                  console.log(response.status);
                }
              });
            } else {
              alert('Error: No active tab found.');
            }
          });
        } else {
          alert('Error: The expected JSON path "response.list.listItems.items" was not found.');
        }
      } catch (error) {
        alert('Error: Invalid JSON file.');
      }
    };
    reader.readAsText(file);
  } else {
    alert('Please select a file first.');
  }
});
