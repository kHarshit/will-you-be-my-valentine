# Email Setup Guide

This guide will help you set up email functionality to receive questionnaire answers.

## Option 1: EmailJS (Recommended - Free)

EmailJS is a free service that allows you to send emails directly from JavaScript without a backend server.

### Setup Steps:

1. **Create an EmailJS Account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account (200 emails/month free)

2. **Create an Email Service**
   - In EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - **Copy your Service ID** (you'll need this)

3. **Create an Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template structure:
   
   ```
   Subject: Valentine's Questionnaire Results
   
   From: {{from_name}}
   Reply-To: {{reply_to}}
   
   Valentine's Questionnaire Results
   =================================
   
   Response: {{response}}
   Date Selected: {{date}}
   Food Preferences: {{food}}
   Dessert Preferences: {{dessert}}
   Activities: {{activities}}
   
   Completed on: {{timestamp}}
   ```
   
   - **Copy your Template ID** (you'll need this)

4. **Get Your Public Key**
   - Go to "Account" → "General"
   - **Copy your Public Key**

5. **Update the Code**
   - Open `lastpage.html`
   - Find the email configuration section (around line 100)
   - Replace these values:
     ```javascript
     const emailConfig = {
       serviceID: 'YOUR_SERVICE_ID',      // Paste your Service ID
       templateID: 'YOUR_TEMPLATE_ID',   // Paste your Template ID
       publicKey: 'YOUR_PUBLIC_KEY',     // Paste your Public Key
       toEmail: email
     };
     ```

6. **Add EmailJS Script**
   - In `lastpage.html`, add this before the closing `</body>` tag (before your other scripts):
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script>
     emailjs.init("7qeYaFdfBWuUhVS9m"); // Initialize with your public key
   </script>
   ```

## Option 2: Formspree (Alternative - Free)

Formspree is another free service that's easier to set up but requires form submission.

### Setup Steps:

1. Go to [https://formspree.io/](https://formspree.io/)
2. Sign up for a free account
3. Create a new form
4. Copy your form endpoint URL
5. Update the code to use Formspree instead of EmailJS

## Option 3: Download Only (No Setup Required)

If you don't want to set up email, users can simply download their answers as a JSON file using the "Download Answers" button. This requires no setup and works immediately.

## Testing

After setup, test the email functionality:
1. Complete the questionnaire
2. On the last page, click "Send to Me"
3. Enter your email address
4. Click "Send Email"
5. Check your inbox for the results

## Troubleshooting

- **EmailJS not working?** Make sure you've added the EmailJS script tag and initialized it with your public key
- **Not receiving emails?** Check your spam folder and verify your EmailJS service is properly configured
- **Template errors?** Make sure all template variables match the ones in the code (response, date, food, dessert, activities, timestamp)
