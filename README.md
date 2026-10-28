# Benevolence UI

## Background

This project is the user interface for Neema Gospel Church benevolence fund, the application is used to replenish funds to the benevolent account whenever an incident occurs among the membership.

The back end API talks to Authorize.Net to facilitate payments on behalf of members


## Development

### How to run the application

The UI is an Angular 14 app. It signs users in through Auth0 (`neema.us.auth0.com`) and calls the
[Benevolence API](../benevolence-api) at the `apiRoot` set in `src/environments/`. Both the local and
Docker setups expect the API at `http://localhost:3000`, so start the API first (see the API README).

| Environment file           | Used by                                      | `apiRoot`                      |
| -------------------------- | -------------------------------------------- | ------------------------------ |
| `environment.ts`           | `pnpm start` / `ng serve`, plain `ng build`  | `http://localhost:3000`        |
| `environment.docker.ts`    | `ng build --configuration=docker` (Docker)   | `http://localhost:3000`        |
| `environment.prod.ts`      | `pnpm run prod-build`                        | `https://api.neemachurch.com`  |

#### Stand alone (local)

Prerequisites:

- Node.js `>=20 <25` (enforced by `engine-strict=true` in `.npmrc`)
- pnpm `>=11` — `npm install -g pnpm@11`

```bash
# from benevolence-ui/
pnpm install
pnpm start
```

Open `http://localhost:4200/`. The app reloads automatically when you change source files.

`pnpm start` runs `ng serve` with `NODE_OPTIONS=--openssl-legacy-provider`, which the Angular 14
toolchain needs on newer Node versions. If you call `ng serve` directly, set that variable yourself.

To create a build locally:

```bash
pnpm run build        # development build -> dist/benevolence-ui
pnpm run prod-build   # production build (points at https://api.neemachurch.com)
```

#### Docker

The `Dockerfile` is a two-stage build: it builds the app with `--configuration=docker` on
`node:24-alpine`, then serves the output from `nginx:1.25-alpine` on port 80 using `nginx.conf`
(which sends unknown routes back to `index.html` so Angular routing works on refresh).

**Option 1 — full stack with Docker Compose (recommended)**

The compose file lives in the API project and starts MySQL, the API and the UI together:

```bash
cd ../benevolence-api
docker compose up --build        # add -d to run in the background
```

| Service | Container               | URL / port               |
| ------- | ----------------------- | ------------------------ |
| UI      | `benevolence_ui`        | `http://localhost:4200`  |
| API     | `benevolence_api`       | `http://localhost:3000`  |
| MySQL   | `mysql_benevolence_db`  | `localhost:3307`         |

To rebuild only the UI after changes:

```bash
docker compose up --build -d ui
```

Stop everything with `docker compose down` (add `-v` to also delete the MySQL data volume).

**Option 2 — UI container only**

Use this when the API is already running on `http://localhost:3000` (locally or in another container):

```bash
# from benevolence-ui/
docker build -t benevolence-ui .
docker run --rm -p 4200:80 --name benevolence_ui benevolence-ui
```

Open `http://localhost:4200/`.

Notes:

- The API URL is compiled into the bundle at build time. To point the image at a different API,
  change `apiRoot` in `src/environments/environment.docker.ts` and rebuild.
- The app runs in your browser, so `apiRoot` must be reachable from the host machine
  (`localhost:3000`), not a Docker-internal hostname like `api`.
- Auth0 must list `http://localhost:4200` as an allowed callback, logout and web origin URL, and the
  API's `ALLOWED_ORIGINS` must include it (it does in `.env.example`).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `pnpm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use `pnpm run prod-build` (`ng build --configuration production`) for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
