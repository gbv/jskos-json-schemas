# JSKOS Tools *(jskos-tools)*

[![Build Status](https://travis-ci.com/gbv/jskos-tools.svg?branch=master)](https://travis-ci.com/gbv/jskos-tools)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)

> Tools for working with the JSKOS data format.

This repository contains tools for working with the [JSKOS data format for knowledge organization systems](http://gbv.github.io/jskos/).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [Validation](#validation)
    - [validate](#validate)
    - [version](#version)
  - [Mapping Identifiers](#mapping-identifiers)
    - [mappingContentIdentifier](#mappingcontentidentifier)
    - [mappingMembersIdentifier](#mappingmembersidentifier)
    - [addMappingIdentifiers](#addmappingidentifiers)
    - [compareMappings](#comparemappings)
    - [compareMappingMembers](#comparemappingmembers)
  - [Tools](#tools)
    - [clean](#clean)
    - [copyDeep](#copydeep)
    - [getAllUris](#getalluris)
    - [compare](#compare)
    - [isConcept](#isconcept)
    - [isScheme](#isscheme)
    - [isContainedIn](#iscontainedin)
    - [sortConcepts](#sortconcepts)
    - [sortSchemes](#sortschemes)
    - [minifyMapping](#minifymapping)
- [Build](#build)
- [Test](#test)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Install

```bash
npm i jskos-tools
```

## Usage

```javascript
const jskos = require("jskos-tools")
```

### Validation

#### validate

```javascript
let concept = {
  ...
}

jskos.validate.concept(concept) // returns true or false
// or jskos.validate.scheme(scheme)
// or jskos.validate.mapping(mapping)
// ...
```

Directory `bin` also contains a command line script for validation.

#### version
Returns the version of the JSKOS specification that's used for validation.

```javascript
jskos.version // 0.4.2
```

### Mapping Identifiers

```javascript
let mapping = {
  ...
}
```

#### mappingContentIdentifier
`mappingContentIdentifier` starts with urn:jskos:mapping:content: and takes concepts and type into consideration. It uses the `mappingContent` function to get relevant properties from the mapping.

```javascript
let contentIdentifier = jskos.mappingContentIdentifier(mapping)
```

#### mappingMembersIdentifier
`mappingMembersIdentifier` starts with urn:jskos:mapping:members: and only takes concepts into consideration. It uses the `mappingMembers` function to get relevant properties from the mapping.

```javascript
let membersIdentifier = jskos.mappingMembersIdentifier(mapping)
```

#### addMappingIdentifiers
`addMappingIdentifiers` creates a new mapping with property "identifiers", containing mappingContentIdentifier and mappingMembersIdentifier.

```javascript
let mappingWithIdentifiers = jskos.addMappingIdentifiers(mapping)
```

#### compareMappings
`compareMappings` compares two mappings based on their `mappingContentIdentifier`.

```javascript
if (jskos.compareMappings(mapping1, mapping2)) { ... }
```

Aliases: `compareMappingContent`

#### compareMappingMembers
`compareMappingMembers` compares two mappings based on their `mappingMembersIdentifier`.

```javascript
if (jskos.compareMappingMembers(mapping1, mapping2)) { ... }
```

### Tools

#### clean
Removes properties starting with `_` or containing only uppercase letters from a JSKOS object.

```javascript
jskos.clean(object)
```

Aliases: `cleanJSKOS`

#### copyDeep
Creates a deep copy of a JSKOS object, replacing possibly circular structures with open world `[null]` statements.

```javascript
jskos.copyDeep(object)
```

Aliases: `deepCopy`

#### getAllUris
Returns all possible URIs for a JSKOS object. Takes into consideration both the uri and identifier properties, as well as different variants of those identifiers.

```javascript
jskos.getAllUris(object)
```

#### compare
Compares two objects based on their URIs, using `getAllUris`.

```javascript
jskos.compare(object1, object2)
```

Aliases: `compareObjects`, `compareSchemes`, `compareConcepts`

#### isConcept
Checks whether JSKOS object is a concept based on type property.

```javascript
jskos.isConcept(object)
```

#### isScheme
Checks whether JSKOS object is a concept scheme based on type property.

```javascript
jskos.isScheme(object)
```

#### isContainedIn
// Checks whether an object is contained in a list of objects using `compare`.

```javascript
jskos.isContainedIn(object, listOfObjects)
```

Aliases: `isSchemeInList`

#### sortConcepts
Sorts a list of concepts by their notation, then URI. Returns a copy of the list.

```javascript
jskos.sortConcepts(concepts)
```

#### sortSchemes
Sorts a list of schemes by their German prefLabel, then URI. Returns a copy of the list.

```javascript
jskos.sortSchemes(schemes)
```

#### minifyMapping
Removes unnecessary properties from mapping before export or saving. In particular, all properties except for `to`, `from`, `toScheme`, `fromScheme`, `type`, and `creator` on the mapping will be removed, and all properties except for `uri` and `notation` on concepts and schemes will be removed.

```javascript
let newMapping = jskos.minifyMapping(mapping)
```


## Build

```bash
git clone --recursive https://github.com/gbv/jskos-tools.git
cd jskos-tools/
npm install
```

## Test

```bash
npm test
```

## Maintainers

- [@stefandesu](https://github.com/stefandesu)
- [@nichtich](https://github.com/nichtich)

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2018 Verbundzentrale des GBV (VZG)
