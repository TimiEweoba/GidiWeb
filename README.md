# GidiGo Website

## Overview

GidiGo Web is a full-stack web application with proper functionality, built with modern web technologies. It includes a client-side interface using React and Vite, a server-side API, and shared schema with Drizzle ORM for PostgreSQL.

Key features:
- User authentication
- Slot management for founders and beta users
- Responsive UI with custom components

## Tech Stack

- **Frontend**: React, TypeScript, Vite, TanStack Query
- **Backend**: Node.js, Express (inferred from structure)
- **Database**: PostgreSQL with Drizzle ORM
- **Other**: Zod for schema validation

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TimiEweoba/GidiGoWeb.git
   cd GidiGoWeb
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add `DATABASE_URL` for PostgreSQL connection

4. Run database migrations:
   ```bash
   npx drizzle-kit migrate
   ```

## Usage

### Development

- Start the client:
  ```bash
  cd client
  npm run dev
  ```

- Start the server:
  ```bash
  cd server
  npm run dev
  ```

### Production

- Build the client:
  ```bash
  cd client
  npm run build
  ```

- Start the server:
  ```bash
  cd server
  npm start
  ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
