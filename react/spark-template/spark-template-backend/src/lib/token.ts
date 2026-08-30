import { createHash, timingSafeEqual } from "node:crypto"

export const hashAccessToken = (token: string) => createHash("sha256").update(token, "utf8").digest("hex")

export const tokenMatches = (token: string, expectedHash: string) => {
  const actual = Buffer.from(hashAccessToken(token), "hex")
  const expected = Buffer.from(expectedHash, "hex")
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}
