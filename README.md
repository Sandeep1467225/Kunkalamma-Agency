# Agency

## Security and deployment

Run `npm run build` and publish only `dist/agency/browser`, never the project
directory or the development server. Production JavaScript is optimized and source
maps are explicitly disabled. Code sent to a browser can still be inspected;
never put passwords, API secrets, or private business logic in this frontend.
Private data requires a backend with authentication and authorization.

The HTML includes a Content Security Policy restricting scripts to this origin,
blocking plugins and native form submissions, and allowing the Google Fonts used
by the design. Angular runtime styles require inline style permission. Contact
enquiries still open WhatsApp through the existing JavaScript handler.

`public/_headers` supplies additional headers for hosts that support this format
(for example, Netlify and Cloudflare Pages static hosting). On other hosts,
configure those response headers on the server/CDN. In particular,
`frame-ancestors` and `X-Frame-Options` prevent embedding only when sent as HTTP
response headers. Serve production over HTTPS. After deployment, inspect the
actual response headers to confirm they are applied; the Angular development
server does not apply `_headers`.

Websites cannot reliably block DevTools, browser/OS screenshots, screen recording,
or photographs. The display-capture policy only disables this document's use of
the Screen Capture API; it does not prevent visitors capturing the page. Right-click,
keyboard, and text-selection restrictions are not security boundaries.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.14.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
