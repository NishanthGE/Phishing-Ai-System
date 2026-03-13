# AI-Based Phishing Email and Malicious URL Detection System

## 🛡️ Advanced Cybersecurity Protection with Explainable AI

A comprehensive, enterprise-grade cybersecurity solution that uses advanced AI algorithms to detect phishing emails and malicious URLs with detailed, explainable alerts. Built with modern JavaScript technologies and professional software engineering practices.

---

## 🚀 Features

### 🎯 Core Detection Capabilities
- **Advanced Email Phishing Detection**: NLP-based analysis with sentiment analysis
- **Malicious URL Detection**: Comprehensive URL structure and pattern analysis
- **Explainable AI Alerts**: Detailed explanations of why content was flagged
- **Real-time Threat Scoring**: 0-100 threat assessment with visual representation
- **Batch Processing**: Analyze multiple emails or URLs simultaneously

### 🔍 AI-Powered Analysis
- **Feature Extraction**: 20+ sophisticated detection algorithms
- **Machine Learning Classification**: Weighted scoring system
- **Natural Language Processing**: Sentiment analysis and keyword detection
- **Pattern Recognition**: URL structure analysis and domain reputation
- **Risk Factor Identification**: Granular threat component analysis

### 💡 Explainable AI Features
- **Detailed Threat Breakdown**: Individual risk factor impact scores
- **Visual Threat Indicators**: Color-coded severity levels
- **Actionable Recommendations**: Clear guidance based on threat level
- **Content Highlighting**: Visual marking of suspicious elements
- **Confidence Scoring**: Analysis reliability assessment

---

## 🏗️ Professional Architecture

### Technology Stack
- **Backend**: Node.js + Express.js with enterprise security
- **Frontend**: Modern HTML5, CSS3, Vanilla JavaScript
- **AI/ML**: Natural Language Processing with JavaScript libraries
- **Visualization**: Chart.js for interactive threat scoring
- **Security**: Helmet, CORS, Rate limiting, Input validation

### Project Structure
```
phishing-ai-system/
├── src/
│   ├── backend/
│   │   ├── server.js              # Main Express server
│   │   ├── routes/
│   │   │   ├── emailRoutes.js     # Email analysis endpoints
│   │   │   └── urlRoutes.js       # URL analysis endpoints
│   │   ├── controllers/
│   │   │   ├── emailController.js # Email request handlers
│   │   │   └── urlController.js   # URL request handlers
│   │   ├── services/
│   │   │   ├── emailAnalyzer.js   # Email AI analysis engine
│   │   │   └── urlAnalyzer.js     # URL AI analysis engine
│   │   └── utils/
│   │       ├── featureExtractor.js # AI feature extraction
│   │       └── explainableAI.js   # Explanation generation
│   └── frontend/
│       ├── index.html             # Professional dashboard UI
│       ├── style.css              # Modern responsive design
│       └── script.js              # Advanced frontend logic
├── datasets/
│   ├── phishing_keywords.json     # Threat detection patterns
│   └── malicious_url_patterns.json # URL analysis rules
├── package.json                   # Dependencies and scripts
├── README.md                      # This documentation
└── .gitignore                     # Git ignore rules
```

---

## 🔧 Installation & Setup

### Prerequisites
- **Node.js** (v14.0.0 or higher)
- **npm** (Node Package Manager)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

1. **Clone/Download the Project**
   ```bash
   cd phishing-ai-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Server**
   ```bash
   npm start
   ```

4. **Access the Dashboard**
   Open your browser and navigate to: `http://localhost:3000`

### Development Mode
```bash
npm run dev  # Auto-restart on file changes (requires nodemon)
```

---

## 🎯 How to Use

### 📧 Email Analysis
1. Navigate to the **Email Analysis** tab
2. Paste email content into the text area
3. Click **"Analyze Email"** or press `Ctrl+Enter`
4. Review the comprehensive threat assessment:
   - **Threat Score**: 0-100 visual representation
   - **Risk Factors**: Identified suspicious elements
   - **Detailed Explanations**: Why each factor is concerning
   - **Recommendations**: Clear action guidance
   - **Highlighted Content**: Visual marking of threats

### 🔗 URL Analysis
1. Switch to the **URL Analysis** tab
2. Enter the URL to analyze
3. Click **"Analyze URL"** or press `Ctrl+Enter`
4. Examine the security assessment:
   - **URL Structure Analysis**: Length, subdomains, protocols
   - **Pattern Detection**: Suspicious keywords and indicators
   - **Security Checks**: HTTPS, domain reputation
   - **Risk Classification**: Safe/Suspicious/Malicious

### 📊 Batch Analysis
1. Go to the **Batch Analysis** tab
2. Select analysis type (Emails or URLs)
3. Enter multiple items (one per line)
4. Click **"Batch Analyze"**
5. Review comprehensive batch results with statistics

---

## 🧠 AI Detection Algorithms

### Email Phishing Detection

#### Feature Extraction (20+ Algorithms)
- **Suspicious Keywords**: 40+ phishing-related terms
- **Phishing Phrases**: 14+ known attack patterns
- **Urgency Indicators**: Time-pressure tactics detection
- **Personal Info Requests**: Sensitive data solicitation
- **URL Analysis**: Embedded link examination
- **Sentiment Analysis**: Emotional manipulation detection
- **Language Patterns**: Capitalization and punctuation analysis

#### Threat Scoring System
```javascript
// Weighted Algorithm
Suspicious Keywords:    8 points each (max 35)
Phishing Phrases:      15 points each (max 40)
Urgency Indicators:    12 points each (max 25)
Personal Info Requests: 20 points each (max 35)
Suspicious Domains:    25 points each
Multiple URLs:         10 points
Negative Sentiment:    12 points
```

### URL Malicious Detection

#### Feature Analysis (15+ Algorithms)
- **Structure Analysis**: Length, subdomains, path depth
- **IP Address Detection**: Direct IP usage identification
- **Suspicious Keywords**: 25+ malicious patterns
- **TLD Analysis**: Suspicious top-level domains
- **URL Shortener Detection**: Link hiding services
- **Protocol Security**: HTTPS usage verification
- **Port Analysis**: Non-standard port detection

#### Threat Scoring System
```javascript
// Weighted Algorithm
IP Address Usage:      40 points
Long URL (>100 chars): Variable (max 20)
Many Subdomains:       8 points each
Suspicious Keywords:   12 points each (max 30)
Phishing Indicators:   25 points
URL Shortener:         20 points
Suspicious TLD:        15 points
No HTTPS:              10 points
```

---

## 📊 Classification System

### Threat Levels
- **🟢 Safe (0-30)**: Content appears legitimate
- **🟡 Suspicious (31-70)**: Proceed with caution
- **🔴 Phishing/Malicious (71-100)**: High risk - do not interact

### Confidence Levels
- **Very High**: 5+ risk factors, score ≥70
- **High**: 3+ risk factors, score ≥50
- **Medium**: 2+ risk factors, score ≥30
- **Low**: Few or no indicators detected

---

## 🔌 API Documentation

### Email Analysis Endpoints

#### Analyze Single Email
```http
POST /api/analyze-email
Content-Type: application/json

{
  "emailContent": "Email content to analyze..."
}
```

#### Batch Email Analysis
```http
POST /api/analyze-emails-batch
Content-Type: application/json

{
  "emails": ["email1...", "email2...", "email3..."]
}
```

### URL Analysis Endpoints

#### Analyze Single URL
```http
POST /api/analyze-url
Content-Type: application/json

{
  "url": "https://example.com"
}
```

#### Batch URL Analysis
```http
POST /api/analyze-urls-batch
Content-Type: application/json

{
  "urls": ["url1", "url2", "url3"]
}
```

### System Endpoints

#### Health Check
```http
GET /api/health
```

#### API Documentation
```http
GET /api/docs
```

#### Sample Data
```http
GET /api/sample-email?type=phishing
GET /api/sample-url?type=malicious
```

---

## 🛡️ Security Features

### Backend Security
- **Helmet.js**: Security headers protection
- **CORS**: Cross-origin request security
- **Rate Limiting**: API abuse prevention
- **Input Validation**: Comprehensive data sanitization
- **Error Handling**: Secure error responses

### Frontend Security
- **XSS Prevention**: Content sanitization
- **CSP Headers**: Content Security Policy
- **Input Validation**: Client-side validation
- **Secure Communication**: HTTPS enforcement

---

## 🎨 User Interface Features

### Modern Dashboard Design
- **Responsive Layout**: Works on all devices
- **Professional Styling**: Cybersecurity-themed interface
- **Interactive Visualizations**: Chart.js threat scoring
- **Real-time Feedback**: Loading states and notifications
- **Accessibility**: WCAG compliant design

### User Experience
- **Keyboard Shortcuts**: 
  - `Ctrl+1/2/3`: Switch tabs
  - `Ctrl+Enter`: Analyze content
  - `Escape`: Clear inputs
- **Toast Notifications**: Success/error feedback
- **Character Counters**: Input length tracking
- **Sample Data**: Built-in testing examples

---

## 🧪 Testing & Validation

### Sample Test Cases

#### Phishing Email Example
```
Subject: URGENT: Your Account Will Be Suspended

We have detected suspicious activity on your account. 
Click here to verify: http://paypal-security.com/verify
Provide your SSN and credit card details immediately.
```

#### Malicious URL Examples
```
http://192.168.1.100:8080/login/verify
https://paypal-security.tk/urgent-verify-account
http://amazon-update.ml/billing-suspended
```

### Testing Checklist
- ✅ Legitimate content (low scores)
- ✅ Suspicious content (medium scores)
- ✅ Malicious content (high scores)
- ✅ Edge cases (empty input, very long content)
- ✅ Batch processing (multiple items)
- ✅ Error handling (invalid input)
- ✅ Responsive design (mobile/desktop)

---

## 🚀 Performance & Scalability

### Performance Metrics
- **Analysis Speed**: <500ms average response time
- **Memory Usage**: Optimized for low memory footprint
- **Concurrent Requests**: Rate-limited for stability
- **Batch Processing**: Up to 10 emails or 20 URLs per batch

### Scalability Features
- **Modular Architecture**: Easy to extend and maintain
- **Stateless Design**: Horizontal scaling ready
- **Efficient Algorithms**: Optimized feature extraction
- **Caching Ready**: Prepared for Redis integration

---

## 🔮 Future Enhancements

### Planned Features
- **Database Integration**: MongoDB for analysis history
- **User Authentication**: Account management system
- **Machine Learning Training**: Model improvement interface
- **Real-time Threat Intelligence**: Live threat feeds
- **Email Client Integration**: Plugin development
- **Advanced Reporting**: Detailed analytics dashboard
- **API Rate Plans**: Tiered access levels
- **Mobile Application**: Native mobile apps

### Technical Improvements
- **TensorFlow.js Integration**: Advanced ML models
- **WebSocket Support**: Real-time notifications
- **Microservices Architecture**: Service decomposition
- **Container Deployment**: Docker and Kubernetes
- **CI/CD Pipeline**: Automated testing and deployment

---

## 🤝 Contributing

### Development Guidelines
1. Follow the existing code structure and naming conventions
2. Add comprehensive comments for new features
3. Test all changes thoroughly before submission
4. Update documentation for new functionality
5. Ensure responsive design compatibility

### Code Style
- **JavaScript**: ES6+ features, async/await patterns
- **CSS**: BEM methodology, CSS custom properties
- **HTML**: Semantic markup, accessibility attributes
- **Comments**: JSDoc format for functions and classes

---

## 📄 License

This project is developed for educational purposes as part of a cybersecurity capstone project. 

### Usage Rights
- ✅ Educational use and learning
- ✅ Personal projects and portfolios
- ✅ Academic research and development
- ✅ Non-commercial applications

---

## 👨‍💻 Author & Credits

**Cybersecurity Capstone Project**  
*AI-Based Phishing Detection System*

### Technologies Used
- **Node.js & Express.js**: Backend framework
- **Chart.js**: Data visualization
- **Font Awesome**: Icon library
- **Natural.js**: Natural language processing
- **Helmet.js**: Security middleware

---

## ⚠️ Important Disclaimer

**This tool is designed for educational and demonstration purposes.** While it implements real cybersecurity detection techniques and provides accurate threat analysis, it should not be used as the sole security measure in production environments.

### Security Recommendations
- Always use multiple layers of security protection
- Verify suspicious content through alternative channels
- Keep security software and systems updated
- Train users on cybersecurity best practices
- Implement comprehensive security policies

---
