# Buhay - Dispatcher UI

The Dispatcher View for the Buhay app.

## Overview

- [Buhay - Dispatcher UI](#buhay---dispatcher-ui)
    - [Overview](#overview)
    - [Development](#development)
        - [Prerequisites + Links to Installation Guides](#prerequisites--links-to-installation-guides)
        - [Set-up](#set-up)
        - [Developing on Your Local Machine](#developing-on-your-local-machine)
            - [Update your local `main`](#update-your-local-main)
            - [Use feature branches](#use-feature-branches)
            - [Commit your changes](#commit-your-changes)
        - [Pushing to the Remote Repository](#pushing-to-the-remote-repository)
            - [Push your local feature branch to the remote](#push-your-local-feature-branch-to-the-remote)
            - [Ensure code passes code quality checks](#ensure-code-passes-code-quality-checks)
            - [Clean your repository copies](#clean-your-repository-copies)

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

---

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
PUBLIC_API_URL
PUBLIC_USER_ID
```

\
Please **ensure** that `.env` is named in the `.gitignore` file.

---

### Developing on Your Local Machine

**NOTE**: The usage of `git checkout` in the following instructions is the same as `git switch`.

---

#### Update your local `main`

Before implementing features, fixes, and other stuff, please ensure that your **local** copy of the repository (i.e. your local `main` branch) is **up-to-date** to avoid merge conflicts

1. Ensure you are at the `main` branch on your local machine.
    ```bash
    git checkout main # or git switch main
    ```

1. Get and download the latest changes from the `main` branch at the remote by either
    ```bash
    # Getting the latest changes from the remote
    git fetch

    # Merging it to your local copy
    git merge --no-commit
    ```

    or simply
    ```bash
    git pull # shorthand for previous instructions
    ```

---

#### Use feature branches

On implementing stuff, please *avoid* committing your changes directly on the `main` branch and use **feature branches** instead. Feature branches are created by either
```bash
git checkout -b <feature-branch>
```

or
```bash
git switch -c <feature-branch>
```

Example:
```bash
git checkout -b login-page
git switch -c bugfix/overflow-issue
```

\
**NOTE**: It is recommended to keep to one feature per feature branch.

To see frontend changes in real time, start a developer server by running

```bash
pnpm dev
```

\
**!IMPORTANT**: Please ensure that you are developing on **top** of the most recent changes to the remote repository.
1. [Update your local `main`.](#update-your-local-main)
1. Update your feature branch.
    ```bash
    # Switch to your local feature branch
    git checkout <feature-branch> # or git switch <feature-branch>

    # Put the feature branch commits on top of the `main` branch
    git rebase main
    ```

---

#### Commit your changes

Once you've done your change/s, you can now commit away! Here's a sample, standard workflow
1. Check which files have been changed.
    ```bash
    git status
    ```

1. Committing is essentially taking a snapshot/picture of your changes. Thus, we put our changes in front of the "camera" by *staging* them. You can either
    - stage all files for committing
        ```bash
        git add .
        ```
    - or fine-grain the files your want to add in the "picture" by either
        - adding files one-by-one 
            ```bash
            git add <relative-path-to-file>
            ```

        - or adding per *chunk* of code in a file
            ```bash
            git add -p <relative-path-to-file>
            ```

        Example: If your terminal is at the root directory of this repository,
        ```bash
        git add 'src/routes/+page.svelte'
        git add -p 'src/routes/login/+page.server.ts'
        ```
    
    **NOTE**: It is highly recommended to make your commits *atomic* &mdash; one commit contains one specific *change*. This one change can span multiple files.

1. Commit with a meaningful message.
    ```bash
    git commit -m <your-message-here>
    ```

    **NOTE**: It is highly recommended to use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) System for your commit message.

    Example:
    ```bash
    git commit -m 'feat: add `Route` schema'
    git commit -m 'fix(`Route`): make `location_names` attribute nullable'
    git commit -m 'chore: run formatters and linters'
    ```

1. Check the commit history of your branch.
    ```bash
    git log --oneline
    ```

1. Rinse and repeat for the next changes.

---

### Pushing to the Remote Repository

#### Push your local feature branch to the remote

To push your local feature branch to the remote, simply run
```bash
git push -u origin <feature-branch>
```

The command above sets your local feature branch to *track* the feature branch of the same name in the remote aside from pushing your changes. As such, for pushing further commits to the remote feature branch, simply run
```bash
git push
```

---

#### Ensure code passes code quality checks

Before merging your feature branch to the `main` branch of the remote repository, please **ensure** that the code passes the code quality checks by running

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

\
Once your *local* feature branch is ready for merging to `main`, push your changes to the *remote* feature branch and make a pull request. Once again, **ensure** that the code in your [remote] feature branch passes the code quality checks.

---

#### Clean your repository copies

Once your feature branch is merged, please **prune** your branch. This means 
1. deleting your feature branch in the remote, and
1. deleting your feature branch in your local repository by 
    1. [updating your local `main`.](#update-your-local-main)
    1. running
        ```bash
        # Delete your local feature branch
        git branch -d <feature-branch>

        # Prune the connection to the deleted remote feature branch
        git remote prune origin
        ```