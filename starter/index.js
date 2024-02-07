const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter the title of your project:',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a short description of your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Provide installation instructions:',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Explain how to use your project:',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Explain how others can contribute to your project:',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Provide any instructions for running tests:',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project:',
    choices: ['MIT', 'GNU GPLv3', 'Apache 2.0', 'ISC', 'None'],
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'Enter your GitHub username:',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:',
  },
];

// function to write README file
function writeToFile(fileName, data) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(__dirname, fileName);

    fs.writeFile(outputPath, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(`File created: ${outputPath}`);
      }
    });
  });
}

// function to initialize program
async function init() {
  try {
    // Prompt the user for information
    const userData = await inquirer.prompt(questions);

    // Generate README content based on user input
    const readmeContent = generateMarkdown(userData);

    // Write README content to a file
    const result = await writeToFile('README.md', readmeContent);

    console.log(result);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// function call to initialize program
init();
