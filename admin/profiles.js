// Profile navigation functionality
document.addEventListener('DOMContentLoaded', function() {
  // Select all profile cards
  const profileCards = document.querySelectorAll('.profile-card, .profile-card-fullscreen');
  const profilesFullscreen = document.getElementById('profilesFullscreen');
  const dashboard = document.getElementById('dashboard');
  const header = document.getElementById('header');
  const chatbotSection = document.getElementById('chatbotSection');
  
  // Current selected profile
  let currentProfile = null;
  
  // Define default layouts for each profile
  const defaultLayouts = {
    student: [
      {id: 'my-cursus', title: 'My Cursus', icon: 'fas fa-graduation-cap', color: null, visible: true},
      {id: 'announcements', title: 'Announcements', icon: 'fas fa-bullhorn', color: null, visible: true},
      {id: 'schedule', title: 'Emploi du Temps', icon: 'fas fa-calendar-alt', color: null, visible: true},
      {id: 'virtual-library', title: 'Virtual Library', icon: 'fas fa-book', color: null, visible: true},
      {id: 'grades', title: 'Grades', icon: 'fas fa-chart-bar', color: null, visible: true},
      {id: 'assignments', title: 'Assignments', icon: 'fas fa-tasks', color: null, visible: true}
    ],
    teacher: [
      {id: 'my-classes', title: 'My Classes', icon: 'fas fa-chalkboard-teacher', color: null, visible: true},
      {id: 'lesson-plans', title: 'Lesson Plans', icon: 'fas fa-book-open', color: null, visible: true},
      {id: 'gradebook', title: 'Gradebook', icon: 'fas fa-clipboard-list', color: null, visible: true},
      {id: 'student-progress', title: 'Student Progress', icon: 'fas fa-chart-line', color: null, visible: true}
    ],
    ats: [
      {id: 'server-status', title: 'Server Status', icon: 'fas fa-server', color: null, visible: true},
      {id: 'user-management', title: 'User Management', icon: 'fas fa-users', color: null, visible: true},
      {id: 'system-updates', title: 'System Updates', icon: 'fas fa-download', color: null, visible: true},
      {id: 'maintenance', title: 'Maintenance', icon: 'fas fa-tools', color: null, visible: true}
    ],
    doctoral: [
      {id: 'research-project', title: 'Research Project', icon: 'fas fa-microscope', color: null, visible: true},
      {id: 'literature-review', title: 'Literature Review', icon: 'fas fa-book-reader', color: null, visible: true},
      {id: 'publications', title: 'Publications', icon: 'fas fa-newspaper', color: null, visible: true},
      {id: 'supervisor-meetings', title: 'Supervisor Meetings', icon: 'fas fa-handshake', color: null, visible: true}
    ]
  };
  
  // Function to get the current layout for a profile
  function getCurrentLayout(profile) {
    // Try to get layout from localStorage
    const storedLayout = localStorage.getItem(`${profile}_layout`);
    if (storedLayout) {
      try {
        return JSON.parse(storedLayout);
      } catch (e) {
        console.error('Error parsing stored layout:', e);
      }
    }
    
    // Fall back to default layout if no stored layout
    return {
      cards: defaultLayouts[profile] || [],
      deletedCards: []
    };
  }
  
  // Function to save layout to localStorage
  function saveLayout(profile, layout) {
    localStorage.setItem(`${profile}_layout`, JSON.stringify(layout));
  }
  
  // Add click event listener to each profile card
  profileCards.forEach(card => {
    card.addEventListener('click', function() {
      const profileType = this.getAttribute('data-profile');
      console.log('Profile clicked:', profileType);
      currentProfile = profileType;
      
      // Add visual feedback when clicked
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
        
        // Show the dashboard and hide the fullscreen profile selection
        profilesFullscreen.classList.add('hidden');
        dashboard.classList.add('active');
        header.classList.add('compact');
        
        // Show the chatbot section and make it active
        chatbotSection.classList.add('active');
        
        // Initialize the chat interface
        initializeChat(profileType);
      }, 200);
    });

    // Add visual feedback on hover
    card.addEventListener('mouseenter', function() {
      this.classList.add('hovered');
    });
    
    card.addEventListener('mouseleave', function() {
      this.classList.remove('hovered');
    });
  });
  
  function initializeChat(profileType) {
    // Clear previous chat content if any
    chatbotSection.innerHTML = '';
    
    // Create chat header
    const chatHeader = document.createElement('div');
    chatHeader.className = 'chat-header';
    
    // Different icons and titles based on profile type
    const iconMap = {
      'student': '🎓',
      'teacher': '👨‍🏫',
      'ats': '⚙️',
      'doctoral': '🔬'
    };
    
    const titleMap = {
      'student': 'Student Dashboard AI',
      'teacher': 'Teacher Dashboard AI',
      'ats': 'Technical Support AI',
      'doctoral': 'Doctoral Research AI'
    };
    
    chatHeader.innerHTML = `
      <div class="chat-title">
        <div class="chat-title-icon">${iconMap[profileType]}</div>
        <div class="chat-title-text">${titleMap[profileType]}</div>
      </div>
      <div class="chat-buttons">
        <button class="back-btn" id="backBtn">←</button>
        <button class="close-chat" id="closeChat">×</button>
      </div>
    `;
    
    // Create chat messages area
    const chatMessages = document.createElement('div');
    chatMessages.className = 'chat-messages';
    chatMessages.innerHTML = `
      <div class="message bot">
        <div class="message-avatar">${iconMap[profileType]}</div>
        <div class="message-content">
          Hello! I'm your ${titleMap[profileType]} assistant. How can I help you customize your dashboard? Say "show layout" to see your current dashboard cards.
        </div>
      </div>
    `;
    
    // Create chat input area
    const chatInput = document.createElement('div');
    chatInput.className = 'chat-input';
    chatInput.innerHTML = `
      <input type="text" class="input-field" id="messageInput" placeholder="Type your message..." autocomplete="off">
      <button class="send-btn" id="sendMessage">→</button>
    `;
    
    // Append all elements to the chatbot section
    chatbotSection.appendChild(chatHeader);
    chatbotSection.appendChild(chatMessages);
    chatbotSection.appendChild(chatInput);
    
    // Add event listeners
    document.getElementById('backBtn').addEventListener('click', function() {
      // Go back to profile selection
      profilesFullscreen.classList.remove('hidden');
      dashboard.classList.remove('active');
      header.classList.remove('compact');
      chatbotSection.classList.remove('active');
    });
    
    document.getElementById('closeChat').addEventListener('click', function() {
      // Close the chat
      profilesFullscreen.classList.remove('hidden');
      dashboard.classList.remove('active');
      header.classList.remove('compact');
      chatbotSection.classList.remove('active');
    });
    
    document.getElementById('sendMessage').addEventListener('click', sendMessage);
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
  
  function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (!message) return;
    
    const chatMessages = document.querySelector('.chat-messages');
    const iconMap = {
      'student': '🎓',
      'teacher': '👨‍🏫',
      'ats': '⚙️',
      'doctoral': '🔬'
    };
    
    // Add user message to chat
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user';
    userMessageDiv.innerHTML = `
      <div class="message-avatar">👤</div>
      <div class="message-content">${message}</div>
    `;
    chatMessages.appendChild(userMessageDiv);
    
    // Clear input
    messageInput.value = '';
    
    // Show loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot';
    loadingDiv.innerHTML = `
      <div class="message-avatar">${iconMap[currentProfile]}</div>
      <div class="message-content">
        <div class="loading">
          Thinking<span class="loading-dots"></span>
        </div>
      </div>
    `;
    chatMessages.appendChild(loadingDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Handle local commands for demonstration
    if (message.toLowerCase() === 'show layout') {
      processLocalCommand(message, loadingDiv, chatMessages, iconMap);
      return;
    }
    
    // Get current layout before sending to backend
    const currentLayout = getCurrentLayout(currentProfile);
    
    // Send request to backend
    fetch('http://localhost:5000/admin-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        profile: currentProfile,
        current_layout: currentLayout
      })
    })
    .then(response => response.json())
    .then(data => {
      // Remove loading indicator
      chatMessages.removeChild(loadingDiv);
      
      // Process the response and update the layout if needed
      processResponse(data, chatMessages, iconMap);
    })
    .catch(error => {
      console.error('Error:', error);
      
      // If server is not running, handle commands locally
      processLocalCommand(message, loadingDiv, chatMessages, iconMap);
    });
  }
  
  function processLocalCommand(message, loadingDiv, chatMessages, iconMap) {
    const currentLayout = getCurrentLayout(currentProfile);
    const msgLower = message.toLowerCase();
    let responseText = '';
    
    // Remove loading indicator
    chatMessages.removeChild(loadingDiv);
    
    // Simple command processing
    if (msgLower === 'show layout') {
      if (currentLayout.cards.length === 0) {
        responseText = `Your ${currentProfile} dashboard is currently empty. You can add cards using commands like 'Add new [card name]'.`;
      } else {
        let cardList = currentLayout.cards
          .filter(card => card.visible)
          .map((card, i) => {
            const colorInfo = card.color ? ` (Color: ${card.color})` : '';
            return `${i + 1}. ${card.title}${colorInfo}`;
          })
          .join('\n');
        
        responseText = `Current ${currentProfile} Dashboard Layout:\n\n${cardList}\n\nTotal: ${currentLayout.cards.filter(card => card.visible).length} cards`;
      }
    } else if (msgLower.startsWith('add ')) {
      const cardName = message.substring(4).trim();
      const newCard = {
        id: cardName.toLowerCase().replace(/\s+/g, '-'),
        title: cardName,
        icon: 'fas fa-cube',
        color: null,
        visible: true
      };
      
      currentLayout.cards.push(newCard);
      saveLayout(currentProfile, currentLayout);
      
      // Update the dashboard HTML if it exists
      updateDashboardHTML(currentProfile, currentLayout);
      
      responseText = `Adding '${cardName}' card to your ${currentProfile} dashboard.`;
    } else if (msgLower.match(/^(delete|remove)\s+/)) {
      const cardName = message.replace(/^(delete|remove)\s+/, '').trim();
      const cardIndex = currentLayout.cards.findIndex(
        card => card.title.toLowerCase() === cardName.toLowerCase()
      );
      
      if (cardIndex >= 0) {
        const removedCard = currentLayout.cards.splice(cardIndex, 1)[0];
        currentLayout.deletedCards.push(removedCard);
        saveLayout(currentProfile, currentLayout);
        
        // Update the dashboard HTML if it exists
        updateDashboardHTML(currentProfile, currentLayout);
        
        responseText = `Removing '${cardName}' from your ${currentProfile} dashboard.`;
      } else {
        responseText = `I couldn't find '${cardName}' in your ${currentProfile} dashboard. Use 'show layout' to see available cards.`;
      }
    } else if (msgLower.match(/^swap\s+.+\s+and\s+.+$/)) {
      const [, item1, item2] = msgLower.match(/^swap\s+(.+?)\s+and\s+(.+)$/);
      
      const index1 = currentLayout.cards.findIndex(
        card => card.title.toLowerCase() === item1.trim()
      );
      
      const index2 = currentLayout.cards.findIndex(
        card => card.title.toLowerCase() === item2.trim()
      );
      
      if (index1 >= 0 && index2 >= 0) {
        // Swap the positions
        [currentLayout.cards[index1], currentLayout.cards[index2]] = 
          [currentLayout.cards[index2], currentLayout.cards[index1]];
        
        saveLayout(currentProfile, currentLayout);
        
        // Update the dashboard HTML if it exists
        updateDashboardHTML(currentProfile, currentLayout);
        
        responseText = `Swapping positions of '${item1.trim()}' and '${item2.trim()}' in your ${currentProfile} dashboard.`;
      } else {
        const missing = [];
        if (index1 < 0) missing.push(item1.trim());
        if (index2 < 0) missing.push(item2.trim());
        
        responseText = `I couldn't find ${missing.join(' and ')} in your ${currentProfile} dashboard. Use 'show layout' to see available cards.`;
      }
    } else {
      responseText = `I'm sorry, but I don't understand that command. Try "show layout", "add [card name]", "remove [card name]", or "swap [card1] and [card2]".`;
    }
    
    // Add bot response
    const botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'message bot';
    botMessageDiv.innerHTML = `
      <div class="message-avatar">${iconMap[currentProfile]}</div>
      <div class="message-content">${responseText}</div>
    `;
    chatMessages.appendChild(botMessageDiv);
    
    // Scroll to bottom again
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  function processResponse(data, chatMessages, iconMap) {
    // Add bot response
    const botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'message bot';
    botMessageDiv.innerHTML = `
      <div class="message-avatar">${iconMap[currentProfile]}</div>
      <div class="message-content">${data.message}</div>
    `;
    chatMessages.appendChild(botMessageDiv);
    
    // Process the action if provided
    if (data.action) {
      const currentLayout = getCurrentLayout(currentProfile);
      
      switch (data.action) {
        case 'add_element':
          // Add new element to the layout
          const newCard = {
            id: data.element.toLowerCase().replace(/\s+/g, '-'),
            title: data.element,
            icon: data.icon || 'fas fa-cube',
            color: null,
            visible: true
          };
          
          currentLayout.cards.push(newCard);
          saveLayout(currentProfile, currentLayout);
          
          // Update dashboard if it exists
          updateDashboardHTML(currentProfile, currentLayout);
          break;
          
        case 'delete_element':
          // Remove element from layout
          const cardIndex = currentLayout.cards.findIndex(
            card => card.title.toLowerCase() === data.element.toLowerCase()
          );
          
          if (cardIndex >= 0) {
            const removedCard = currentLayout.cards.splice(cardIndex, 1)[0];
            currentLayout.deletedCards.push(removedCard);
            saveLayout(currentProfile, currentLayout);
            
            // Update dashboard if it exists
            updateDashboardHTML(currentProfile, currentLayout);
          }
          break;
          
        case 'swap_elements':
          // Swap elements in layout
          const index1 = currentLayout.cards.findIndex(
            card => card.title.toLowerCase() === data.elements[0].toLowerCase()
          );
          
          const index2 = currentLayout.cards.findIndex(
            card => card.title.toLowerCase() === data.elements[1].toLowerCase()
          );
          
          if (index1 >= 0 && index2 >= 0) {
            // Swap the positions
            [currentLayout.cards[index1], currentLayout.cards[index2]] = 
              [currentLayout.cards[index2], currentLayout.cards[index1]];
            
            saveLayout(currentProfile, currentLayout);
            
            // Update dashboard if it exists
            updateDashboardHTML(currentProfile, currentLayout);
          }
          break;
          
        case 'change_color':
          // Change color of element
          const cardToColorIndex = currentLayout.cards.findIndex(
            card => card.title.toLowerCase() === data.element.toLowerCase()
          );
          
          if (cardToColorIndex >= 0) {
            currentLayout.cards[cardToColorIndex].color = data.color;
            saveLayout(currentProfile, currentLayout);
            
            // Update dashboard if it exists
            updateDashboardHTML(currentProfile, currentLayout);
          }
          break;
          
        case 'reset_layout':
          // Reset layout to default
          currentLayout.cards = defaultLayouts[currentProfile] || [];
          currentLayout.deletedCards = [];
          saveLayout(currentProfile, currentLayout);
          
          // Update dashboard if it exists
          updateDashboardHTML(currentProfile, currentLayout);
          break;
      }
    }
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
  
  // Function to update the actual dashboard HTML
  function updateDashboardHTML(profile, layout) {
    // We'll send a message to any open dashboards via localStorage
    localStorage.setItem('dashboard_update_trigger', JSON.stringify({
      profile: profile,
      timestamp: new Date().getTime(),
      layout: layout
    }));
    
    // This would be picked up by any open dashboard pages that are listening for changes
    // We'll implement this listener in a separate script for the dashboard pages
  }
  
  // Initialize the layouts if they don't exist in localStorage
  for (const profile in defaultLayouts) {
    if (!localStorage.getItem(`${profile}_layout`)) {
      saveLayout(profile, {
        cards: defaultLayouts[profile],
        deletedCards: []
      });
    }
  }
  
  // Log to verify script is loaded
  console.log('Profile navigation and dashboard management initialized!');
}); 