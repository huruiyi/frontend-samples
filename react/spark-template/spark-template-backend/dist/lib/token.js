import { createHash, timingSafeEqual } from "node:crypto";
export const hashAccessToken = (token) => createHash("sha256").update(token, "utf8").digest("hex");
export const tokenMatches = (token, expectedHash) => {
    const actual = Buffer.from(hashAccessToken(token), "hex");
    const expected = Buffer.from(expectedHash, "hex");
    return actual.length === expected.length && timingSafeEqual(actual, expected);
};
//# sourceMappingURL=token.js.map