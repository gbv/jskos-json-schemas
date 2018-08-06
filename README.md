# JSKOS Validation

[![Build Status](https://travis-ci.com/gbv/jskos-validation.svg?branch=master)](https://travis-ci.com/gbv/jskos-validation)

> JSON Schemas and tests for validating JSKOS data format.

This repository contains [JSON Schemas](http://json-schema.org) and tests for the [JSKOS data format for knowledge organization systems](http://gbv.github.io/jskos/).

Note that currently all of the schemas are incomplete or non-existent.

## Install

```bash
npm i gbv/jskos-validation
```

Note: This installs the package from GitHub. We will publish this package to npm as well after we decided on the final name.

## Usage

```javascript
const { validate } = require("jskos-validate")

let concept = {
  ...
}

validate.concept(concept) // returns true or false
// or validate.scheme(scheme)
// or validate.mapping(mapping)
// ...
```

## Build

```bash
git clone --recursive https://github.com/gbv/jskos-validation.git
cd jskos-validation/
npm install
```

## Test

```bash
npm test
```

Note: Tests currently fail due to a failing example in [https://github.com/gbv/jskos](https://github.com/gbv/jskos).
