## Contributing

This is a monorepo managed using [lerna](https://github.com/lerna/lerna) in independent mode (each packages is versioned and published individually).

## Adding a New Package

1. 
```bash
$ npm run new
```

2. Add link to new package in README

## Installing
We use [yarn](https://yarnpkg.com/lang/en/) workspaces for developing. If you don't have [yarn](https://yarnpkg.com/lang/en/) you can install it by running
`npm install -g yarn`. Otherwise you can run the below to install all the dependencies.

```bash
yarn install
```

All subsequent installs should be quick after the first initial one.

### Commits
Commits should use the [Angular Commit Format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#type). Scope should one of un-prefixed name of the packages under ./packages/. If a commit applies to multiple packages, leave out the scope.

### Releasing
Make sure when you publish that there are no spooky things going on with the version bumps. Lerna will auto detect the changes up to the last commit and auto bump all the required packages accordingly.
```bash
lerna publish
```

### Canary Relases
You can alternatively run a canary release that will not impact the current `latest` tag version and can be used to test out changes.
```bash
lerna publish -c
```