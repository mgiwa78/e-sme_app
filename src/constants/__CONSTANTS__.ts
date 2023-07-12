const API_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5001' : 'https://e-sme-api.vercel.app'

export default {API_URL}
