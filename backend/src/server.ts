import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // Load from root

import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
