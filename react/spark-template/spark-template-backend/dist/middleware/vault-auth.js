import { AppDataSource } from "../database/data-source.js";
import { Vault } from "../entities/Vault.js";
import { tokenMatches } from "../lib/token.js";
export const requireVaultAccess = async (request, response, next) => {
    try {
        const vaultId = request.params.vaultId;
        const authorization = request.header("authorization");
        const token = authorization?.startsWith("Bearer ") ? authorization.slice(7) : "";
        if (!vaultId || !token) {
            response.status(401).json({ message: "Vault access token is required" });
            return;
        }
        const vault = await AppDataSource.getRepository(Vault)
            .createQueryBuilder("vault")
            .addSelect("vault.accessTokenHash")
            .where("vault.id = :vaultId", { vaultId })
            .getOne();
        if (!vault || !tokenMatches(token, vault.accessTokenHash)) {
            response.status(401).json({ message: "Invalid vault credentials" });
            return;
        }
        ;
        request.vault = vault;
        next();
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=vault-auth.js.map