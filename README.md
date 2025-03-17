# Development

We use [`pnpm`] as the package manager for [Node.js]. See the installation guide [here](https://pnpm.io/installation).

[`pnpm`]: https://pnpm.io/
[Node.js]: https://nodejs.org/

## Set-up

```bash
# Install the project dependencies.
pnpm install

# One-time setup of the auto-generated `.svelte-kit` folder.
pnpm sync

# Starts a developer server at `localhost:5173` by default.
pnpm dev

# Build and optimize the project. Static assets are saved to `build/`.
pnpm build

# Locally preview the production website after building.
pnpm preview
```

Before pushing to the repository, one may be inclined to locally run the formatters, linters, and builders themselves.

```bash
# Apply Prettier's suggestions before linting.
pnpm fmt

# Run all linters: HTMLHint, Stylelint, ESLint, Prettier Check, and Svelte Check.
pnpm lint
```
