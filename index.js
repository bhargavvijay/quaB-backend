const express = require('express');
const axios = require('axios');
const sequelize = require('./config/database');
const Cryptocurrency = require('./models/Cryptocurrency');
const cors = require('cors');

const app = express();

// Use CORS middleware to allow requests from your frontend
app.use(cors({
    origin: 'https://bhargavvijay.github.io/quadB-frontend/', // Update to your frontend's URL
}));

// Sync Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced successfully.');
});

// Fetch top 10 cryptocurrency data from WazirX and store in PostgreSQL
const fetchData = async () => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const tickers = response.data;
        const topTen = Object.values(tickers)
            .sort((a, b) => b.volume - a.volume)
            .slice(0, 10);

        // Clear existing data
        await Cryptocurrency.destroy({ truncate: true });

        // Insert new data
        await Cryptocurrency.bulkCreate(topTen.map(item => ({
            name: item.name,
            last: item.last,
            buy: item.buy,
            sell: item.sell,
            volume: item.volume,
            base_unit: item.base_unit,
        })));

        console.log('Top 10 data successfully stored.');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Fetch data immediately and then every 5 minutes
fetchData();
setInterval(fetchData, 5 * 60 * 1000);

// API route to get top 10 cryptocurrencies
app.get('/api/top-ten', async (req, res) => {
    try {
        const data = await Cryptocurrency.findAll({
            limit: 10,
            order: [['volume', 'DESC']]
        });
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));