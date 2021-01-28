#!/usr/bin/env node
import program from "commander";
import path from "path";
import { startServer, createConfiguration } from "snowpack";
import { fileURLToPath } from "url";

program
  .command("serve")
  .description("start developing")
  .action(async () => {
    const dirname = fileURLToPath(import.meta.url);
    const snowpackConfig = createConfiguration({
      exclude: [],
      mount: {
        [path.join(dirname, "../app/static/")]: { url: "/", static: true },
        [path.join(dirname, "../app/src/")]: { url: "/" },
      },
    })
    const server = await startServer({
      config: snowpackConfig,
      lockfile: null
    });
  });

program.parse(process.argv);
