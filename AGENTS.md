# Repository Guidelines

## Project Structure & Module Organization

This repository is a Next.js 14 App Router site for a personal academic homepage. Core source files live in [`app/`](./app): [`page.tsx`](./app/page.tsx) contains the main landing page and section data, [`layout.tsx`](./app/layout.tsx) defines the root layout and metadata, and route-specific pages live under [`app/news`](./app/news), [`app/publications`](./app/publications), [`app/honors`](./app/honors), and [`app/service`](./app/service). Global styles are in [`app/globals.css`](./app/globals.css), design tokens in [`tailwind.config.ts`](./tailwind.config.ts), and static assets in [`public/`](./public).

## Build, Test, and Development Commands

- `npm install`: install dependencies.
- `npm run dev`: start the local development server at `http://localhost:3000`.
- `npm run build`: create the production build and catch type/build issues.
- `npm start`: serve the production build locally.
- `npm run lint`: run the project linter if configured in your environment.

Run `npm run build` before submitting frontend changes.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Follow the existing style: 2-space indentation, single quotes, and semicolons omitted. Prefer clear PascalCase component names (`Hero`, `PublicationsPage`) and camelCase for variables/functions (`navItems`, `useScrollSpy`). Keep route files in Next.js defaults such as `page.tsx` and `layout.tsx`. Favor Tailwind utility classes over ad hoc CSS; add shared styling to [`app/globals.css`](./app/globals.css) or [`tailwind.config.ts`](./tailwind.config.ts) only when reuse is justified.

## Testing Guidelines

There is no dedicated automated test suite yet. Treat `npm run build` as the required verification step for every change, and manually check key routes (`/`, `/news`, `/publications`, `/honors`, `/service`) in the browser. If you add tests later, place them next to the feature or under a `tests/` directory and name them `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines

Git history is not available in this workspace snapshot, so no repository-specific commit convention can be inferred. Use short, imperative commit messages such as `feat: refine homepage color system` or `fix: correct publication metadata`. PRs should include: a concise summary, affected routes/files, validation steps (`npm run build`), and screenshots or screen recordings for UI changes.

## Security & Configuration Tips

Do not commit secrets, tokens, or private personal data. Keep deploy-specific settings in [`next.config.js`](./next.config.js) and [`ecosystem.config.js`](./ecosystem.config.js). Optimize images in [`public/images`](./public/images) and [`public/papers`](./public/papers) before committing large assets.
