import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Bilibili API Proxy to get view counts
  app.get("/api/bilibili/stat/:bvid", async (req, res) => {
    try {
      const { bvid } = req.params;
      const response = await axios.get(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`);
      const apiData = response.data as any;
      if (apiData && apiData.data) {
        const stat = apiData.data.stat;
        res.json({
          view: stat.view,
          danmaku: stat.danmaku,
          reply: stat.reply,
          favorite: stat.favorite,
          coin: stat.coin,
          share: stat.share,
          like: stat.like,
        });
      } else {
        res.status(404).json({ error: "No data found" });
      }
    } catch (error) {
      console.error("Error fetching bilibili stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

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
