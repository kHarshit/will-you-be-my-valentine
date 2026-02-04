// Data Collector for Valentine's Questionnaire
// This file handles collecting, storing, and sending all questionnaire answers

class ValentineDataCollector {
  constructor() {
    this.storageKey = 'valentine_questionnaire_data';
    this.data = this.loadData();
  }

  // Load existing data from localStorage
  loadData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      console.log('loadData() called, stored value:', stored);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log('loadData() parsed data:', parsed);
        return parsed;
      } else {
        console.log('loadData() - no stored data, creating new object');
        return {
          timestamp: new Date().toISOString(),
          valentineResponse: null,
          date: null,
          food: [],
          dessert: [],
          activities: []
        };
      }
    } catch (e) {
      console.error('loadData() error:', e);
      return {
        timestamp: new Date().toISOString(),
        valentineResponse: null,
        date: null,
        food: [],
        dessert: [],
        activities: []
      };
    }
  }

  // Save data to localStorage
  saveData() {
    try {
      const dataToSave = JSON.stringify(this.data);
      localStorage.setItem(this.storageKey, dataToSave);
      // Verify it was saved
      const verify = localStorage.getItem(this.storageKey);
      if (verify !== dataToSave) {
        console.error('Data save verification failed');
        return false;
      }
      return true;
    } catch (e) {
      console.error('Error saving data:', e);
      return false;
    }
  }

  // Set valentine response (Yes/No)
  setValentineResponse(response) {
    this.data.valentineResponse = response;
    this.data.timestamp = new Date().toISOString();
    this.saveData();
  }

  // Set date
  setDate(date) {
    this.data.date = date;
    this.data.timestamp = new Date().toISOString();
    this.saveData();
    console.log('Date saved:', date, 'Current data:', this.data);
  }

  // Set food selections
  setFood(foodArray) {
    this.data.food = foodArray;
    this.data.timestamp = new Date().toISOString();
    this.saveData();
    console.log('Food saved:', foodArray, 'Current data:', this.data);
  }

  // Set dessert selections
  setDessert(dessertArray) {
    this.data.dessert = dessertArray;
    this.data.timestamp = new Date().toISOString();
    this.saveData();
    console.log('Dessert saved:', dessertArray, 'Current data:', this.data);
  }

  // Set activity selections
  setActivities(activitiesArray) {
    this.data.activities = activitiesArray;
    this.data.timestamp = new Date().toISOString();
    this.saveData();
    console.log('Activities saved:', activitiesArray, 'Current data:', this.data);
  }

  // Get all data (reloads from localStorage to ensure latest data)
  getAllData() {
    this.data = this.loadData();
    console.log('Getting all data:', this.data);
    return this.data;
  }

  // Format data for email
  formatDataForEmail() {
    const foodList = this.data.food.length > 0 ? this.data.food.join(', ') : 'None selected';
    const dessertList = this.data.dessert.length > 0 ? this.data.dessert.join(', ') : 'None selected';
    const activitiesList = this.data.activities.length > 0 ? this.data.activities.join(', ') : 'None selected';
    
    return `
Valentine's Questionnaire Results
=================================

Response: ${this.data.valentineResponse || 'Not answered'}
Date Selected: ${this.data.date || 'Not selected'}
Food Preferences: ${foodList}
Dessert Preferences: ${dessertList}
Activities: ${activitiesList}

Completed on: ${new Date(this.data.timestamp).toLocaleString()}
    `.trim();
  }

  // Format data as JSON
  formatDataAsJSON() {
    return JSON.stringify(this.data, null, 2);
  }

  // Download data as JSON file
  downloadData() {
    const json = this.formatDataAsJSON();
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

  // Send data via EmailJS
  async sendEmail(emailConfig) {
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
      console.error('EmailJS is not loaded. Please include the EmailJS script.');
      return { success: false, error: 'EmailJS not loaded' };
    }

    try {
      const emailParams = {
        to_email: emailConfig.toEmail || 'your-email@example.com',
        subject: 'Valentine\'s Questionnaire Results',
        message: this.formatDataForEmail(),
        response: this.data.valentineResponse || 'Not answered',
        date: this.data.date || 'Not selected',
        food: this.data.food.join(', ') || 'None selected',
        dessert: this.data.dessert.join(', ') || 'None selected',
        activities: this.data.activities.join(', ') || 'None selected',
        timestamp: new Date(this.data.timestamp).toLocaleString()
      };

      const response = await emailjs.send(
        emailConfig.serviceID,
        emailConfig.templateID,
        emailParams,
        emailConfig.publicKey
      );

      return { success: true, response };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }

  // Clear all data
  clearData() {
    localStorage.removeItem(this.storageKey);
    this.data = {
      timestamp: new Date().toISOString(),
      valentineResponse: null,
      date: null,
      food: [],
      dessert: [],
      activities: []
    };
  }
}

// Create global instance
const valentineData = new ValentineDataCollector();
console.log('ValentineDataCollector initialized, initial data:', valentineData.data);