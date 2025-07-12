# SEGAT - Smart Engineering Graphics Assessment Tool

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

## Overview

SEGAT (Smart Engineering Graphics Assessment Tool) is a cutting-edge platform designed to revolutionize the evaluation and improvement of engineering graphics skills. This innovative tool automates the assessment of technical drawings, engineering sketches, and CAD models, providing instant feedback to engineering students and professionals to enhance their technical visualization competencies.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [System Architecture](#system-architecture)
- [Assessment Methodology](#assessment-methodology)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Intelligent Drawing Analysis**: Advanced algorithms to analyze technical drawings against industry standards
- **Real-time Feedback System**: Immediate evaluation with specific improvement suggestions
- **Comprehensive Performance Metrics**: Detailed analytics on various aspects of engineering graphics skills
- **Standards Library**: Built-in reference to global engineering drawing standards (ASME, ISO, etc.)
- **Progressive Learning Path**: Structured exercises from beginner to advanced levels
- **Educator Dashboard**: Tools for instructors to create custom assessments and track student progress
- **Multi-format Support**: Compatible with hand drawings, digital sketches, and various CAD file formats
- **Batch Processing**: Ability to evaluate multiple submissions efficiently
- **Cloud Synchronization**: Access your projects and feedback from anywhere

## Tech Stack

- **Frontend**: React.js, JavaScript, HTML5, CSS3
- **Backend**: Node.js, Express.js
- **Drawing Analysis**: Computer Vision algorithms, TensorFlow.js
- **3D Rendering**: Three.js for CAD model visualization
- **Data Processing**: WebAssembly for performance-critical operations
- **Storage**: MongoDB for user data and assessment history
- **Authentication**: JWT-based secure access
- **Deployment**: Containerized application with Docker

## Installation

Follow these steps to set up the project locally:

```bash
# Clone the repository
git clone https://github.com/techieRahul17/SEGAT--Smart-Engineering-Graphics-Assesment-Tool-.git
cd SEGAT--Smart-Engineering-Graphics-Assesment-Tool-

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# For production build
npm run build
npm start
```

## Usage

### For Students

1. **Register and Login**: Create an account or sign in with existing credentials
2. **Access Assignments**: View assigned drawing tasks or practice exercises
3. **Submit Work**: Upload completed drawings or create directly in the browser
4. **Receive Feedback**: Get automated assessment with detailed improvement suggestions
5. **Track Progress**: Monitor skill development over time with performance analytics

### For Educators

1. **Create Assessments**: Design custom drawing assignments with specific criteria
2. **Set Standards**: Define evaluation parameters and reference solutions
3. **Assign to Students**: Distribute tasks to individuals or groups
4. **Review Results**: Access comprehensive reports on student performance
5. **Provide Additional Feedback**: Supplement automated assessment with personalized guidance

## System Architecture

```
SEGAT/
├── client/               # Frontend React application
│   ├── public/           # Static assets
│   └── src/              # Source code
│       ├── components/   # UI components
│       ├── pages/        # Application pages
│       ├── services/     # API integration
│       └── utils/        # Helper functions
├── server/               # Backend application
│   ├── controllers/      # Request handlers
│   ├── models/           # Database schemas
│   ├── routes/           # API endpoints
│   └── services/         # Business logic
├── engine/               # Assessment engine
│   ├── analyzers/        # Drawing analysis modules
│   ├── standards/        # Engineering standards implementations
│   └── comparators/      # Comparison algorithms
└── docs/                 # Documentation
```

## Assessment Methodology

SEGAT employs a sophisticated multi-dimensional approach to evaluating engineering graphics:

1. **Geometric Precision**: Measuring accuracy of lines, angles, arcs, and proportions
2. **Standards Compliance**: Evaluating adherence to technical drawing conventions and standards
3. **Projection Accuracy**: Assessing correct implementation of orthographic, isometric, or perspective projections
4. **Dimensioning Quality**: Analyzing placement, style, and accuracy of dimensions and tolerances
5. **Section View Implementation**: Evaluating proper use of section lines, cutting planes, and view alignments
6. **Annotation Clarity**: Assessing notes, labels, and textual elements for clarity and placement
7. **Digital Drafting Technique**: For CAD submissions, evaluating modeling techniques and constraint usage

Each aspect is weighted according to assignment specifications, providing comprehensive and fair assessment.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/techieRahul17">
        <img src="https://github.com/techieRahul17.png" width="100px;" alt="Rahul"/>
        <br />
        <sub><b>Rahul</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Balamurugan1962">
        <img src="https://github.com/Balamurugan1962.png" width="100px;" alt="Balamurugan"/>
        <br />
        <sub><b>Balamurugan</b></sub>
      </a>
    </td>
  </tr>
</table>

### How to contribute:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

© 2023-2025 SEGAT - Smart Engineering Graphics Assessment Tool. All Rights Reserved.
```
