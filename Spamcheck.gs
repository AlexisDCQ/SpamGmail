function labelSpamEmailsByUUID() {
  var userName = "YourNameHere";  // Your name, used to check if it's in the subject
  var labelName = "YourLabelToFlag";  // Label to assign
  var label = GmailApp.getUserLabelByName(labelName);
  if (!label) {
    label = GmailApp.createLabel(labelName);  // Create the label if it doesn't exist
  }

  var threads = GmailApp.search("in:inbox OR in:spam newer_than:7d");  // Search in Inbox & Spam
  var messages = GmailApp.getMessagesForThreads(threads);
  
  // Regex for detecting UUID-like Message-ID
  var uuidPattern = /(?<!calendar-|google-|outlook-|notification-|server-|mail-|bounce-)[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}@[\w\.-]+/;

  // Trusted domains that often use UUID Message-IDs but are not spam
  var trustedDomains = ["google.com", "microsoft.com", "thomann.de", "apple.com", "amazon.com"];

  for (var i = 0; i < messages.length; i++) {
    for (var j = 0; j < messages[i].length; j++) {
      var message = messages[i][j];  // Get the email
      var headers = message.getRawContent();
      
      var messageIdMatch = headers.match(/Message-ID:\s*<(.+?)>/i);
      var subjectMatch = headers.match(/Subject:\s*(.+)/i);
      var listUnsubscribeMatch = headers.match(/List-Unsubscribe:/i);
      
      var messageId = messageIdMatch ? messageIdMatch[1] : "";
      var subject = subjectMatch ? subjectMatch[1].trim() : "";
      var messageDomain = messageId.split("@").pop();

      var isUUID = uuidPattern.test(messageId) && !trustedDomains.includes(messageDomain);
      var isMarketing = listUnsubscribeMatch !== null;
      var containsUserName = subject.toLowerCase().includes(userName.toLowerCase());

      // If the email has a UUID Message-ID (and is not from a trusted domain), is marketing, or contains "Alexis" in the subject
      if (isUUID || isMarketing || containsUserName) {
        message.getThread().addLabel(label);  // Apply the "Spam Test" label to the thread
      }
    }
  }
}
