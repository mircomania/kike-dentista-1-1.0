const fs = require('fs');
const path = require('path');

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_GET_BASE_ID;
const TABLE_NAME = process.env.AIRTABLE_BANNER_TABLE_NAME;

const CACHE_PATH = path.join(__dirname, '../cache/banner.json');

const getBanner = async (req, res) => {
    try {
        // 1. Si ya existe el JSON lo devolvemos
        if (fs.existsSync(CACHE_PATH)) {
            const data = fs.readFileSync(CACHE_PATH, 'utf-8');
            return res.json(JSON.parse(data));
        }

        // Si no existe fetch a Airtable
        const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
            headers: {
                Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            },
        });

        const data = await response.json();

        if (!data.records) {
            return res.status(500).json({ error: 'Error en Airtable' });
        }

        const banners = data.records.map((record) => ({
            promo: record.fields.promo,
            url: record.fields.url,
        }));

        if (!banners.length) {
            return res.status(404).json({ error: 'No hay banners' });
        }

        // Guardar JSON
        fs.writeFileSync(CACHE_PATH, JSON.stringify(banners, null, 2));

        return res.json(banners);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    getBanner,
};
