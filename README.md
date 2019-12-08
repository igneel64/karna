<h1 align="center">
	Karna<br> <img alt="sun" style="padding-top:10px;" width="100" src="./icon.png">
</h1>
<p align="center">A simple bundler <em>in the works.</em></p>

---

## Features

For now it can bundle only JavaScript and JSON files with some basic transformations.

- Build is minified using [Terser](https://github.com/terser/terser) :heavy_check_mark:

## Testing & Validation

To run the tests, simply run the `npm run test` command.
### End To End
Additionally there is `npm run e2e` that runs a real scenario for a bundler: Build, Ship to the browser, Validate the result.
