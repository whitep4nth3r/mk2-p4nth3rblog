# whitep4nth3r.com | PREVIEW BRANCH

[![Netlify Status](https://api.netlify.com/api/v1/badges/c4d8b097-e089-4d54-acda-b29415724c2d/deploy-status)](https://app.netlify.com/sites/mk2-p4nth3rblog/deploys)

This site is built with [Eleventy](https://www.11ty.dev/docs/) and [Netlify](https://netlify.com)

---

## Developing locally

### Install dependencies

```bash
npm install
```

### Run the site locally

Use the Netlify CLI to inject environment variables stored against the Netlify site — no local `.env` file needed.

```bash
ntl dev
```

## Project structure

---

### `./lib`

Contains all code to fetch and format data from the following sources:

- Contentful
- GitHub

---

## `./src`

Directories prefixed with `_` are utility folders, providing global data, layouts, styles, component partials and other
functionality.

Other directories (about, blog, talks, uses) act as page-level route directories, resulting in e.g.
`/activity/`, `/talks/` etc in the site build.

The site homepage is built from `/src/index.11ty.js`.

---

## Inside page-level route directories

- e.g. `/{name}/index.11ty.js` builds the `/{name}/` route.
- e.g. `/{name}/{name}.11tydata.js` fetches the data that is provided to sibling files.
- e.g. `{name}-pages.11ty.js` creates a collection of files (or dynamic routes) using Eleventy pagination, available on
  `/{name}/{dynamic_route}/`

---

### `.eleventy.js`

The Eleventy config file:

- loads plugins
- defines how to output files and directories from ./src

## Build output

Using `netlify dev`, the site is built to and served from `_site`.
