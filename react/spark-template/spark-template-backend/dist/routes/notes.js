import { Router } from "express";
import { z } from "zod";
import { AppDataSource } from "../database/data-source.js";
import { Note } from "../entities/Note.js";
import { requireVaultAccess } from "../middleware/vault-auth.js";
const encryptedNoteSchema = z.object({
    id: z.string().uuid(),
    iv: z.string().min(8).max(64),
    ciphertext: z.string().min(16),
    encryptionVersion: z.literal(1),
});
export const notesRouter = Router({ mergeParams: true });
notesRouter.use(requireVaultAccess);
notesRouter.get("/", async (request, response) => {
    const { vaultId } = request.params;
    const notes = await AppDataSource.getRepository(Note).find({
        where: { vaultId },
        order: { updatedAt: "DESC" },
    });
    response.json(notes.map(({ vault: _vault, ...note }) => note));
});
notesRouter.post("/", async (request, response) => {
    const { vaultId } = request.params;
    const body = encryptedNoteSchema.parse(request.body);
    const repository = AppDataSource.getRepository(Note);
    if (await repository.existsBy({ id: body.id })) {
        response.status(409).json({ message: "Note already exists" });
        return;
    }
    const note = repository.create({ ...body, vaultId });
    await repository.save(note);
    response.status(201).json(note);
});
notesRouter.put("/:noteId", async (request, response) => {
    const { vaultId, noteId } = request.params;
    const body = encryptedNoteSchema.omit({ id: true }).parse(request.body);
    const repository = AppDataSource.getRepository(Note);
    const note = await repository.findOneBy({ id: noteId, vaultId });
    if (!note) {
        response.status(404).json({ message: "Note not found" });
        return;
    }
    repository.merge(note, body);
    await repository.save(note);
    response.json(note);
});
notesRouter.delete("/:noteId", async (request, response) => {
    const { vaultId, noteId } = request.params;
    const result = await AppDataSource.getRepository(Note).delete({ id: noteId, vaultId });
    if (!result.affected) {
        response.status(404).json({ message: "Note not found" });
        return;
    }
    response.status(204).send();
});
//# sourceMappingURL=notes.js.map