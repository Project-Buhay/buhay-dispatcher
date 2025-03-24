# Buhay - Dispatcher UI

The Dispatcher View for the Buhay app.

## Overview

- [Buhay - Dispatcher UI](#buhay---dispatcher-ui)
    - [Overview](#overview)
    - [Development](#development)
        - [Prerequisites + Links to Installation Guides](#prerequisites--links-to-installation-guides)
        - [Set-up](#set-up)
        - [Development Proper](#development-proper)
        - [Contributing](#contributing)

## Development

### Prerequisites + Links to Installation Guides

1. For those on Windows: [Windows Subsystem for Linux].

    - **NOTES**
        - Ensure that Virtualization (in _Task Manager_ > _Performance_ > _CPU_) is **enabled** in your computer.
        - This error **will** occur on Windows upon running starting a `vite` developer server (running `pnpm dev` or `pnpm build`):
            ```bash
            Error [ERR_UNSUPPORTED_ESM_URL_SCHEME]: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'c:'
            ```

1. [`Schniz/fnm`] for Node.js

    - **NOTES**
        - The package manager used is `pnpm` (see their [official website](https://pnpm.io/)). This can be installed by running
            ```bash
            corepack enable pnpm
            ```
        - If `corepack` is not installed, simply run
            ```bash
            npm install -g corepack@latest
            ```

1. [Git] for Version Control

[Windows Subsystem for Linux]: https://learn.microsoft.com/en-us/windows/wsl/install
[Git]: https://git-scm.com/downloads
[`Schniz/fnm`]: https://github.com/Schniz/fnm/blob/master/README.md

### Set-up

Set-up the repository for developing by running the following commands _once_

```bash
# Install project dependencies
pnpm install

# Synchronize SvelteKit
pnpm sync
```

\
Running the repository also requires an `.env` file at the root of the project with the following parameters

```bash
PUBLIC_WEBSOCKET_URL
PUBLIC_WEBSOCKET_ID
```

\
Please **ensure** that `.env` is named in the `.gitignore` file.

### Development Proper

To see frontend changes in real time, start a developer server by running

```bash
pnpm dev
```

### Contributing

Before pushing to the GitHub repository, please ensure that the code passes the code quality checks by running

```bash
# Ensure style consistency in the codebase by applying Prettier formatting
pnpm fmt

# See code errors and other potential problems by linting the codebase
pnpm lint
```

\
The commands for the individual linters are as follows

```bash
# Prettier check
pnpm lint:prettier

# LintHTML
pnpm lint:html

# Stylelint
pnpm lint:css

# ESLint
pnpm lint:js

# Svelte check
pnpm lint:svelte
```

\
To check the state of the app for production, run the following commands

```bash
# Build the app
pnpm build

# See the app in production-state on your local machine
pnpm preview
```
