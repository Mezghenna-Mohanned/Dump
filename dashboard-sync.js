/**
 * Dashboard Sync - Updates dashboard when changes are made via the chat interface
 * Add this script to dashboard pages (ETUDIANT/test.html, prof/html.html, etc.)
 */

document.addEventListener('DOMContentLoaded', function() {
  // Determine which profile this page belongs to
  const currentProfile = getCurrentProfile();
  if (!currentProfile) return;
  
  console.log(`Dashboard sync initialized for ${currentProfile} profile`);
  
  // Load existing layout
  const layout = getCurrentLayout(currentProfile);
  
  // Apply initial layout if needed
  applyLayoutToDashboard(layout);
  
  // Listen for changes in localStorage
  window.addEventListener('storage', function(e) {
    if (e.key === 'dashboard_update_trigger') {
      try {
        const data = JSON.parse(e.newValue);
        
        // Only apply if this is for the current profile
        if (data.profile === currentProfile) {
          console.log('Received dashboard update:', data);
          applyLayoutToDashboard(data.layout);
        }
      } catch (error) {
        console.error('Error processing dashboard update:', error);
      }
    }
  });
  
  // Helper functions
  function getCurrentProfile() {
    const path = window.location.pathname.toLowerCase();
    
    if (path.includes('/etudiant/')) {
      return 'student';
    } else if (path.includes('/prof/')) {
      return 'teacher';
    } else if (path.includes('/ats/')) {
      return 'ats';
    } else if (path.includes('/doctorant/')) {
      return 'doctoral';
    }
    
    return null;
  }
  
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
    
    return { cards: [], deletedCards: [] };
  }
  
  function applyLayoutToDashboard(layout) {
    if (!layout || !layout.cards) return;
    
    // This function would update the DOM based on the dashboard's structure
    // The implementation will vary based on the HTML structure of each dashboard
    
    console.log('Applying layout to dashboard:', layout);
    
    // Example implementation for a card-based dashboard
    // Get the container where cards are displayed
    const cardContainer = document.querySelector('.dashboard-cards') || 
                          document.querySelector('.cards-container') ||
                          document.querySelector('.main-content');
    
    if (!cardContainer) {
      console.warn('Could not find card container in the dashboard');
      return;
    }
    
    // Save existing cards for reference
    const existingCards = Array.from(cardContainer.children);
    
    // Clear the container
    cardContainer.innerHTML = '';
    
    // Add cards in the order from the layout
    layout.cards.forEach(card => {
      if (!card.visible) return;
      
      // Try to find an existing card with this title/id to preserve its content
      const existingCard = existingCards.find(el => {
        return el.getAttribute('data-card-id') === card.id || 
               el.querySelector('.card-title')?.textContent.trim() === card.title;
      });
      
      if (existingCard) {
        // Apply any styling changes based on card.color
        if (card.color) {
          existingCard.style.backgroundColor = card.color;
          existingCard.classList.add('custom-colored');
        } else {
          existingCard.style.backgroundColor = '';
          existingCard.classList.remove('custom-colored');
        }
        
        // Add the card back to the container
        cardContainer.appendChild(existingCard);
      } else {
        // Create a new card
        const newCard = createNewCard(card);
        cardContainer.appendChild(newCard);
      }
    });
  }
  
  function createNewCard(card) {
    // Create a new card element based on your dashboard's HTML structure
    // This is a simplified example - adjust to match your actual HTML structure
    const cardElement = document.createElement('div');
    cardElement.className = 'card-item';
    cardElement.setAttribute('data-card-id', card.id);
    
    if (card.color) {
      cardElement.style.backgroundColor = card.color;
      cardElement.classList.add('custom-colored');
    }
    
    const iconClass = card.icon || 'fas fa-cube';
    
    cardElement.innerHTML = `
      <div class="card-icon">
        <i class="${iconClass}"></i>
      </div>
      <div class="card-title">${card.title}</div>
    `;
    
    return cardElement;
  }
}); 