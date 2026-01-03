// Check if user is logged in
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('mochand_logged_in');
    
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
    
    // Load user data
    const userData = JSON.parse(localStorage.getItem('mochand_user') || '{}');
    if (userData.name) {
        document.querySelector('.user-name').textContent = userData.name;
    }
    if (userData.email) {
        document.querySelector('.user-email').textContent = userData.email;
        document.querySelector('.user-avatar').textContent = userData.name ? userData.name[0].toUpperCase() : 'U';
    }
    
    // Load conversations
    loadConversations();
});

// Logout functionality
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('mochand_logged_in');
        localStorage.removeItem('mochand_user');
        showNotification('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Sample conversations data
const conversationsData = [
    {
        id: 1,
        name: 'John Smith',
        phone: '+1 234 567 8901',
        avatar: 'J',
        lastMessage: 'Thanks for the quick response!',
        time: '2 min ago',
        unread: 2,
        status: 'online',
        messages: [
            { id: 1, text: 'Hi! I need help with my order', type: 'received', time: '10:30 AM' },
            { id: 2, text: 'Of course! What\'s your order number?', type: 'sent', time: '10:31 AM' },
            { id: 3, text: 'It\'s #12345', type: 'received', time: '10:32 AM' },
            { id: 4, text: 'Let me check that for you', type: 'sent', time: '10:33 AM' },
            { id: 5, text: 'Your order is on its way! Expected delivery tomorrow.', type: 'sent', time: '10:34 AM' },
            { id: 6, text: 'Thanks for the quick response!', type: 'received', time: '10:35 AM' }
        ]
    },
    {
        id: 2,
        name: 'Sarah Johnson',
        phone: '+1 234 567 8902',
        avatar: 'S',
        lastMessage: 'Can I get a discount code?',
        time: '15 min ago',
        unread: 0,
        status: 'offline',
        messages: [
            { id: 1, text: 'Hello! I\'m interested in your products', type: 'received', time: '9:45 AM' },
            { id: 2, text: 'Great! What are you looking for?', type: 'sent', time: '9:46 AM' },
            { id: 3, text: 'Can I get a discount code?', type: 'received', time: '9:50 AM' }
        ]
    },
    {
        id: 3,
        name: 'Michael Brown',
        phone: '+1 234 567 8903',
        avatar: 'M',
        lastMessage: 'When will my order arrive?',
        time: '1 hour ago',
        unread: 1,
        status: 'online',
        messages: [
            { id: 1, text: 'When will my order arrive?', type: 'received', time: '8:30 AM' }
        ]
    },
    {
        id: 4,
        name: 'Emily Davis',
        phone: '+1 234 567 8904',
        avatar: 'E',
        lastMessage: 'Perfect! Thank you so much',
        time: '3 hours ago',
        unread: 0,
        status: 'offline',
        messages: [
            { id: 1, text: 'I have a question about sizes', type: 'received', time: 'Yesterday' },
            { id: 2, text: 'Sure! What would you like to know?', type: 'sent', time: 'Yesterday' },
            { id: 3, text: 'Do you have size M in stock?', type: 'received', time: 'Yesterday' },
            { id: 4, text: 'Yes, we have size M available!', type: 'sent', time: 'Yesterday' },
            { id: 5, text: 'Perfect! Thank you so much', type: 'received', time: 'Yesterday' }
        ]
    },
    {
        id: 5,
        name: 'David Wilson',
        phone: '+1 234 567 8905',
        avatar: 'D',
        lastMessage: 'Is this still available?',
        time: 'Yesterday',
        unread: 0,
        status: 'offline',
        messages: [
            { id: 1, text: 'Is this still available?', type: 'received', time: 'Yesterday' }
        ]
    }
];

let currentConversation = null;

// Load conversations
function loadConversations() {
    const conversationsList = document.getElementById('conversationsList');
    
    // Simulate loading delay
    setTimeout(() => {
        conversationsList.innerHTML = '';
        
        conversationsData.forEach(conv => {
            const convElement = createConversationElement(conv);
            conversationsList.appendChild(convElement);
        });
    }, 1000);
}

// Create conversation element
function createConversationElement(conv) {
    const div = document.createElement('div');
    div.className = `conversation-item ${conv.unread > 0 ? 'unread' : ''}`;
    div.onclick = () => openConversation(conv);
    
    div.innerHTML = `
        <div class="conversation-avatar">${conv.avatar}</div>
        <div class="conversation-content">
            <div class="conversation-header">
                <span class="conversation-name">${conv.name}</span>
                <span class="conversation-time">${conv.time}</span>
            </div>
            <div class="conversation-message">${conv.lastMessage}</div>
        </div>
        ${conv.unread > 0 ? `<span class="unread-badge">${conv.unread}</span>` : ''}
    `;
    
    return div;
}

// Open conversation
function openConversation(conv) {
    currentConversation = conv;
    
    // Update active state
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Hide empty state
    document.querySelector('.chat-empty-state').style.display = 'none';
    document.querySelector('.active-chat').style.display = 'flex';
    
    // Update chat header
    document.querySelector('.contact-avatar').textContent = conv.avatar;
    document.querySelector('.contact-name').textContent = conv.name;
    document.querySelector('.contact-status').textContent = conv.status === 'online' ? 'Online' : 'Offline';
    
    // Load messages
    loadMessages(conv.messages);
    
    // Mark as read
    if (conv.unread > 0) {
        conv.unread = 0;
        event.currentTarget.classList.remove('unread');
        const badge = event.currentTarget.querySelector('.unread-badge');
        if (badge) badge.remove();
    }
}

// Load messages
function loadMessages(messages) {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    
    let lastDate = null;
    
    messages.forEach((msg, index) => {
        // Add date separator if needed
        const msgDate = msg.time.includes('Yesterday') ? 'Yesterday' : 'Today';
        if (msgDate !== lastDate) {
            const dateSeparator = document.createElement('div');
            dateSeparator.className = 'message-date-separator';
            dateSeparator.textContent = msgDate;
            chatMessages.appendChild(dateSeparator);
            lastDate = msgDate;
        }
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${msg.type}`;
        messageElement.innerHTML = `
            <div class="message-bubble">
                <div class="message-text">${msg.text}</div>
                <span class="message-time">${msg.time}</span>
            </div>
        `;
        chatMessages.appendChild(messageElement);
    });
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
}

if (messageInput) {
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function sendMessage() {
    if (!currentConversation) {
        showNotification('Please select a conversation first', 'warning');
        return;
    }
    
    const text = messageInput.value.trim();
    if (!text) return;
    
    const newMessage = {
        id: currentConversation.messages.length + 1,
        text: text,
        type: 'sent',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };
    
    currentConversation.messages.push(newMessage);
    currentConversation.lastMessage = text;
    
    // Add message to chat
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message sent';
    messageElement.innerHTML = `
        <div class="message-bubble">
            <div class="message-text">${text}</div>
            <span class="message-time">${newMessage.time}</span>
        </div>
    `;
    chatMessages.appendChild(messageElement);
    
    // Clear input
    messageInput.value = '';
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate bot response after 2 seconds
    setTimeout(() => {
        const botResponse = {
            id: currentConversation.messages.length + 1,
            text: 'Thanks for your message! Our team will get back to you shortly.',
            type: 'received',
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        };
        
        currentConversation.messages.push(botResponse);
        
        const botMessageElement = document.createElement('div');
        botMessageElement.className = 'message received';
        botMessageElement.innerHTML = `
            <div class="message-bubble">
                <div class="message-text">${botResponse.text}</div>
                <span class="message-time">${botResponse.time}</span>
            </div>
        `;
        chatMessages.appendChild(botMessageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 2000);
}

// Search conversations
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const items = document.querySelectorAll('.conversation-item');
        
        items.forEach(item => {
            const name = item.querySelector('.conversation-name').textContent.toLowerCase();
            const message = item.querySelector('.conversation-message').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || message.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Filter conversations
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        filterConversations(filter);
    });
});

function filterConversations(filter) {
    const items = document.querySelectorAll('.conversation-item');
    
    items.forEach(item => {
        switch(filter) {
            case 'all':
                item.style.display = 'flex';
                break;
            case 'unread':
                item.style.display = item.classList.contains('unread') ? 'flex' : 'none';
                break;
            case 'active':
                // Show conversations from today
                const time = item.querySelector('.conversation-time').textContent;
                item.style.display = !time.includes('Yesterday') ? 'flex' : 'none';
                break;
            case 'archived':
                // For demo, hide all
                item.style.display = 'none';
                break;
        }
    });
    
    showNotification(`Showing ${filter} conversations`, 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#6366f1',
        warning: '#f59e0b'
    };
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        borderRadius: '0.5rem',
        background: colors[type],
        color: 'white',
        fontWeight: '600',
        fontSize: '0.95rem',
        zIndex: '99999',
        animation: 'slideInRight 0.3s ease-out',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Mobile sidebar toggle
const createMobileMenuToggle = () => {
    if (window.innerWidth <= 768) {
        const existingToggle = document.querySelector('.mobile-menu-btn');
        
        if (!existingToggle) {
            const menuBtn = document.createElement('button');
            menuBtn.className = 'mobile-menu-btn';
            menuBtn.innerHTML = '☰';
            menuBtn.style.cssText = `
                position: fixed;
                top: 1rem;
                left: 1rem;
                z-index: 1000;
                width: 40px;
                height: 40px;
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 0.5rem;
                font-size: 1.5rem;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            `;
            
            menuBtn.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('active');
            });
            
            document.body.appendChild(menuBtn);
            
            // Close sidebar when clicking outside
            document.addEventListener('click', (e) => {
                const sidebar = document.querySelector('.sidebar');
                const menuBtn = document.querySelector('.mobile-menu-btn');
                if (sidebar.classList.contains('active') && 
                    !sidebar.contains(e.target) && 
                    !menuBtn.contains(e.target)) {
                    sidebar.classList.remove('active');
                }
            });
        }
    }
};

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize
createMobileMenuToggle();
window.addEventListener('resize', createMobileMenuToggle);

console.log('💬 Mochan-D Conversations loaded successfully!');

