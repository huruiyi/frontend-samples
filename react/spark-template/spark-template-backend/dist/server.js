import { createServer } from "node:http";
import { createApp } from "./app.js";
import { config } from "./config.js";
import { AppDataSource } from "./database/data-source.js";
await AppDataSource.initialize();
const server = createServer(createApp());
server.listen(config.port, "127.0.0.1", () => {
    console.log(`spark-template-backend listening on http://127.0.0.1:${config.port}`);
});
const shutdown = async () => {
    server.close();
    if (AppDataSource.isInitialized)
        await AppDataSource.destroy();
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
//# sourceMappingURL=server.js.map