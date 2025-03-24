# XicoNemi - Web UI

<div align="center">
  <img src="public/images/logos/dark-logo.svg" style="width: 250px;" />
</div>

XicoNemi is a platform to manage and publish business nearby Xicotepec de Juárez, Puebla, this project it's the UI for the web side designed for administrators and business owners registered on the sistem.

This project was made on **Next.js** on the version 14.2.3 and using App Router.

## Running the project

To run this project you must have the next requirements:

- Node.js (minimun 18)

#### Clone this project on your local

```bash
git clone https://github.com/XicoNemi/web-ui
cd web-ui
```

#### Install dependencies

We recommend use the option `clean install` to avoid create conflicts on install dependencies or modify the packages.

```bash
npm ci
```

#### Start the local server

```bash
npm run dev
```

#### Other commands
- `npm run lint`: execute this script to verify the lint validation to check possible errors or warnings from Eslint
- `npm run lint:fix`: this script validate the lint integrity and makes some tries to auto fix them.
- `npm run build`: to make the dist folder for production uses.
- `npm run start`: start the server on 'production' mode.
- `npm run typecheck`: validate the integrity on Typescript rules.
- `npm run format:write`: format the files of the project using Prettier.
- `npm run format:check`: validate code format using Prettier.

## Main Dependencies

This project use some external depencies to work, if you are searching the main libraries to learn, the next list represent the installed dependencies:

- TanStack React Query
- Next.js V14
- MUI 6
- Axios
- Typescript
- ESlint
- Prettier
- dayjs
- formik
- jwt-decode
