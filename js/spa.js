// Single Page Application Controller
class SPAController {
  constructor() {
    this.currentSection = 0;
    this.totalSections = 7;
    this.sections = [];
    this.data = {
      valentineResponse: null,
      date: null,
      food: [],
      dessert: [],
      activities: []
    };
    
    this.init();
  }

  init() {
    // Get all sections
    this.sections = document.querySelectorAll('.section');
    
    // Initialize event listeners
    this.setupEventListeners();
    
    // Show first section
    this.showSection(0);
    
    // Update progress bar
    this.updateProgress();
  }

  setupEventListeners() {
    // Valentine question buttons
    const yesButton = document.getElementById('yesButton');
    const noButton = document.getElementById('noButton');
    
    if (yesButton) {
      yesButton.addEventListener('click', () => {
        this.data.valentineResponse = 'Yes';
        this.saveData();
        this.showSection(1); // Thank you section
      });
    }
    
    if (noButton) {
      noButton.addEventListener('click', () => {
        this.data.valentineResponse = 'No';
        this.saveData();
        const yesBtn = document.getElementById('yesButton');
        if (yesBtn) {
          const currentFontSize = parseInt(window.getComputedStyle(yesBtn).fontSize);
          yesBtn.style.fontSize = currentFontSize + 10 + 'px';
          yesBtn.style.transform = 'scale(1.05)';
        }
        noButton.style.animation = 'shake 0.5s';
        setTimeout(() => {
          noButton.style.animation = '';
        }, 500);
      });
    }

    // Date form - just set min date
    const dateForm = document.getElementById('dateForm');
    if (dateForm) {
      const dateInput = document.getElementById('dateInput');
      if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
      }
    }

    // Navigation buttons
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        if (this.currentSection > 0) {
          this.showSection(this.currentSection - 1);
        }
      });
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', () => {
        // Save data before moving to next section
        this.saveCurrentSectionData();
        
        if (this.currentSection < this.totalSections - 1) {
          const nextSection = this.currentSection + 1;
          this.showSection(nextSection);
          
          // If moving to results section, display results
          if (nextSection === 6) {
            setTimeout(() => {
              this.displayResults();
            }, 100);
          }
        }
      });
    }

    // Results page buttons
    const downloadButton = document.getElementById('downloadButton');
    const emailButton = document.getElementById('emailButton');
    const sendEmailButton = document.getElementById('sendEmailButton');

    if (downloadButton) {
      downloadButton.addEventListener('click', () => {
        this.downloadData();
        downloadButton.textContent = '✓ Downloaded!';
        setTimeout(() => {
          downloadButton.textContent = '📥 Download Answers';
        }, 2000);
      });
    }

    if (emailButton) {
      emailButton.addEventListener('click', () => {
        const emailForm = document.getElementById('emailForm');
        if (emailForm) {
          emailForm.style.display = emailForm.style.display === 'none' ? 'block' : 'none';
        }
      });
    }

    if (sendEmailButton) {
      sendEmailButton.addEventListener('click', async () => {
        await this.sendEmail();
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && this.currentSection > 0) {
        this.showSection(this.currentSection - 1);
      } else if (e.key === 'ArrowRight' && this.currentSection < this.totalSections - 1) {
        this.showSection(this.currentSection + 1);
      }
    });
  }

  showSection(index) {
    // Hide all sections
    this.sections.forEach(section => {
      section.classList.remove('active');
    });

    // Show selected section
    if (this.sections[index]) {
      this.sections[index].classList.add('active');
      this.currentSection = index;
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Update navigation buttons
      this.updateNavigation();
      
      // Update progress bar
      this.updateProgress();
    }
  }

  saveCurrentSectionData() {
    // Save data from current section before navigating
    if (this.currentSection === 2) {
      // Date section
      const dateInput = document.getElementById('dateInput');
      if (dateInput && dateInput.value) {
        this.data.date = dateInput.value;
      }
    } else if (this.currentSection === 3) {
      // Food section
      const checkboxes = document.querySelectorAll('input[name="food"]:checked');
      this.data.food = Array.from(checkboxes).map(cb => cb.value);
    } else if (this.currentSection === 4) {
      // Dessert section
      const checkboxes = document.querySelectorAll('input[name="dessert"]:checked');
      this.data.dessert = Array.from(checkboxes).map(cb => cb.value);
    } else if (this.currentSection === 5) {
      // Activities section
      const checkboxes = document.querySelectorAll('input[name="activities"]:checked');
      this.data.activities = Array.from(checkboxes).map(cb => cb.value);
    }
    this.saveData();
  }

  updateNavigation() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    // Show/hide navigation buttons based on section
    // Don't show on first section (valentine question)
    if (this.currentSection === 0) {
      if (prevButton) prevButton.style.display = 'none';
      if (nextButton) nextButton.style.display = 'none';
    } else {
      // Show previous button for all sections except first
      if (prevButton) {
        prevButton.style.display = 'block';
      }
      // Show next button for all sections except last
      if (nextButton) {
        nextButton.style.display = this.currentSection < this.totalSections - 1 ? 'block' : 'none';
      }
    }
  }

  updateProgress() {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      // Calculate progress (skip section 1 - thank you)
      let progress = 0;
      if (this.currentSection === 0) {
        progress = 0;
      } else if (this.currentSection === 1) {
        progress = 15;
      } else {
        // Sections 2-6 (date through results)
        progress = 15 + ((this.currentSection - 1) / 5) * 85;
      }
      progressBar.style.width = progress + '%';
    }
  }

  saveData() {
    // Save to localStorage
    try {
      const dataToSave = {
        timestamp: new Date().toISOString(),
        ...this.data
      };
      localStorage.setItem('valentine_questionnaire_data', JSON.stringify(dataToSave));
      
      // Also update valentineData if it exists
      if (typeof valentineData !== 'undefined') {
        if (this.data.valentineResponse) valentineData.setValentineResponse(this.data.valentineResponse);
        if (this.data.date) valentineData.setDate(this.data.date);
        if (this.data.food.length > 0) valentineData.setFood(this.data.food);
        if (this.data.dessert.length > 0) valentineData.setDessert(this.data.dessert);
        if (this.data.activities.length > 0) valentineData.setActivities(this.data.activities);
      }
    } catch (e) {
      console.error('Error saving data:', e);
    }
  }

  displayResults() {
    const summary = document.getElementById('resultsSummary');
    if (!summary) return;

    const foodList = this.data.food.length > 0 ? this.data.food.join(', ') : 'None selected';
    const dessertList = this.data.dessert.length > 0 ? this.data.dessert.join(', ') : 'None selected';
    const activitiesList = this.data.activities.length > 0 ? this.data.activities.join(', ') : 'None selected';

    summary.innerHTML = `
      <div class="result-item"><strong>Date:</strong> ${this.data.date || 'Not selected'}</div>
      <div class="result-item"><strong>Food:</strong> ${foodList}</div>
      <div class="result-item"><strong>Dessert:</strong> ${dessertList}</div>
      <div class="result-item"><strong>Activities:</strong> ${activitiesList}</div>
    `;
  }

  downloadData() {
    const dataToDownload = {
      timestamp: new Date().toISOString(),
      ...this.data
    };
    
    const json = JSON.stringify(dataToDownload, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `valentine-questionnaire-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async sendEmail() {
    const emailInput = document.getElementById('emailInput');
    const emailStatus = document.getElementById('emailStatus');
    const sendEmailButton = document.getElementById('sendEmailButton');
    
    if (!emailInput || !emailStatus) return;
    
    const email = emailInput.value.trim();
    
    if (!email) {
      emailStatus.textContent = 'Please enter an email address';
      emailStatus.style.color = '#ff9494';
      return;
    }

    // Check if EmailJS is configured
    if (typeof emailjs === 'undefined') {
      emailStatus.innerHTML = '<small>EmailJS not configured. Please see EMAIL_SETUP.md for setup instructions, or use the download option.</small>';
      emailStatus.style.color = '#ff9494';
      return;
    }

    if (sendEmailButton) {
      sendEmailButton.textContent = 'Sending...';
      sendEmailButton.disabled = true;
    }

    try {
      const foodList = this.data.food.length > 0 ? this.data.food.join(', ') : 'None selected';
      const dessertList = this.data.dessert.length > 0 ? this.data.dessert.join(', ') : 'None selected';
      const activitiesList = this.data.activities.length > 0 ? this.data.activities.join(', ') : 'None selected';

      const emailParams = {
        to_email: email,
        subject: 'Valentine\'s Questionnaire Results',
        message: `Valentine's Questionnaire Results
=================================

Response: ${this.data.valentineResponse || 'Not answered'}
Date Selected: ${this.data.date || 'Not selected'}
Food Preferences: ${foodList}
Dessert Preferences: ${dessertList}
Activities: ${activitiesList}

Completed on: ${new Date().toLocaleString()}`,
        response: this.data.valentineResponse || 'Not answered',
        date: this.data.date || 'Not selected',
        food: foodList,
        dessert: dessertList,
        activities: activitiesList,
        timestamp: new Date().toLocaleString()
      };

      // EmailJS configuration - UPDATE THESE VALUES
      const emailConfig = {
        serviceID: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        templateID: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        publicKey: 'YOUR_PUBLIC_KEY', // Replace with your EmailJS public key
      };

      // Initialize EmailJS if not already done
      if (!emailjs.init) {
        emailjs.init(emailConfig.publicKey);
      }

      const response = await emailjs.send(
        emailConfig.serviceID,
        emailConfig.templateID,
        emailParams,
        emailConfig.publicKey
      );

      emailStatus.textContent = '✓ Email sent successfully!';
      emailStatus.style.color = '#4caf50';
      emailInput.value = '';
    } catch (error) {
      console.error('Error sending email:', error);
      emailStatus.textContent = '✗ Error: ' + (error.message || 'Failed to send email');
      emailStatus.style.color = '#ff9494';
    } finally {
      if (sendEmailButton) {
        sendEmailButton.textContent = 'Send Email';
        sendEmailButton.disabled = false;
      }
    }
  }
}

// Initialize the SPA when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.spaController = new SPAController();
});
