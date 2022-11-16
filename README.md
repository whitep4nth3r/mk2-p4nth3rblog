# whitep4nth3r.com | PREVIEW BRANCH

This site is built with [Eleventy](https://www.11ty.dev/docs/) and [Netlify](https://netlify.com).

![A screenshot of a blog post on whitep4nth3r.com](screenshot.png)

---

## Developing locally

### Install dependencies

```bash
npm install
```

### Run the site locally

Use the Netlify CLI to inject environment variables stored against the Netlify site — no local `.env` file needed!

```bash
ntl dev
```

## Project structure

---

### `./lib`

Contains all code to fetch and format data from the following sources:

- Contentful
- GitHub
- Twitch

---

## `./src`

Directories prefixed with `_` are utility folders, providing global data, layouts, styles, component partials and other
functionality.

Other directories (about, blog, dashboard, talks, topics, uses) act as page-level route directories, resulting
in e.g. `/activity/`, `/dashboard/` etc in the site build.

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
