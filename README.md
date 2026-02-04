# Will You Be My Valentine?

Welcome to the "Will You Be My Valentine?" project, a playful and interactive way to ask that special someone the big question this Valentine's Day. Hosted as a GitHub Page, this project offers a unique blend of creativity and technology to make your Valentine's Day proposal unforgettable.

## Overview

"Will You Be My Valentine?" is a web-based application that presents users with the question "Will you be my valentine?" followed by two options: "Yes" and "No". What makes this project special is the interactive and engaging way it handles responses, especially if someone tries to click "No".

## Features

- **Interactive Question**: The core of the project is the interactive Valentine's Day proposal.
- **Responsive Design**: Crafted to look great on both desktop and mobile devices.
- **Playful Interaction**: If the user attempts to click "No", watch out for a little surprise that might just sway their decision!
- **Complete Questionnaire**: Multi-page questionnaire to plan the perfect date (date selection, food, dessert, activities)
- **Answer Collection**: All answers are automatically saved to browser localStorage
- **Download Results**: Users can download their answers as a JSON file
- **Email Integration**: Optional email functionality to receive answers via EmailJS (see EMAIL_SETUP.md)
- **Smooth Animations**: Beautiful fade-in animations and hover effects throughout
- **Better UX**: Improved button interactions, form validation, and visual feedback

## Technology

This project is built using simple yet powerful web technologies:
- HTML
- CSS (with animations and transitions)
- JavaScript (ES6+)
- LocalStorage (for saving answers)
- EmailJS (optional, for email functionality)

## Getting Started

1. **Clone or download** this repository
2. **Open `index.html`** in a web browser
3. **Optional**: Set up email functionality by following the guide in `EMAIL_SETUP.md`

## How It Works

1. User is asked "Will you be my valentine?"
2. If they say "Yes", they proceed to a questionnaire
3. The questionnaire collects:
   - Preferred date
   - Food preferences (multiple selections)
   - Dessert preferences (multiple selections)
   - Activity preferences (multiple selections)
4. All answers are saved to browser localStorage
5. On the final page, users can:
   - View a summary of their answers
   - Download answers as a JSON file
   - Send answers via email (if EmailJS is configured)

## Email Setup

To receive answers via email, you'll need to set up EmailJS. See `EMAIL_SETUP.md` for detailed instructions. The email feature is optional - users can always download their answers instead.

## How to View

To experience "Will You Be My Valentine?", simply visit [https://mehedyhassanratul.github.io/moonshine/](https://mehedyhassanratul.github.io/moonshine/) from any modern web browser.

## How to Contribute

Contributions to the "Will You Be My Valentine?" project are more than welcome. Whether it's suggesting new features, improving the design, or fixing bugs, here's how you can contribute:

1. **Fork the Repository**: Start by forking the [project repository](https://github.com/mehedyhassanratul/moonshine/) on GitHub.
2. **Clone Your Fork**: Clone your fork to your local machine for development.
3. **Create a New Branch**: Make a new branch for your changes.
4. **Make Your Changes**: Implement your feature, fix, or improvement.
5. **Commit Your Changes**: Commit your changes with a clear and descriptive commit message.
6. **Push to Your Fork**: Push your changes up to your fork.
7. **Open a Pull Request**: Back on GitHub, open a pull request from your fork to the main project.

## Support

If you encounter any issues or have questions about the project, feel free to open an issue on the GitHub repository.
