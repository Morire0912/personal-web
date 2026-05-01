import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { bvid } = req.query;

  if (!bvid || typeof bvid !== 'string') {
    return res.status(400).json({ error: 'Missing bvid parameter' });
  }

  try {
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
      res.status(404).json({ error: 'No data found' });
    }
  } catch (error) {
    console.error('Error fetching bilibili stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
