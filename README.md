# CF9 Project Frontend

Angular frontend for the CF9 game platform.

The application connects to the ASP.NET Core backend and provides registration, login/logout, role-protected pages, company game management, and gamer libraries.

## Tech Stack

- Angular 21
- TypeScript
- Angular Router
- Angular Forms
- Angular HttpClient
- RxJS
- Tailwind CSS tooling
- npm

## Roles

| Role | Purpose |
| --- | --- |
| `ADMIN` | Administration |
| `COMPANY` | Create and edit company-owned games |
| `GAMER` | Browse all games and manage a personal library |

Angular route guards redirect users away from pages that do not match their role. Backend authorization remains the security authority.

## Features

### Authentication

- Registration
- Password validation
- Duplicate-registration error display
- Cookie-based login
- Current-user check
- Logout
- Role-based redirects

### Company

Company users can:

- View only games belonging to their company.
- Add games.
- Edit existing games.
- Store game name, integer price, and description.

### Gamer

Gamer users can:

- View games from all companies.
- See the company username for each game.
- Add games to their personal library.
- Remove games from their library.
- View saved games separately.

## Installation

### Requirements

Install:

1. [Node.js](https://nodejs.org/)
2. npm
3. Git

The repository currently uses Angular 21 and npm 11.x tooling.

### 1. Clone

```bash
git clone https://github.com/dimitriselaiotriviaris/project-frontend.git
cd project-frontend
```

### 2. Install packages

```bash
npm install
```

### 3. Start the backend

Backend repository:

https://github.com/dimitriselaiotriviaris/CF9-Project-Backend

The current frontend services expect:

```text
https://localhost:7259
```

The authentication service currently uses:

```text
https://localhost:7259/api/auth
```

If your backend uses another host or port, update the service URLs under:

```text
src/app/services/
```

such as:

```text
auth.service.ts
company.service.ts
gamer.service.ts
```

### 4. Trust the backend HTTPS certificate

If using the local ASP.NET HTTPS endpoint:

```bash
dotnet dev-certs https --trust
```

### 5. Run Angular

```bash
npm start
```

or:

```bash
npx ng serve
```

Open:

```text
http://localhost:4200
```

## Backend CORS Requirement

The backend must allow the Angular origin and credentials.

For development:

```text
http://localhost:4200
https://localhost:4200
```

Angular API requests use:

```ts
withCredentials: true
```

This is required for ASP.NET cookie authentication.

## Routes

Typical routes include:

```text
/login
/register
/company
/gamer
/admin
```

Role guards provide behavior such as:

```text
Not logged in + protected page -> /login
COMPANY opening /gamer        -> /company
GAMER opening /company        -> /gamer
Logged-in user opening /login -> their role page
```

## Registration Contract

Registration sends:

```ts
{
  username: string;
  email: string;
  password: string;
  roleId: number;
}
```

Current backend role IDs:

```text
1 = ADMIN
2 = COMPANY
3 = GAMER
```

The backend should validate which roles are allowed for public registration rather than trusting the frontend dropdown alone.

## Build

```bash
npm run build
```

Output is written under:

```text
dist/
```

The project also includes Angular SSR support.

## Deployment Recommendation

For production, avoid hardcoding:

```text
https://localhost:7259
```

A cleaner deployment is to expose the API on the same host as the frontend:

```text
/api/auth
/api/company
/api/gamer
```

and reverse-proxy `/api` to the ASP.NET backend.

This simplifies cookies, CORS, and hostname changes.

## Troubleshooting

### 401 after successful login

Check that:

- Requests use `withCredentials: true`.
- The ASP.NET auth cookie exists in browser storage.
- The backend CORS policy contains the exact frontend origin.
- Credentials are enabled in CORS.
- The development HTTPS certificate is trusted.

### API data appears only after clicking

Some current components explicitly call `ChangeDetectorRef.detectChanges()` after asynchronous HTTP responses. Keep those calls unless the rendering approach is refactored.

## Related Backend

https://github.com/dimitriselaiotriviaris/CF9-Project-Backend

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
