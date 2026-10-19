# Keystatic in Astro

This template shows how you can use Keystatic in an Astro site.

To setup:

```bash
pnpm install
```

To run:

```
pnpm dev
```

Admin UI: [http://127.0.0.1:4321/keystatic](http://127.0.0.1:4321/keystatic)

Homepage: [http://localhost:4321](http://localhost:4321)

## Editing and deployment

Keystatic runs only during `pnpm dev`, where it writes content to the local file system. Production builds are fully static: `pnpm build` outputs HTML to `dist/`, with no admin UI or API routes. Commit content changes and publish `dist/` (or let the host run `pnpm build`).

## Version control

Git ignores dependencies, build output, Astro-generated files, local `.env` files, and debug logs. Commit `pnpm-lock.yaml`, content, and images. Environment examples named `.env.example` or `.env.*.example` are not ignored; keep real secrets out of them.
