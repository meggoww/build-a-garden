## Local Development Setup

Before starting the labs, you need to set up your local development environment. Follow these steps to get everything running:

1. Clone this repository
2. Open the project in VSCode​
3. Create a .env file at the root of the project containing the connection string to your database​. If you haven't setup the database yet, follow the instructions in the [Database Setup Instructions](../../docs/db-setup.md) document.

```
   DATABASE_URL=postgres://your_db_username:your_db_password@localhost:5432/your_db​
```

4. Open a Git Bash terminal in VSCode and run the following commands:​

To install project dependencies​

```bash
yarn install
```

To start the frontend server​

```bash
yarn dev
```

In a separate Git Bash terminal in VSCode, run the following command to start the backend server:

```bash
yarn start-server
```

You can create a new terminal in VSCode by clicking on the "+" icon in the terminal panel or by using the shortcut Ctrl + Shift + \` (backtick).

5. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the application.
