## Workshop Prerequisites

### VSCode

- Install [Visual Studio Code](https://code.visualstudio.com/).

### Git

- Install [Git for Windows](https://git-scm.com/downloads/win). Make sure to include Git Bash in the installation options.

### Vue Dev Tools Chrome Extension

- Install the [Vue Dev Tools Chrome Extension](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd).

### Install node using NVM for windows

- Go to the NVM for Windows [Releases page](https://github.com/coreybutler/nvm-windows/releases)
- Install the latest version of `nvm-setup.exe`
- Run the installer and follow the instructions
- Open "Git Bash" in your machine and run the following command to install the latest version of Node.js:

  ```bash
  nvm install latest
  ```

- After the installation is complete, run the following command to use the latest version of Node.js:

  ```bash
  nvm use latest
  ```

- You can verify the installation by running:
  ```bash
  node -v
  ```

### Install yarn using npm

- Open "Git Bash" in your machine and run the following command to install Yarn globally:

  ```bash
  npm install -g yarn
  ```

- You can verify the installation by running:
  ```bash
  yarn -v
  ```

### Postgres

- Follow the instructions in the [Postgres Install Instructions](./db-setup.md#i-install-postgres-17-following-the-instructions-here-httpswwwenterprisedbcomdocssupported-open-sourcepostgresqlinstallingwindows) to install and set up Postgres on your machine.
- Connect to the server using pgAdmin by folliwingthe instructions in the [Postgres Connect Instructions](./db-setup.md#ii-connect-to-the-server-using-pgadmin).
