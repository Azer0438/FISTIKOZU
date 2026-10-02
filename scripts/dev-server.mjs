import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webp": "image/webp"
};

function resolveRequestPath(pathname) {
  const decodedPath = decodeURIComponent(pathname);
  const normalizedPath = decodedPath.endsWith("/") ? `${decodedPath}index.html` : decodedPath;
  const filePath = resolve(root, `.${normalizedPath}`);

  if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
    return null;
  }

  return filePath;
}

const server = createServer((request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  let filePath = resolveRequestPath(url.pathname);

  if ((!filePath || !existsSync(filePath)) && /^\/subeler\/[^/]+\/?$/.test(url.pathname)) {
    filePath = resolve(root, "subeler/index.html");
  }

  if (!filePath || !existsSync(filePath)) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Sayfa bulunamadı.");
    return;
  }

  if (statSync(filePath).isDirectory()) {
    filePath = resolve(filePath, "index.html");
  }

  if (!existsSync(filePath)) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Sayfa bulunamadı.");
    return;
  }

  response.writeHead(200, {
    "content-type": mimeTypes[extname(filePath)] || "application/octet-stream"
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, () => {
  console.log(`Fıstıközü local site: http://localhost:${port}`);
  console.log(`QR menü: http://localhost:${port}/menu/`);
  console.log(`Şube örneği: http://localhost:${port}/subeler/organize/`);
});
