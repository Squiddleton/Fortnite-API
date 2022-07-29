# Fortnite-API

## About

A NodeJS-compatible wrapper for [Fortnite-API](https://fortnite-api.com/) written in TypeScript.

## Usage

Install this scoped package by running the following command in your terminal:

```sh-session
npm install @squiddleton/fortnite-api
```

The package exports two main objects: the Client constructor which contains all of the methods and the Endpoints enum which contains all of the endpoints used in the package. All methods return [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) which must be resolved in order to use the returned structure. Methods, their arguments, and returned structures are documented via the declaration files ending in .d.ts in the transpiled code.

```javascript
const { Client, Endpionts } = require('@squiddleton/fortnite-api');
const { key } = require('./config.json'); // The use of environmental variables is suggested for importing your API key (if you have one)

const client = new Client({ key }); // The Client constructor supports an optional object with a "language" property (defaults to "en") and a "key" property (if you have one)

client.listCosmetics().then(console.log); // Logs array of Cosmetic objects

const clientWithoutKey = new Client();

clientWithoutKey.stats({ name: 'Donald Mustard' }).then(console.log).catch(console.error); // Throws a TypeError since the stats endpoint is the only endpoint that requires an API key

client.findCosmetic({ id: 'Not a valid id' }).then(console.log).catch(console.error); // Throws a FortniteAPIError if the endpoint returns a status other than 200 (success) status, such as if a provided argument is invalid or does not exist

console.log(Endpoints.Map); // Logs "https://fortnite-api.com/v1/map"
```

## Types

This project was written in TypeScript and then compiled into CommonJS. As such, it retains the full usability of CommonJS modules while adhering to strictly-typed parameters and responses. Intellisense is supported via the declaration files created upon transpiling. The interfaces for function arguments and returned structures are also exported in these declaration files, so the package supports TypeScript usage with easily-readable interface names, such as "Cosmetic" for the cosmetics endpoints and "BRStats" for the stats endpoints.

## Contributing

While the object interfaces mirror the endpoints' returned values from [the site's dashboard](https://dash.fortnite-api.com/), the dashboard lacked two key elements: optional properties which are not consistently present on all objects and whether properties are nullable or not. If you encounter an optional or nullable property that was not properly documented in the typings, please raise an issue or make a pull request so that other package users will also receive correct typings. Additionally, if the returned objects change properties and the package typings do not accurately reflect said changes, please take similar action.

## Credits

Epic Games, Inc. retains all ownership of the Fortnite intellectual property. This package and its contributors do not represent and are not affiliated with Fortnite-API.com.
