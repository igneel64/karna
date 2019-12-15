<h1 align="center">
	Karna<br> <img alt="sun" style="padding-top:10px;" width="100" src="./icon.png">
</h1>
<p align="center">A simple bundler <em>in the works.</em></p>

---

## Features

- Babel preset-env applied by default :heavy_check_mark:
- Supports JS, JSON and JSX files :heavy_check_mark:
- Build is minified using [Terser](https://github.com/terser/terser) :heavy_check_mark:
- Automatic resolution of extensionless imports :heavy_check_mark:

### Conventions
- Transforms external lib imports/exports to CommonJS

## Testing & Validation

:warning: Before running the tests you have to install the dependencies of the [import dependencies fixture](test/fixtures/simple-ext-import/package.json).

To run the tests, simply run the `npm run test` command.
### End To End
Additionally there is an `e2e` script that runs a real scenario for a bundler: Build, Ship to the browser, Validate the result.

## Steps ahead & known issues that will be fixed
- [ ] Definitions e.g. (As webpack Define plugin)
- [ ] Browser package.json field as an object
- [ ] Bundle and run a React/ReactDOM project
