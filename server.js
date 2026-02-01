import express from 'express';

const app = express();
app.use(express.json());

const PRIZES = ['一等獎：iPhone 15 Pro', '二等獎：AirPods Pro', '三等獎：$500 現金券'];

app.post('/api/start', (_req, res) => {
  const cardId = `CARD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes from now
  
  res.json({
    success: true,
    data: {
      cardId,
      expiresAt,
    },
  });
});

app.post('/api/reveal', (req, res) => {
  const { cardId } = req.body;
  
  if (!cardId) {
    return res.status(400).json({
      success: false,
      error: 'Missing cardId',
    });
  }
  
  const prize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
  const expiresAt = Date.now() + 15 * 60 * 1000;
  
  res.json({
    success: true,
    data: {
      prize,
      expiresAt,
    },
  });
});

app.post('/api/redeem', (req, res) => {
  const { cardId } = req.body;
  
  if (!cardId) {
    return res.status(400).json({
      success: false,
      error: 'Missing cardId',
    });
  }
  
  res.json({
    success: true,
    data: {
      success: true,
      message: '獎品已兌換成功！',
    },
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Mock API server running on http://localhost:${PORT}`);
});
