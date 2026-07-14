import { createServer } from "node:http";
import { Ok, Error } from "./gleam.mjs";

// @deno-types="../build/dev/javascript/glen/glen.d.mts"
import * as glen from "../glen/glen.mjs";

/**
 * @param {number} port
 * @param {(req: import('../build/dev/javascript/gleam_http/gleam/http/request.d.mts'))} handler
 * @returns {import("../build/dev/javascript/gleam_http/gleam/http/response.d.mts").Response}
 */
export function serve_node(port, handler) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const init = {
      method: req.method,
      headers: req.headers,
    };

    if (!["GET", "HEAD"].includes(req.method.toUpperCase())) {
      init.duplex = "half";
      init.body = req;
    }

    const js_request = new Request(url, init);

    const gleam_request = glen.convert_request(js_request);

    const gleam_response = await handler(gleam_request);

    /** @type {Response} */
    const js_response = glen.convert_response(gleam_response);

    const headers = Object.fromEntries(js_response.headers.entries());

    res.writeHead(js_response.status, headers);

    if (!js_response.body) res.end();

    const reader = js_response.body.getReader();

    async function cancel(error) {
      await reader.cancel(error).catch(() => {});
      if (error) {
        res.destroy(error);
      }
    }

    function pump({ done, value }) {
      try {
        if (done) {
          res.end();
        } else if (!res.write(value)) {
          res.once("drain", () => {
            reader.read().then(pump, cancel);
          });
        } else {
          reader.read().then(pump, cancel);
        }
      } catch (e) {
        cancel(e);
      }
    }
    await reader.read().then(pump, cancel);

    await reader.closed.finally(() => {
      res.off("close", cancel);
      res.off("error", cancel);
    });
  });

  try {
    return new Ok(server.listen(port));
  } catch (error) {
    return new Error(`${error}`)
  }
}

export function close_node(server) {
  return new Promise((resolve) => {
    server.close(() => resolve())
  })
}