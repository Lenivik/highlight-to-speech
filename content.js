document.addEventListener('mouseup', function(e) {
    var selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
      // Create and display the icon
      var icon = document.createElement('img');
      icon.src = chrome.runtime.getURL('icon.png'); // assuming you have an icon.png in your extension
      icon.style.position = 'absolute';
      icon.style.top = (e.pageY + 10) + 'px'; // position just below the cursor
      icon.style.left = e.pageX + 'px';
      icon.style.width = '24px';
      icon.style.height = '24px';
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