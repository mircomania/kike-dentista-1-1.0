export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }

    try {
        const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_GET_BASE_ID}/${process.env.AIRTABLE_CURSOS_TABLE_NAME}`, {
            headers: {
                Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
            },
        });

        if (!response.ok) {
            return res.status(500).json({ error: 'Error en Airtable' });
        }

        const data = await response.json();

        const cursos =
            data.records?.map((record) => ({
                curso: record.fields.curso,
                url: record.fields.url,
            })) || [];

        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

        return res.status(200).json(cursos);
    } catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}
