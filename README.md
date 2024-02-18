# computer-science-teacher-api

This API handles interactions with the OpenAI API and daily Codewars API to create daily lesson plans based on computer science and development topics.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

This is a Node TypeScript project, so Node.js is required for installation. If you are hosting the API, you will need to set up a dotenv file with the OpenAI API keys.

Create a `.env` file with the following content:

```dotenv
OPEN_AI_KEY=XXXXXXXXXXXXXXXXXXXXXX
ORGANIZATION=XXXXXXXXXXXXXXXXXXXXXX
```

Then, install the dependencies and start the server:

```bash
npm install
npm run start
```

## Usage

While this API was originally designed as part of a personal project to create a coding Discord bot, it returns JSON data and can be used in various applications. Below are the available routes:

### `/get-lesson`

Returns a JSON object containing a daily lesson based on various computer science and development topics.

Example response:

```json
{
  "lesson": "# Lesson: Introduction to Currying\n\n## Overview\n\nIn this lesson, we will explore the concept of currying in computer science. Currying is a technique used in functional programming to transform a function that takes multiple arguments into a sequence of functions that each take a single argument..."
}
```

### `/code-challenge`

Returns a JSON object containing a daily code challenge fetched from Codewars.

Example response:

```json
{
  "id": "5882b032bdeafec15w0000e6",
  "name": "Print Hello World!",
  "slug": "Hello-World",
  "category": "reference",
  "publishedAt": "2017-01-21T01:07:00.466Z",
  "approvedAt": "2017-06-27T21:34:56.069Z",
  "languages": [
    "python",
    "javascript",
    "csharp",
    "factor",
    "rust"
  ],
  "url": "https://www.codewars.com/kata/43423423532434353",
  "rank": {
    "id": -7,
    "name": "7 kyu",
    "color": "white"
  },
  "createdAt": "2017-01-21T00:50:26.422Z",
  "createdBy": {
    "username": "Dwight-Schrute",
    "url": "https://www.codewars.com/users/Dwight-Schrute"
  }
}
```
