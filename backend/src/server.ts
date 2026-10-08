import app from './app.js';
import { env } from './config/env.js';
import { closeDatabase } from './config/database.js';

const server = app.listen(env.PORT, () => {
  console.log(`Server is running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});

const handleGracefulShutdown = async (signal: string): Promise<void> => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);

  server.close(async (err) => {
    if (err) {
      console.error('Error closing HTTP server:', err);
      process.exit(1);
    }
    console.log('HTTP server closed.');

    try {
      await closeDatabase();
      console.log('Database connections closed.');
      process.exit(0);
    } catch (dbError) {
      console.error('Error closing database connections:', dbError);
      process.exit(1);
    }
  });

  // Fallback timeout to ensure process exits
  setTimeout(() => {
    console.error('Forced shutdown due to timeout.');
    process.exit(1);
  }, 10000).unref();
};

process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));

export default server;
