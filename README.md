# Fortnite-API

## About

A Node.js-compatible wrapper for [Fortnite-API](https://fortnite-api.com/) written in TypeScript.

## Usage

**Node.js v14+ is required.**

Install this scoped package by running the following command in your terminal:

```sh-session
npm install @squiddleton/fortnite-api
```

The package exports three main objects: the `Client` constructor with methods that fetch Fortnite-API, the `Endpoints` enum which contains all of the endpoints used in the package, and the `FortniteAPIError` class which represents errors received from Fortnite-API. All methods return [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) which must be resolved in order to use the returned structure. Functions, their arguments, and returned structures are documented via the declaration files ending in .d.ts in the transpiled code. This library also adheres to [semantic versioning](https://semver.org/), so breaking changes post-1.0.0 will only be introduced in major version increments.

```javascript
const { Client, Endpionts } = require('@squiddleton/fortnite-api'); // ESM syntax is also supported
const { key } = require('./config.json'); // The use of imported or environmental variables is suggested for importing your API key (if you have one)

console.log(Endpoints.Map); // Logs "https://fortnite-api.com/v1/map"

const client = new Client({ key }); // The Client constructor supports an object with a "language" (defaults to "en") and a "key" (if you have one)

client.stats({ name: 'Donald Mustard' })
    .then(console.log); // Logs the user's stats


const clientWithoutOptions = new Client(); // No options are required for general usage

clientWithoutOptions.listCosmetics()
    .then(console.log); // Logs an array of cosmetics

clientWithoutOptions.findCosmetic({ id: 'Lorem ipsum' })
    .then(console.log)
    .catch(console.error); // Throws a FortniteAPIError since the arguments are invalid

clientWithoutOptions.stats({ name: 'Mark Rein' })
    .then(console.log)
    .catch(console.error); // Throws a TypeError since the stats endpoint requires an API key to be set
```

## Types

This project is written in TypeScript, but its distributed code is transpiled into CommonJS. As such, it retains the full usability of CommonJS modules while adhering to strictly-typed parameters and responses. IntelliSense is supported via the declaration files created upon transpiling. The interfaces for function arguments and returned structures are also exported in these declaration files, so the package supports TypeScript usage with easily-readable interface names, such as `Cosmetic` for the cosmetics endpoints and `Stats` for the stats endpoints.

## Contributing

While the object interfaces mirror the data's properties from [the site's dashboard](https://dash.fortnite-api.com/), the dashboard's typings lacked two key elements:

1. Whether properties can return null or not
2. Optional properties which are not present on all objects (e.g. `Cosmetic#builtInEmoteIds`)

If you encounter an nullable or optional property that was not correctly documented in the typings, please raise an issue or make a pull request so that other package users will also receive correct typings. Additionally, if any data or parameters change properties and the package typings do not accurately reflect those changes, please take similar action.

## Credits

Epic Games, Inc. retains all ownership of the Fortnite intellectual property. This package and its contributors do not represent and are not affiliated with Fortnite-API.com.
