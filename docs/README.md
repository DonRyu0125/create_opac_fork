# create-opac Template

## Introduction
This is the React repository for a OPAC Template. Although it's possible, please use this repository as a boilerplate/guideline rather than a final version of your application. This project is designed with the intention to be highly customizable and extensible and for that reason, everything was built to be generic and easy to modify.


## Getting Started
To install the repository, please make sure your environment has the latest version of Node or at least version 21.x

You will also need to have these following:

- git: [website](https://git-scm.com/downloads)
- docsify: `npm i docsify-cli -g`


To clone the repository, simply run the following from your command line:
```shell
git clone --depth 3 -b main https://github.com/gitminisis/create_opac  
```

Under the root directory, run npm install
```shell
cd create_opac
```

```shell
npm install
```

Once everything is installed, you have a couple of options to choose here

- `npm run start`: To run project in development without needing to connect to the SMA side. This also supports HMR while making changes to the code base

- `npm run dev`: Similarly to `start` but this one will create a `/dist` folder (development mode) which will serve as bundled js files that will be used for the SMA reports and your OPAC. This also supports HMR.

- `npm run build`: Build a production output folder for the project.

- `npm run lint`: Run ESLint to check for any unused imports, potential errors, type mismatching, etc.

- `npm run format`: Format the whole repo

- `npm run theme`: To generate the `index.css` which is required when a new css theme file is added. 

- `npm run schema`: To generate JSON schema for every file in `/constants` folder which are required for the CMS dashboard 

- `npm run doc`: To view the docs on a webpage

## Project Structure
Explanation of the directory structure of the project and the purpose of each folder/file. This may include folders like `src` (source code), `public` (static assets), `node_modules` (dependencies), etc.

## Components
Documentation on the components used in the project, including functional components, class components, and any custom or third-party components. This may include details on props, state, lifecycle methods, and how to use them.

## Routing
Information on how routing is handled in the project, especially if React Router or any other routing library is used. This could include how to define routes, navigate between them, and pass parameters.

## State Management
Explanation of how state is managed in the application, whether it's through React's built-in state management or external libraries like Redux, MobX, or Context API.

## Styling
Guidelines on how styling is applied in the project, including the use of CSS, CSS-in-JS libraries like styled-components, or CSS preprocessors like Sass or Less.

## API Integration
Documentation on how the application communicates with backend APIs, including examples of making HTTP requests using libraries like Axios or the built-in `fetch` API.

## Testing
Information on testing methodologies and tools used in the project, such as Jest and React Testing Library, including examples of writing unit tests and integration tests for React components.

## Deployment
Instructions on how to build and deploy the project to production, covering topics like optimizing assets, configuring environment variables, and deploying to hosting services like Netlify, Vercel, or AWS.

## Contributing
Guidelines for contributing to the project, including how to report bugs, request features, and submit code changes (e.g., through pull requests).

## Troubleshooting
Common issues and their solutions, FAQs, and troubleshooting tips for developers encountering problems while working on or running the project.

## Resources
Links to additional resources such as official React documentation, tutorials, blog posts, and community forums for further learning and support.
