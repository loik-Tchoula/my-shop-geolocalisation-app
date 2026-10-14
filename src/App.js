// Modify your authentication call strings to hit Netlify redirects:
const res = await axios.post(`/api/auth/${endpoint}`, { email, password });

// Modify your shop query engine:
const res = await axios.get(`/api/shops?lat=${lat}&lng=${lng}&radiusInKm=15`);
