/**
 * QuickQR - Modern QR Code Generator
 * A premium web application for generating, downloading, and managing QR codes
 * Built with HTML5, CSS3, and Vanilla JavaScript
 * 
 * Features:
 * - URL validation and QR code generation
 * - Dark/Light mode toggle
 * - History management with localStorage
 * - Download QR codes as PNG
 * - Responsive glassmorphism design
 * - Loading animations and smooth transitions
 */

// ============================================
// DOM Elements
// ============================================

const urlInput = document.getElementById('urlInput');
const generateBtn = document.getElementById('generateBtn');
const clearBtn = document.getElementById('clearBtn');
const downloadBtn = document.getElementById('downloadBtn');
const copyUrlBtn = document.getElementById('copyUrlBtn');
const sizeSelect = document.getElementById('sizeSelect');
const themeToggle = document.getElementById('themeToggle');
const qrSection = document.getElementById('qrSection');
const qrContainer = document.getElementById('qrContainer');
const errorMessage = document.getElementById('errorMessage');
const urlDisplay = document.getElementById('urlDisplay');
const loading = document.getElementById('loading');
const historySection = document.getElementById('historySection');
const historyList = document.getElementById('historyList');

// ============================================
// State Management
// ============================================

let currentQRUrl = '';
let currentQRSize = 300;
let qrCodeInstance = null;
const MAX_HISTORY = 5;
const STORAGE_KEY = 'quickqr_history';
const THEME_KEY = 'quickqr_theme';

// ============================================
// Initialization
// ============================================

/**
 * Initialize the application
 * - Set up event listeners
 * - Load saved theme
 * - Load history from localStorage
 */
function init() {
    // Event Listeners
    generateBtn.addEventListener('click', handleGenerateQR);
    clearBtn.addEventListener('click', handleClear);
    downloadBtn.addEventListener('click', handleDownload);
    copyUrlBtn.addEventListener('click', handleCopyURL);
    sizeSelect.addEventListener('change', handleSizeChange);
    themeToggle.addEventListener('click', handleThemeToggle);
    urlInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleGenerateQR();
        }
    });

    // Load Theme
    loadTheme();

    // Load History
    loadHistory();

    // Focus input field
    urlInput.focus();
}

// ============================================
// URL Validation
// ============================================

/**
 * Validate if the input is a valid URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid URL, false otherwise
 */
function isValidURL(url) {
    if (!url || url.trim() === '') {
        return false;
    }

    try {
        // Add protocol if missing
        const urlWithProtocol = url.startsWith('http://') || url.startsWith('https://')
            ? url
            : `https://${url}`;

        const urlObj = new URL(urlWithProtocol);
        // Validate that it has a proper domain
        return urlObj.hostname.includes('.');
    } catch (e) {
        return false;
    }
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 5000);
}

/**
 * Clear error message
 */
function clearError() {
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';
}

// ============================================
// QR Code Generation
// ============================================

/**
 * Generate QR code from URL
 * @param {string} url - The URL to encode in QR code
 */
function generateQRCode(url) {
    // Clear previous QR code
    qrContainer.innerHTML = '';

    // Normalize URL
    const normalizedURL = url.startsWith('http://') || url.startsWith('https://')
        ? url
        : `https://${url}`;

    try {
        // Generate new QR code
        qrCodeInstance = new QRCode(qrContainer, {
            text: normalizedURL,
            width: currentQRSize,
            height: currentQRSize,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });

        currentQRUrl = normalizedURL;
        urlDisplay.textContent = normalizedURL;

        // Show QR section
        qrSection.style.display = 'flex';
        hideLoading();

        // Show action buttons
        showActionButtons();

        // Add to history
        addToHistory(normalizedURL);

        // Clear error
        clearError();
    } catch (error) {
        console.error('Error generating QR code:', error);
        showError('Failed to generate QR code. Please try again.');
        hideLoading();
    }
}

/**
 * Handle Generate QR button click
 */
function handleGenerateQR() {
    const url = urlInput.value.trim();

    // Validate URL
    if (!isValidURL(url)) {
        showError('Please enter a valid website URL, for example example.com or https://example.com.');
        return;
    }

    // Show loading animation
    showLoading();

    // Generate QR code after short delay for animation effect
    setTimeout(() => {
        generateQRCode(url);
    }, 500);
}

/**
 * Handle Size Change
 */
function handleSizeChange() {
    currentQRSize = parseInt(sizeSelect.value, 10);

    // Regenerate QR code only when one already exists
    if (!currentQRUrl) {
        return;
    }

    qrContainer.innerHTML = '';
    generateQRCode(currentQRUrl);
}

// ============================================
// Download Functionality
// ============================================

/**
 * Download QR code as PNG
 */
function handleDownload() {
    try {
        const canvas = qrContainer.querySelector('canvas');

        if (!canvas) {
            showError('QR code not found. Please generate a QR code first.');
            return;
        }

        // Create a download link
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');

        // Generate filename with timestamp
        const timestamp = new Date().toISOString().slice(0, 10);
        link.download = `quickqr_${timestamp}.png`;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show success feedback
        showSuccess('QR code downloaded successfully!');
    } catch (error) {
        console.error('Error downloading QR code:', error);
        showError('Failed to download QR code. Please try again.');
    }
}

/**
 * Show success message
 * @param {string} message - Success message to display
 */
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message show';
    successDiv.textContent = message;

    errorMessage.parentElement.insertBefore(successDiv, errorMessage.nextSibling);

    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// ============================================
// Copy URL Functionality
// ============================================

/**
 * Copy URL to clipboard
 */
function handleCopyURL() {
    if (!currentQRUrl) {
        showError('No QR code generated yet.');
        return;
    }

    navigator.clipboard.writeText(currentQRUrl)
        .then(() => {
            showSuccess('URL copied to clipboard!');
        })
        .catch(() => {
            showError('Failed to copy URL.');
        });
}

// ============================================
// Clear Functionality
// ============================================

/**
 * Clear all data and reset the app
 */
function handleClear() {
    urlInput.value = '';
    qrSection.style.display = 'none';
    qrContainer.innerHTML = '';
    currentQRUrl = '';
    qrCodeInstance = null;
    clearError();
    hideActionButtons();
    urlInput.focus();
}

// ============================================
// UI Helper Functions
// ============================================

/**
 * Show loading animation
 */
function showLoading() {
    loading.style.display = 'flex';
    qrSection.style.display = 'none';
}

/**
 * Hide loading animation
 */
function hideLoading() {
    loading.style.display = 'none';
}

/**
 * Show action buttons
 */
function showActionButtons() {
    clearBtn.style.display = 'inline-flex';
    downloadBtn.style.display = 'inline-flex';
    copyUrlBtn.style.display = 'inline-flex';
    sizeSelect.style.display = 'block';
}

/**
 * Hide action buttons
 */
function hideActionButtons() {
    clearBtn.style.display = 'none';
    downloadBtn.style.display = 'none';
    copyUrlBtn.style.display = 'none';
    sizeSelect.style.display = 'none';
}

// ============================================
// Theme Toggle
// ============================================

/**
 * Handle theme toggle (dark/light mode)
 */
function handleThemeToggle() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem(THEME_KEY, isDarkMode ? 'dark' : 'light');
    updateThemeIcon(isDarkMode);
}

/**
 * Load saved theme
 */
function loadTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        updateThemeIcon(false);
    }
}

/**
 * Update theme icon
 * @param {boolean} isDarkMode - Is dark mode enabled
 */
function updateThemeIcon(isDarkMode) {
    const icon = themeToggle.querySelector('.theme-icon');
    icon.textContent = isDarkMode ? '☀️' : '🌙';
}

// ============================================
// History Management
// ============================================

/**
 * Add URL to history
 * @param {string} url - URL to add
 */
function addToHistory(url) {
    let history = getHistory();

    // Remove if already exists to avoid duplicates
    history = history.filter(item => item !== url);

    // Add to beginning
    history.unshift(url);

    // Keep only last 5
    history = history.slice(0, MAX_HISTORY);

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));

    // Update display
    updateHistoryDisplay();
}

/**
 * Get history from localStorage
 * @returns {array} - Array of URLs in history
 */
function getHistory() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

/**
 * Update history display
 */
function updateHistoryDisplay() {
    const history = getHistory();

    if (history.length === 0) {
        historySection.style.display = 'none';
        return;
    }

    historySection.style.display = 'block';
    historyList.innerHTML = '';

    history.forEach((url, index) => {
        const li = document.createElement('li');
        li.className = 'history-item';
        li.textContent = url;
        li.title = url;

        li.addEventListener('click', () => {
            urlInput.value = url;
            handleGenerateQR();
        });

        historyList.appendChild(li);
    });
}

/**
 * Load history on app initialization
 */
function loadHistory() {
    updateHistoryDisplay();
}

// ============================================
// Run Initialization
// ============================================

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
