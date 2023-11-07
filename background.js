chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "speak") {
      var msg = new SpeechSynthesisUtterance(request.text);
      window.speechSynthesis.speak(msg);
    }
  });