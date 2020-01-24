# JSKOS Tools

[![Build Status](https://travis-ci.com/gbv/jskos-tools.svg?branch=master)](https://travis-ci.com/gbv/jskos-tools)
[![GitHub package version](https://img.shields.io/github/package-json/v/gbv/jskos-tools.svg?label=version)](https://github.com/gbv/jskos-tools)
[![NPM package name](https://img.shields.io/badge/npm-jskos--tools-blue.svg)](https://www.npmjs.com/package/jskos-tools)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)

> Tools for working with the JSKOS data format.

This repository contains tools for working with the [JSKOS data format for knowledge organization systems](http://gbv.github.io/jskos/).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [Mapping Identifiers](#mapping-identifiers)
    - [mappingContentIdentifier](#mappingcontentidentifier)
    - [mappingMembersIdentifier](#mappingmembersidentifier)
    - [addMappingIdentifiers](#addmappingidentifiers)
    - [compareMappings](#comparemappings)
    - [compareMappingMembers](#comparemappingmembers)
  - [ConceptScheme](#conceptscheme)
  - [Tools](#tools)
    - [addContext](#addcontext)
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
    - [mappingTypes](#mappingtypes)
    - [mappingTypeByUri](#mappingtypebyuri)
    - [mappingTypeByType](#mappingtypebytype)
    - [defaultMappingType](#defaultmappingtype)
    - [flattenMapping](#flattenmapping)
    - [mappingCSV](#mappingcsv)
    - [serializeCSV](#serializecsv)
    - [conceptsOfMapping](#conceptsofmapping)
    - [compareMappingsDeep](#comparemappingsdeep)
    - [guessObjectType](#guessobjecttype)
    - [objectTypes](#objecttypes)
    - [matchObjectTypes](#matchobjecttypes)
    - [mergeUris](#mergeuris)
    - [merge](#merge)
    - [normalize](#normalize)
    - [isValidUri](#isvaliduri)
- [Build](#build)
- [Test](#test)
- [Maintainers](#maintainers)
- [Publish](#publish)
- [Contribute](#contribute)
- [License](#license)

## Install

```bash
git clone https://github.com/gbv/jskos-tools.git
cd jskos-tools
npm i jskos-tools
```

## Usage

```js
const jskos = require("jskos-tools")
```

See <https://gbv.github.io/jskos-tools/> for full API documentation of
[module jskos-tools](https://gbv.github.io/jskos-tools/module-jskos-tools.html).

### Mapping Identifiers

```js
let mapping = {
  ...
}
```

#### mappingContentIdentifier
`mappingContentIdentifier` starts with urn:jskos:mapping:content: and takes concepts and type into consideration. It uses the `mappingContent` function to get relevant properties from the mapping.

```js
let contentIdentifier = jskos.mappingContentIdentifier(mapping)
```

#### mappingMembersIdentifier
`mappingMembersIdentifier` starts with urn:jskos:mapping:members: and only takes concepts into consideration. It uses the `mappingMembers` function to get relevant properties from the mapping.

```js
let membersIdentifier = jskos.mappingMembersIdentifier(mapping)
```

#### addMappingIdentifiers
`addMappingIdentifiers` creates a new mapping with property "identifiers", containing mappingContentIdentifier and mappingMembersIdentifier.

```js
let mappingWithIdentifiers = jskos.addMappingIdentifiers(mapping)
```

#### compareMappings
`compareMappings` compares two mappings based on their `mappingContentIdentifier`.

```js
if (jskos.compareMappings(mapping1, mapping2)) { ... }
```

Aliases: `compareMappingContent`

#### compareMappingMembers
`compareMappingMembers` compares two mappings based on their `mappingMembersIdentifier`.

```js
if (jskos.compareMappingMembers(mapping1, mapping2)) { ... }
```

### ConceptScheme

See [class ConceptScheme](https://gbv.github.io/jskos-tools/module-jskos-tools.ConceptScheme.html).

### Tools

#### addContext
Add `@context` URI to a JSKOS object or to an array of JSKOS objects.

```js
jskos.addContext(object)
```

#### clean
Removes properties starting with `_` or containing only uppercase letters from a JSKOS object.

```js
jskos.clean(object)
```

Aliases: `cleanJSKOS`

#### copyDeep
Creates a deep copy of a JSKOS object, replacing possibly circular structures with open world `[null]` statements. As the second argument it is possible to add additional properties that should be replaced with open world `[null]` statements. The third argument determines whether all properties starting with `_` should be ignored (`true` by default).

```js
jskos.copyDeep(object)
jskos.copyDeep(object, ["someCircularProperty"])
jskos.copyDeep(object, null, false)
```

Aliases: `deepCopy`

#### getAllUris
Returns all possible URIs for a JSKOS object. Takes into consideration both the uri and identifier properties, as well as different variants of those identifiers. Returns an empty array if object is `null`.

```js
jskos.getAllUris(object)
```

#### compare
Compares two objects based on their URIs, using `getAllUris`. Returns `true` if both objects are `null`.

```js
jskos.compare(object1, object2)
```

Aliases: `compareObjects`, `compareSchemes`, `compareConcepts`

#### isConcept
Checks whether JSKOS object is a concept based on type property.

```js
jskos.isConcept(object)
```

#### isScheme
Checks whether JSKOS object is a concept scheme based on type property.

```js
jskos.isScheme(object)
```

#### isContainedIn
// Checks whether an object is contained in a list of objects using `compare`.

```js
jskos.isContainedIn(object, listOfObjects)
```

Aliases: `isSchemeInList`

#### sortConcepts
Sorts a list of concepts by their notation, then URI. Returns a copy of the list. If the second parameter is `true`, it will try to sort by numerical notations.

```js
jskos.sortConcepts(concepts)
```

#### sortSchemes
Sorts a list of schemes by their prefLabel (de or en), then notation, then URI. Returns a copy of the list.

```js
jskos.sortSchemes(schemes)
```

#### minifyMapping
Removes unnecessary properties from mapping before export or saving. In particular, all properties except for `to`, `from`, `toScheme`, `fromScheme`, `type`, `creator`, `contributor`, `created`, `modified`, `note`, and `identifier` on the mapping will be removed, and all properties except for `uri` and `notation` on concepts and schemes will be removed.

```js
let newMapping = jskos.minifyMapping(mapping)
```

#### mappingTypes
An array of mapping types in form of objects. Objects can have the following properties:

- `notation` - an array of notations (in this case symbols)
- `uri` - the URI of the mapping type
- `prefLabel` - a language maps of labels
- `broader` - array of broader mapping types for this type
- `related` - array of related mapping types
- `RELEVANCE` - relevance label for GND terms (low, medium, high, very high)
- `SHORT` - a short name for the type, used for CSV import/export

The labels are taken from Wikidata (see script `bin/localize-mapping-types`).

Example object:
```json
{
  "notation": ["≈"],
  "uri": "http://www.w3.org/2004/02/skos/core#closeMatch",
  "prefLabel": { "en": "close match" },
  "broader": [ { "uri": "http://www.w3.org/2004/02/skos/core#mappingRelation" } ],
  "RELEVANCE": "high",
  "SHORT": "close"
}
```

#### mappingTypeByUri
Returns a mapping type object for an URI.

```js
jskos.mappingTypeByUri("http://www.w3.org/2004/02/skos/core#closeMatch")
```

#### mappingTypeByType
Returns a mapping type for a JSKOS type property. This is usually an array where the first type is taken, but a workaround for string types is included as well.

```js
jskos.mappingTypeByType(mapping.type)
```

#### defaultMappingType
The default mapping type (currently `mapping relation`).

#### flattenMapping
Converts a mapping into a flat object with for serialization as CSV. Returns an object with fields `fromNotation`, `toNotation`, `type`, and (if option `language` has been provided) `fromLabel`, `toLabel`, and `creator`.

#### mappingCSV
Returns an object of preconfigured conversion functions to convert mappings into CSV. Supports 1-to-1, 1-to-n, and n-to-n mappings.

```js
// Initialize converter with default options
const csv = jskos.mappingCSV({
  delimiter: ",",
  quoteChar: "\"",
  lineTerminator: "\n",
  type: true,
  schemes: false,
  labels: false,
  creator: false,
  language: "en",
})
// Header line for an array of mappings (assuming 1-to-1 mappings if no array is given)
csv.header(mappings)
// Single CSV line for a mapping (uses fromCount and toCount from the mapping by default)
csv.fromMapping(mapping, { fromCount: null, toCount: null })
// Multiline CSV from array of mappings (includes header by default)
csv.fromMappings(mappings, { header: true })
```

The order of the CSV fields is fromScheme, fromNotation, (fromLabel,) (fromNotation2, fromLabel2, ...) toNotation, (toLabel,) (toNotation2, toLabel2, ...) type, creator.

#### serializeCSV
Returns a function to serialize an array as CSV row as configured with [CSV Dialect](<https://frictionlessdata.io/specs/csv-dialect/>).

#### conceptsOfMapping
Returns an array of concepts contained in a mapping. `side` can either be `from` or `to`. If `side` is left out, concepts from both sides will be returned. `null` values will be omitted.

```js
jskos.conceptsOfMapping(mapping)
```

#### compareMappingsDeep
`compareMappingsDeep` compares two mappings based on their properties. Concept sets and schemes are compared by URI.

```js
if (jskos.compareMappingsDeep(mapping1, mapping2)) { ... }
```

#### matchObjectTypes
Compares two JSKOS objects based on their types. Returns `false` only if both types could be guessed using [`guessObjectType`](#guessobjecttype) and they did not match, otherwise it will assume that the types match.

#### mergeUris
Merge URIs of two objects `a` and `b` into `a` by adding/removing URIs from identifier property.

#### merge
Merges two JSKOS objects. See [documentation](https://gbv.github.io/jskos-tools/module-jskos-tools.html#.merge) for more information.

#### normalize
Applies recursive unicode normalization to data.

#### isValidUri
Checks whether a string is a valid URI.

#### objectTypes

An object that maps JSKOS object type names to their description.

#### guessObjectType

Guess the JSKOS object type of an object, URI or name and return its canonical name.

```js
type = guessObjectType(objectOrString)        // get full name such as `ConceptScheme`
type = guessObjectType(objectOrString, true)  // get short name such as `scheme`
```

## Build

```bash
git clone --recursive https://github.com/gbv/jskos-tools.git
cd jskos-tools/
npm install
```

API documentation can be generated in directory `jsdoc/build`:

```bash
npm run docs
```

## Test

```bash
npm test
```

## Maintainers

- [@stefandesu](https://github.com/stefandesu)
- [@nichtich](https://github.com/nichtich)

## Publish

To publish a new version on npm after committing your changes, follow these steps:

```bash
npm version patch # or minor, or major
git push --tags origin master
```

Travis will automatically deploy the new version based on the tag to npm.

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2018 Verbundzentrale des GBV (VZG)
