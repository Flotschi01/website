import PocketBase from 'pocketbase';

// Replace with your actual PocketBase URL
const pb = new PocketBase(import.meta.env.VITE_PB_URL); 

export default pb;