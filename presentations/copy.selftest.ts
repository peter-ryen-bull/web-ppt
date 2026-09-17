import assert from "node:assert/strict";
import {
  copyLength,
  copyPathFromParts,
  getCopyString,
  getCopyStrings,
  getCopyValue,
  isCopyPath,
  parseCopy,
  presentationHasCopy,
  setCopyFieldInYaml,
  yamlHasSlide,
} from "./copy";

const yaml = `
scene:
  line1: "Klokka er 03:14."
  items:
    - "Første"
    - "Andre"
  rows:
    - label: HVEM
      pills:
        - "A"
        - "B"
`;

const deck = parseCopy(yaml);
assert.equal(getCopyString(deck.scene, "line1"), "Klokka er 03:14.");
assert.deepEqual(getCopyStrings(deck.scene, "items"), ["Første", "Andre"]);
assert.equal(copyLength(deck.scene, "items"), 2);
assert.equal(getCopyString(deck.scene, "rows.0.label"), "HVEM");
assert.equal(getCopyString(deck.scene, "rows.0.pills.1"), "B");
assert.equal(getCopyValue(deck.scene, "missing"), undefined);
assert.equal(isCopyPath("rows.0.pills.1"), true);
assert.equal(isCopyPath("../secret"), false);
assert.equal(copyPathFromParts("rows", 0, "label"), "rows.0.label");
assert.equal(yamlHasSlide(yaml, "scene"), true);
assert.equal(yamlHasSlide(yaml, "missing"), false);
assert.equal(presentationHasCopy({ hasCopy: true }), true);
assert.equal(presentationHasCopy({}), false);

const updated = setCopyFieldInYaml(yaml, "scene", "line1", "Klokka er 03:15.");
assert.ok(updated && updated.includes("Klokka er 03:15."));
const listed = setCopyFieldInYaml(yaml, "scene", "items.0", "Ny");
assert.ok(listed && listed.includes("Ny"));
assert.equal(setCopyFieldInYaml(yaml, "scene", "items", "x"), null);
assert.equal(setCopyFieldInYaml(yaml, "scene", "missing", "x"), null);

console.log("copy.selftest: ok");
