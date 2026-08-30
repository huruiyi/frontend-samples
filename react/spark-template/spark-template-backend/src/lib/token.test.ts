import assert from "node:assert/strict"
import test from "node:test"

import { hashAccessToken, tokenMatches } from "./token.js"

test("access tokens are compared through their SHA-256 digest", () => {
  const digest = hashAccessToken("secret-token")
  assert.equal(digest.length, 64)
  assert.equal(tokenMatches("secret-token", digest), true)
  assert.equal(tokenMatches("wrong-token", digest), false)
})
