document.addEventListener('mouseup', function(e) {
  var selection = window.getSelection();
  var selectedText = selection.toString().trim();
  if (selectedText.length > 0) {
    // Get the position of the last character of the selected text
    var range = selection.getRangeAt(0);
    var rect = range.getBoundingClientRect();

    // Create and display the icon
    var icon = document.createElement('img');
    icon.src = chrome.runtime.getURL('icon.png'); // assuming you have an icon.png in your extension
    icon.style.position = 'absolute';
    icon.style.top = (rect.bottom + window.scrollY + 10) + 'px'; // position just below the selected text
    icon.style.left = (rect.right + window.scrollX) + 'px'; // position at the end of the selected text
    icon.id = 'speakIcon';
    document.body.appendChild(icon);

    // Add event listener to the icon
    icon.addEventListener('click', function() {
      // On click, send a message to the background script
      chrome.runtime.sendMessage({action: "speak", text: selectedText});
      // Remove the icon after click
      document.body.removeChild(icon);
    });
  }
});

// Remove the icon if the user clicks anywhere else
document.addEventListener('mousedown', function(e) {
  var icon = document.getElementById('speakIcon');
  if (icon && e.target !== icon) {
    document.body.removeChild(icon);
  }
});