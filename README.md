# Mochan-D - Modern AI Landing Page

A stunning, modern landing page for an AI-powered business automation platform. Built with pure HTML, CSS, and JavaScript - no frameworks required.

## 🚀 Features

- **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- **Modern Design** - Clean, professional design with smooth animations
- **Smooth Scrolling** - Seamless navigation between sections
- **Animated Elements** - Fade-in animations on scroll for engaging user experience
- **Interactive Components** - Hover effects, animated counters, and dynamic gradients
- **Performance Optimized** - Fast loading with minimal dependencies

## 📋 Pages Included

### Main Landing Page (index.html)
1. **Navigation Bar** - Sticky header with smooth scroll navigation
2. **Hero Section** - Eye-catching hero with animated gradient text and stats
3. **Value Propositions** - Three key value propositions with hover effects
4. **Features** - Why choose this platform (Intelligent, Fast, Secure)
5. **Industries** - Six industry applications showcased
6. **AI Solutions** - Three chatbot offerings (Sales, Marketing, Support)
7. **Integrations** - Payment gateways and messaging platform integrations
8. **Pricing** - Three-tier pricing structure with featured plan
9. **Call to Action** - Demo and chat options with benefits
10. **Footer** - Complete footer with links and branding

### Login Page (login.html)
- Beautiful gradient background with animations
- Social login options (Google, Apple, Facebook, LinkedIn)
- Email/password authentication form
- Password visibility toggle
- Form validation with notifications
- Responsive design
- Link to signup page

### Signup Page (signup.html)
- Matching design with login page
- Social signup options
- Full name, email, and password fields
- Password strength indicator
- Confirm password validation
- Terms of Service checkbox
- Real-time validation
- Link back to login page

### Dashboard Page (dashboard.html) 🎯
- **Protected Route** - Requires authentication
- **Sidebar Navigation** - Analytics, Conversations, Campaigns, Bots, Products, Contacts, Settings
- **Analytics Overview:**
  - Total Revenue with monthly trends
  - Campaign Spend tracking
  - Average Order Value metrics
  - Messages Sent statistics
  - ROI calculations
  - Sales Converted with ROAS
- **Interactive Charts:**
  - Revenue & Performance line chart (Chart.js)
  - Message Status donut chart
  - Multiple view tabs (Overview, Campaigns, Products, Regions)
- **Message Details:**
  - Messages Sent/Delivered/Read/Clicked/Failed
- **Quick Actions:**
  - Create Campaign
  - Configure Bot
  - View Reports
  - Manage Contacts
- **User Profile & Logout**
- **Fully Responsive** with mobile sidebar
- **Real-time Data Animation**

### Conversations Page (chats.html) 💬
- **Protected Route** - Requires authentication
- **WhatsApp-Style Interface:**
  - Split-panel layout (conversations list + chat window)
  - Real-time message display
  - Message bubbles (sent/received)
  - Typing indicators ready
- **Conversations List:**
  - 5 sample conversations
  - Unread message badges
  - Last message preview
  - Time stamps
  - Online/Offline status
  - Search functionality
  - Filter tabs (All, Unread, Active, Archived)
- **Chat Window:**
  - Full conversation history
  - Date separators
  - Message timestamps
  - Send messages with Enter key
  - Emoji picker button
  - Attachment button
  - Auto-scroll to latest message
  - Simulated bot responses
- **Contact Information Panel:**
  - Contact details
  - Tags management
  - Notes section
  - Quick actions (Assign, Archive, Block)
- **Fully Responsive** - Mobile-optimized chat interface

## 🎨 Design Highlights

- **Color Scheme**: Purple, Cyan, and Pink gradient theme
- **Typography**: Inter font family for modern, clean look
- **Animations**: Smooth transitions, fade-ins, and hover effects
- **Icons**: Emoji icons for visual appeal (can be replaced with Font Awesome or custom SVGs)

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern CSS with CSS Grid, Flexbox, and animations
- **Vanilla JavaScript** - No frameworks, pure JS for interactivity

## 🔗 Navigation Flow

```
index.html (Main Landing Page)
    ├─→ "Sign In" button → login.html
    ├─→ "Get Started" button → signup.html
    ├─→ "Experience Mochan-D" button → signup.html
    ├─→ All "Boost Sales", "Drive Engagement" buttons → signup.html
    ├─→ All pricing "Get Started" buttons → signup.html
    └─→ All CTA buttons → signup.html

login.html (Sign In Page)
    ├─→ Logo → index.html (back to homepage)
    ├─→ "Sign up" link → signup.html
    └─→ Successful login → dashboard.html ✅

signup.html (Registration Page)
    ├─→ Logo → index.html (back to homepage)
    ├─→ "Sign in" link → login.html
    └─→ Successful signup → dashboard.html ✅

dashboard.html (Analytics Dashboard) 🎯
    ├─→ Protected route (requires login)
    ├─→ Displays user analytics and metrics
    ├─→ Revenue charts and message statistics
    ├─→ Quick actions for campaigns, bots, reports
    ├─→ Link to Conversations → chats.html
    └─→ Logout → index.html

chats.html (Conversations Interface) 💬
    ├─→ Protected route (requires login)
    ├─→ WhatsApp-style chat interface
    ├─→ Conversations list with search and filters
    ├─→ Real-time messaging
    ├─→ Message history and status
    └─→ Back to Dashboard → dashboard.html
```

## 📦 File Structure

```
├── index.html          # Main landing page
├── login.html          # Login/Sign in page
├── signup.html         # Sign up/Registration page
├── dashboard.html      # Analytics dashboard (protected)
├── chats.html          # Conversations/Chat interface (protected)
├── styles.css          # Main page styling and animations
├── login.css           # Login/Signup page styling
├── dashboard.css       # Dashboard styling
├── chats.css           # Chats interface styling
├── script.js           # Main page JavaScript
├── login.js            # Login page functionality
├── signup.js           # Signup page functionality
├── dashboard.js        # Dashboard functionality and charts
├── chats.js            # Chat interface and messaging
└── README.md           # Documentation
```

## 🚀 Getting Started

1. **Download or Clone** the files to your local machine

2. **Open the website** - Simply open `index.html` in your web browser
   - Double-click `index.html`, or
   - Right-click and choose "Open with" your preferred browser

3. **For Development** - Use a local server for best results:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Access in browser**: Navigate to `http://localhost:8000`

## 🎯 Customization Guide

### Change Brand Name
Replace "Mochan-D" with your brand name in:
- `index.html` - Logo and title elements
- `index.html` - All section content references

### Modify Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;     /* Your primary color */
    --secondary-color: #06b6d4;   /* Your secondary color */
    --accent-color: #ec4899;      /* Your accent color */
}
```

### Update Content
- Edit text content directly in `index.html`
- Modify section titles, descriptions, and features
- Update pricing plans and statistics

### Add Your Logo
Replace emoji logo with image:
```html
<div class="logo">
    <img src="your-logo.png" alt="Your Brand">
</div>
```

### Change Icons
Replace emoji icons with Font Awesome:
```html
<!-- Add to <head> -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- Replace emoji -->
<div class="icon"><i class="fas fa-rocket"></i></div>
```

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎁 Easter Eggs

Try the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A

## 📄 License

This project is free to use for personal and commercial projects. Attribution appreciated but not required.

## 🤝 Contributing

Feel free to fork, modify, and use this template for your projects!

## 📞 Support

For questions or issues, please open an issue in the repository.

---

**Made with ❤️ for the AI community**

Enjoy your new landing page! 🚀

