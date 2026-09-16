import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import aiRoutes from './routes/aiRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// BhashaSetu AI Routes
app.use('/api/ai', aiRoutes);

// General Backend Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'BhashaSetu AI Vernacular Classroom Engine',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    geminiModelConfigured: process.env.GEMINI_MODEL || 'gemini-3.6-flash',
  });
});

// Serve frontend build in production if present
const frontendBuildPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendBuildPath));
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(frontendBuildPath, 'index.html'), (err) => {
      if (err) {
        res.status(200).send('BhashaSetu AI Service Running.');
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 BHASHASETU AI BACKEND RUNNING ON http://localhost:${PORT}`);
  console.log(`   Model Configured: ${process.env.GEMINI_MODEL || 'gemini-3.6-flash'}`);
  console.log(`   Tagline: "One Teacher. Many Languages. Every Child Included."`);
  console.log(`====================================================`);
});

export default app;
