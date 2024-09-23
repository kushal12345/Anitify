export const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://anitify-api.vercel.app'
  : 'http://localhost:9000';
  console.log(baseURL);