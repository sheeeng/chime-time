import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dgram from "dgram";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Real NTP query using Node's dgram (UDP).
  app.get("/api/ntp", async (req, res) => {
    try {
      const server = (req.query.server as string) || "2.pool.ntp.org";
      
      const client = dgram.createSocket("udp4");
      const ntpData = Buffer.alloc(48);
      // LI = 0 (no warning), VN = 3 (IPv4 only), Mode = 3 (Client).
      ntpData[0] = 0x1b;

      const timeout = setTimeout(() => {
        client.close();
        res.status(504).json({ error: "NTP Timeout" });
      }, 5000);

      client.on("message", (msg) => {
        clearTimeout(timeout);
        client.close();

        // Offset in seconds between Jan 1, 1900 and Jan 1, 1970.
        const offset = 2208988800;
        
        // Receive timestamp is at bytes 32-39.
        // Transmit timestamp is at bytes 40-47.
        // We'll use the transmit timestamp (when server sent the packet).
        const intPart = msg.readUInt32BE(40);
        const fractPart = msg.readUInt32BE(44);
        
        const milliseconds = (intPart - offset) * 1000 + (fractPart * 1000) / 0x100000000;
        
        res.json({ time: milliseconds, server });
      });

      client.on("error", (err) => {
        clearTimeout(timeout);
        client.close();
        res.status(500).json({ error: "UDP Error", details: err.message });
      });

      client.send(ntpData, 0, ntpData.length, 123, server, (err) => {
        if (err) {
          clearTimeout(timeout);
          client.close();
          res.status(500).json({ error: "Send Error", details: err.message });
        }
      });
    } catch (e: any) {
      res.status(500).json({ error: "Internal Error", details: e.message });
    }
  });

  // Vite middleware for development.
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
