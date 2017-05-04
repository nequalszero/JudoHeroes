#
## About
Server-side rendering Node Express React app created from tutorial at:

`https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app`

## Setup
1. `npm install --save babel-cli@6.11.x babel-core@6.13.x  \
  babel-preset-es2015@6.13.x babel-preset-react@6.11.x ejs@2.5.x \
  express@4.14.x react@15.3.x react-dom@15.3.x react-router@2.6.x`
2. `npm install --save-dev webpack@1.13.x babel-loader@6.2.x http-server@0.9.x`
3. To create bundle file, run `NODE_ENV=production node_modules/.bin/webpack -p`.
   If using Windows, you can use PowerShell and run `set NODE_ENV=production | node_modules/.bin/webpack -p`  The NODE_ENV environment variable and the -p option are used to generate the bundle in production mode, which will apply a number of additional optimizations, for example removing all the debug code from the React library.
4. To run `http-server`, use `node_modules/.bin/http-server src/static` to make the app available on `http://localhost:8080/`.
5. Use `<div id="main"><%- markup -%></div>`, adding the markup comment in order to include the React markup into the server-generated HTML code in the `index.ejs` file.
6. Once `server-side rendering` is configured, cannot run `server.js` script using the JSX syntax with the `node interpreter`, need to use `babel-node` command: `NODE_ENV=production node_modules/.bin/babel-node --presets react,es2015 src/server.js`


## Node Express notes
* `app.get('*', (req, res) => {...})` is an Express catch-all route that will intercept all the GET requests to every URL in the server.
* `ReactRouter.match` accepts two parameters: the first one is a `configuration object` and the second is a `callback function`.
  * The configuration object must have two keys:
    1. `routes`: used to pass the React Router routes configuration
    2. `location`: used to specify the currently requested URL.
  * The callback function takes three arguments, `error`, `redirectLocation`, and `renderProps`, that is used to determine what exactly the result of the match operation was.

* Four different cases that need to be handled:
  1. Error during the routing resolution => return `500 internal server error` to the browser.
  2. Matching a route that is a redirect route => create server redirect message (302 redirect) to tell the browser to go to the new destination (this is not really happening in this application because we are not using redirect routes in our Router configuration, but it's good to have it ready in case we decide to keep evolving our application).
  3. Matching a route and we have to render the associated component => the argument `renderProps` is an object that contains the data we need to use to render the component. The component we are rendering is `RouterContext` (contained in the React Router module), which is responsible for rendering the full component tree using the values in `renderProps`.
  4. When the route is not matched => return a `404 not found error` to the browser.

* `ReactDOM.renderToString` is used to be able to render the HTML code that represents the component associated to the currently matched route.
