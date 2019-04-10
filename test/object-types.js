const assert = require("assert")
const { objectTypes, guessObjectType } = require("../lib/object-types")

describe("Object Types", () => {
  it("objectTypes", () => {
    assert.ok("ConceptScheme" in objectTypes)
  })

  it("guessObjectType (shortname)", () => {
    for (let name in objectTypes) {
      let shortName = name.toLowerCase().replace(/^concept(.+)/, "$1")
      assert.equal(guessObjectType(name, true), shortName)
    }
  })

  it("guessObjectType (string)", () => {
    for (let name in objectTypes) {
      assert.equal(guessObjectType(name), name)
      assert.equal(guessObjectType(name.toLowerCase()), name)
    }
    assert.equal(guessObjectType("scheme"), "ConceptScheme")
    assert.equal(guessObjectType("occurrences"), "ConceptOccurrence")
    assert.ok(!guessObjectType(""))
    assert.ok(!guessObjectType("?"))
  })

  it("guessObjectType (object)", () => {
    for (let name in objectTypes) {
      const { type } = objectTypes[name]
      for (let uri of (type || [])) {        
        let obj = { type: name === "Annotation" ? uri : [uri] }
        assert.equal(guessObjectType(obj), name)
      }
    }
  })
})
