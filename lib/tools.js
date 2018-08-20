const _ = require("lodash")

/**
 * Tests if a string only contains uppercase letters.
 *
 * @param {*} str
 */
const isUpperCase = str => {
  return (/^[A-Z]*$/).test(str)
}

/**
 * Recursively cleans JSKOS object by removing properties starting with _ or containing only uppercase letters.
 * Warning: Works directly on the object without creating a copy!
 *
 * @param {*} jskos
 */
const clean = jskos => {
  Object.keys(jskos).forEach(key => {
    if (isUpperCase(key) || key.startsWith("_")) {
      delete jskos[key]
    } else {
      if (jskos[key] != null && typeof jskos[key] === "object") {
        jskos[key] = clean(jskos[key])
      }
    }
  })
  return jskos
}

// cleanJSKOS as alias for clean.
const cleanJSKOS = clean

/**
 * Creates a deep copy of a JSKOS object, replacing possibly circular structures with open world [null] statements.
 *
 * @param {*} object
 * @param {*} replaceCircular - additional property names that should be replace with open world [null] statements
 */
const copyDeep = (object, replaceCircular = []) => {
  replaceCircular = replaceCircular.concat([
    "ancestors", "narrower", "broader", "mappings", "TOPCONCEPTS", "MAPPINGS", "PROVIDER"
  ])
  let clone = Array.isArray(object) ? [] : {}
  for(let i in object) {
    if (replaceCircular.includes(i)) {
      // Remove circular structures, replace with [null] if it has elements
      if (object[i] && Array.isArray(object[i])) {
        if (object[i].length > 0) {
          clone[i] = [null]
        } else {
          clone[i] = []
        }
        continue
      } else {
        clone[i] = null
        continue
      }
    }
    if (i == "inScheme") {
      // Remove circular structur for inScheme and replace with new object consisting only of URI, notation, and prefLabel
      let inScheme = []
      for (let scheme of object.inScheme) {
        let newScheme = { uri: scheme.uri }
        if (scheme.notation) {
          newScheme.notation = scheme.notation
        }
        if (scheme.prefLabel) {
          newScheme.prefLabel = scheme.prefLabel
        }
        inScheme.push(newScheme)
      }
      clone.inScheme = inScheme
      continue
    }
    if (object[i] != null &&  typeof(object[i]) == "object") {
      clone[i] = copyDeep(object[i])
    } else {
      clone[i] = object[i]
    }
  }
  return clone
}

// deepCopy as alias for copyDeep.
const deepCopy = copyDeep

/**
 * Returns all possible URIs for a JSKOS object. Takes into consideration both the uri and identifier properties, as well as different variants of those identifiers.
 *
 * Variants:
 * - http vs. https
 * - with trailing slash vs. without trailing slash
 * - /en/ vs. /de/
 *
 * @param {*} object
 */
const getAllUris = object => {
  if (!object) return []
  let uris = (object.uri ? [object.uri] : []).concat(object.identifier || [])
  // Generate several variants of URIs to work around inconsistencies
  uris = uris.concat(uris.map(uri => uri.startsWith("https") ? uri.replace("https", "http") : uri.replace("http", "https")))
  uris = uris.concat(uris.map(uri => uri.endsWith("/") ? uri.substring(0, uri.length - 1) : uri + "/"))
  uris = uris.concat(uris.map(uri => uri.indexOf("/en/") != -1 ? uri.replace("/en/", "/de/") : uri.replace("/de/", "/en/")))
  return uris
}

/**
 * Compares two objects based on their URIs, using getAllUris.
 *
 * @param {*} object1
 * @param {*} object2
 */
const compare = (object1, object2) => {
  let object1uris = getAllUris(object1)
  let object2uris = getAllUris(object2)
  if (_.intersection(object1uris, object2uris).length > 0) {
    return true
  } else {
    return false
  }
}

// compareObjects, compareSchemes and compareConcepts as aliases for compare, for compatibility.
const compareObjects = compare
const compareSchemes = compare
const compareConcepts = compare

// Checks whether JSKOS object is a concept based on type property.
const isConcept = object => {
  return object && object.type && object.type.includes("http://www.w3.org/2004/02/skos/core#Concept")
}
// Checks whether JSKOS object is a concept scheme based on type property.
const isScheme = object => {
  return object && object.type && object.type.includes("http://www.w3.org/2004/02/skos/core#ConceptScheme")
}

// Checks whether an object is contained in a list of objects using compare.
const isContainedIn = (object, objects) => {
  if (!object || !objects) {
    return false
  }
  for (let o of objects) {
    if (compare(object, o)) {
      return true
    }
  }
  return false
}

// isSchemeInList as alias for isContainedIn.
const isSchemeInList = isContainedIn

/**
 * Sorts a list of concepts by their notation, then URI.
 *
 * @param {*} concepts
 */
const sortConcepts = concepts => {
  return concepts.sort(
    (a, b) => (a.notation && b.notation ? a.notation[0] > b.notation[0] : a.uri > b.uri) ? 1 : -1
  )
}

/**
 * Sorts a list of schemes by their German prefLabel, then URI.
 *
 * @param {*} schemes
 */
const sortSchemes = schemes => {
  return schemes.sort(
    (a, b) => (a.prefLabel.de && b.prefLabel.de ? a.prefLabel.de > b.prefLabel.de : a.uri > b.uri) ? 1 : -1
  )
}

module.exports = {
  clean, cleanJSKOS, copyDeep, deepCopy, getAllUris, compare,compareObjects, compareSchemes, compareConcepts, isConcept, isScheme, isContainedIn, isSchemeInList, sortConcepts, sortSchemes,
}
