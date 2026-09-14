# Portfolio Website

**Personal Developer Portfolio** – A clean, modern portfolio website showcasing projects, certifications, and professional experience.

This repository contains the source code for my personal portfolio website, designed to present my work as a software developer. The site features a responsive layout, project showcases, downloadable resume, and a contact section with integrated email functionality.

---

## ✨ Features

- **Project Showcase** – Display of development projects with descriptions and GitHub links.
- **Certifications** – A dedicated section for professional certifications and achievements.
- **Resume Download** – Direct download link to a PDF version of my resume.
- **Contact Form** – Integrated with Web3Forms for free email sending functionality.
- **Responsive Design** – Optimized for viewing on desktop, tablet, and mobile devices.
- **Clean UI** – Modern, minimalist design focused on readability and professional presentation.

---

## 🛠️ Tech Stack

- **HTML5** – Semantic markup structure
- **CSS3** – Custom styling with responsive design
- **JavaScript** – Interactive elements and form handling
- **Web3Forms** – Free email-sending service for the contact form

---

## 📁 Project Structure

```
Portfolio/
├── index.html          # Main landing page
├── styles.css          # Custom styles and responsive design
├── script.js           # Interactive features and form handling
├── resume.pdf          # Downloadable resume file
├── certs/              # Certifications and achievements
└── README.md           # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- (Optional) A local web server for development

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JMacopio/Portfolio.git
   ```

2. **Open the website:**
   - Navigate to the project folder.
   - Open `index.html` in your browser.

### Live Demo

The portfolio is hosted and accessible at:  
**https://portfolio-xi-lovat-39.vercel.app**

---

## 📱 How to Use

1. **Browse Projects** – Scroll through the projects section to view my work.
2. **View Certifications** – Check the certifications section for professional credentials.
3. **Download Resume** – Click the resume link to download a PDF copy.
4. **Contact Me** – Use the contact form to send a message directly to my email.

---

## 🔧 Customization

### Updating Projects

To add or modify projects, edit the project cards in `index.html`:

```html
<div class="project-card">
    <h3>Project Name</h3>
    <p>Project description goes here.</p>
    <a href="https://github.com/yourusername/repo">View on GitHub</a>
</div>
```

### Updating Contact Form

The contact form uses Web3Forms for email delivery. To configure your own endpoint:

1. Sign up at [Web3Forms](https://web3forms.com/).
2. Replace the `action` URL in the form with your own endpoint.
3. Update the `accesskey` value in `script.js` if needed.

### Styling Changes

Modify `styles.css` to update colors, fonts, and layout:

```css
:root {
    --primary-color: #your-color;
    --font-family: 'Your Font', sans-serif;
}
```

---

## 📄 License

All rights reserved. This project is for personal and portfolio purposes only. Please contact the author for permissions beyond personal reference.

---

## 👨‍💻 Author

**Jorge Matthew Acopio** ([JMacopio](https://github.com/JMacopio))

Built as a personal portfolio to showcase software development projects, certifications, and professional experience.

---

*Portfolio – A window into my work and journey as a developer.*
