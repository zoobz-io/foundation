import { defineCrucibleHandler } from "@zoobz-io/crucible/server";
import { summarize } from "@zoobz-io/crucible/sanitize";
import { consola } from "consola";

const logger = consola.withTag("crucible");
logger.level = Number(process.env.CONSOLA_LEVEL) || (import.meta.dev ? 5 : 3);

export default defineCrucibleHandler({
  write: (entry) => {
    if (entry.data) {
      logger[entry.level](entry.message, summarize(entry.data));
    } else {
      logger[entry.level](entry.message);
    }
  },
});
