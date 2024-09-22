export const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9000'
  : 'https://anitify-api.vercel.app';
  console.log(baseURL);