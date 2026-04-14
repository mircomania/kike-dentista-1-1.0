export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { nombre, telefono, email, comentario } = req.body;

    if (!nombre?.trim() || !email?.includes('@')) {
        return res.status(400).json({ message: 'Datos inválidos' });
    }

    try {
        const response = await fetch(`https://api.airtable.com/v0/${process.env.AIRTABLE_POST_BASE_ID}/${process.env.AIRTABLE_POST_TABLE_NAME}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fields: {
                    name: nombre,
                    phone: telefono,
                    email,
                    comments: comentario,
                },
            }),
        });

        if (!response.ok) {
            return res.status(500).json({ message: 'Error en Airtable' });
        }

        return res.status(200).json({ message: 'Datos enviados correctamente.' });
    } catch (error) {
        return res.status(500).json({ message: 'Error interno' });
    }
}
