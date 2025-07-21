# Sleep Tracker

A Node.js application for tracking and analyzing sleep patterns, powered by Supabase as the backend database.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Supabase Setup](#supabase-setup)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Sleep Tracker helps users log their sleep sessions, analyze sleep quality, and visualize trends over time. It leverages Supabase for secure, scalable data storage and provides a foundation for building advanced sleep analytics.

## Features

- Log sleep start and end times
- Store and retrieve sleep data from Supabase
- Analyze sleep duration and trends
- Easily extensible for more advanced analytics or integrations

## Tech Stack

- **Node.js**: JavaScript runtime
- **Supabase**: Backend-as-a-Service (PostgreSQL, Auth, RESTful API)
- **@supabase/supabase-js**: Official Supabase JavaScript client

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Supabase](https://supabase.com/) account and project

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/sleep-tracker.git
cd sleep-tracker
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add your Supabase credentials:

```env
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
```

Alternatively, you can edit `supabaseClient.js` directly with your credentials.

### Running the App

```bash
npm start
```

or

```bash
node index.js
```

## Supabase Setup

1. **Create a Supabase project** at [app.supabase.com](https://app.supabase.com/).
2. **Get your project URL and anon key** from the project settings.
3. **Create a table** (e.g., `sleep_sessions`) with columns:
   - `id` (UUID, primary key)
   - `user_id` (UUID or text)
   - `start_time` (timestamp)
   - `end_time` (timestamp)
   - `notes` (text, optional)
4. **Configure Row Level Security (RLS)** as needed.

## Usage

Import the Supabase client and interact with your tables:

```javascript
import supabase from "./supabaseClient.js";

// Example: Insert a sleep session
const { data, error } = await supabase.from("sleep_sessions").insert([
  {
    user_id: "user123",
    start_time: "2024-06-01T23:00:00Z",
    end_time: "2024-06-02T07:00:00Z",
  },
]);
```

## Project Structure

```
sleep-tracker/
├── supabaseClient.js
├── index.js
├── package.json
├── README.md
└── ...
```

- `supabaseClient.js`: Initializes and exports the Supabase client.
- `index.js`: Main application logic.
- `README.md`: Project documentation.

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.
