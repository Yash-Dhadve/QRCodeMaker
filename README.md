# QuickQR - QR Code Generator

A modern, responsive web application for generating QR codes from website URLs. Built with HTML5, CSS3, and Vanilla JavaScript using the glassmorphism design pattern.

## 🚀 Features

### Core Functionality
- ✅ **URL Input Validation** - Validates URLs before generating QR codes
- ✅ **Instant QR Generation** - Generate QR codes instantly with loading animation
- ✅ **Download as PNG** - Save generated QR codes to your device
- ✅ **Copy URL** - Copy the encoded URL to clipboard
- ✅ **Clear Function** - Reset the application with one click
- ✅ **Enter Key Support** - Press Enter to generate QR code

### Advanced Features
- 🎨 **Dark/Light Mode Toggle** - Switch between light and dark themes
- 📊 **QR Size Selector** - Choose from 200px, 300px, or 400px sizes
- 📜 **History Management** - Last 5 generated URLs stored in localStorage
- 🎯 **Click History to Regenerate** - Regenerate QR codes from history
- ⚡ **Loading Animation** - Smooth loading feedback

### Design Features
- 💎 **Glassmorphism UI** - Premium frosted glass effect with backdrop blur
- 🎨 **Gradient Background** - Beautiful purple-to-pink gradient
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ✨ **Smooth Animations** - Polished transitions and hover effects
- ♿ **Accessibility** - Semantic HTML and keyboard navigation support

## 📁 Project Structure

```
QRCodeMaker/
├── index.html      # HTML structure with semantic markup
├── style.css       # Glassmorphism design and responsive styling
├── script.js       # Pure JavaScript functionality
└── README.md       # This file
```

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Glassmorphism, gradients, animations
- **Vanilla JavaScript** - No frameworks, pure JS
- **QRCode.js** - QR code generation library (CDN)

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required!

### Installation

1. **Clone or Download**
   ```bash
   # Option 1: Clone the repository
   git clone https://github.com/yash/quickqr.git
   cd quickqr
   
   # Option 2: Download as ZIP and extract
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (http-server)
   npx http-server
   ```

3. **Access the Application**
   - Local: `http://localhost:8000`
   - Or open `index.html` directly in your browser

## 📖 Usage

### Generate QR Code
1. Enter a URL in the input field
2. Click "Generate QR" or press Enter
3. View your generated QR code

### Download QR Code
1. Generate a QR code
2. Click the "⬇️ Download" button
3. QR code saves as PNG to your downloads folder

### Change QR Size
1. Generate a QR code
2. Select desired size from the "Size" dropdown
3. QR code updates instantly

### Use History
1. Generate QR codes
2. Your last 5 URLs appear in the history section
3. Click any URL to regenerate that QR code

### Toggle Theme
- Click the moon/sun icon in the header
- Switch between dark and light modes
- Your preference is saved automatically

## 🎨 Design Details

### Glassmorphism Elements
- Frosted glass card with `backdrop-filter: blur(20px)`
- Semi-transparent backgrounds with RGBA colors
- Layered shadows for depth
- Gradient borders and accents

### Color Scheme
**Light Mode:**
- Primary: Purple (#667eea) to Pink (#764ba2)
- Background: White overlay on gradient
- Text: Dark gray (#1a1a2e)

**Dark Mode:**
- Primary: Same gradient
- Background: Dark navy (#1a1a2e) to darker (#16213e)
- Text: Light gray (#e0e0e0)

### Responsive Breakpoints
- Desktop: Full layout (500px max-width card)
- Tablet: Optimized spacing
- Mobile: Stacked buttons, adjusted font sizes
- Extra Small (<400px): Minimal padding, condensed layout

## 🔐 Data Privacy

- All processing happens **locally in your browser**
- No server communication
- No data tracking or analytics
- History stored only in your browser's localStorage
- Your URLs never leave your device

## 🧹 Code Quality

### Features
- ✅ Clean, modular JavaScript
- ✅ Comprehensive comments
- ✅ Semantic HTML5
- ✅ Production-ready CSS
- ✅ No external dependencies (except QRCode.js library)

### JavaScript Organization
- DOM element management
- State management
- Event handling
- Utility functions
- Theme management
- History management

### Performance Optimizations
- Minimal DOM manipulation
- Efficient event delegation
- CSS animations (GPU accelerated)
- Optimized re-renders
- Lazy loading of QRCode.js library

## 🎯 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome  | 90+     | ✅ Supported |
| Firefox | 88+     | ✅ Supported |
| Safari  | 14+     | ✅ Supported |
| Edge    | 90+     | ✅ Supported |
| IE      | 11      | ❌ Not Supported |

## 🐛 Troubleshooting

### QR Code Not Generating
- Ensure you've entered a valid URL
- Check if QRCode.js library loaded (check console)
- Clear browser cache and reload

### Download Not Working
- Check browser download settings
- Ensure popups aren't blocked
- Try a different browser

### Theme Not Saving
- Check if localStorage is enabled
- Clear browser cache
- Disable browser extensions that block storage

## 📊 Browser Compatibility

### Required APIs
- localStorage API
- Canvas API
- Clipboard API
- CSS Grid & Flexbox
- CSS Backdrop Filter

### Polyfills Needed
- IE11 requires polyfills for modern CSS features
- Clipboard API fallback recommended for older browsers

## 🚀 Future Enhancements

Potential features for future versions:
- [ ] Text input QR code generation
- [ ] Batch QR code generation
- [ ] Custom color selection
- [ ] QR code templates/designs
- [ ] WiFi QR code generator
- [ ] Social media URL shortening
- [ ] Export as SVG, PDF
- [ ] Mobile app version
- [ ] PWA functionality
- [ ] Multiple language support

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Yash** - Built QuickQR with passion for creating beautiful, functional web applications.

### Portfolio & Social
- 🌐 Portfolio: [Your Website]
- 💼 LinkedIn: [Your LinkedIn]
- 🐙 GitHub: [Your GitHub]
- 🐦 Twitter: [@YourHandle]

## 🙏 Credits

- **QRCode.js** - For the QR code generation library
- **Google Fonts** - For system font stack
- **Inspiration** - Modern web design best practices

## 📧 Contact & Support

Have questions or suggestions? Feel free to reach out!
- Email: [Your Email]
- Issues: Report bugs on GitHub
- Discussions: Start a discussion for feature requests

---

**Made with ❤️ by Yash**

Scan. Share. Connect. 🔗
