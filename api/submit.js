import { isRateLimited } from '../lib/rateLimit';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const ip = req.headers['x-forwarded-for']?.split(',')[0] || 'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    if (await isRateLimited(ip, userAgent)) {
        return res.status(429).json({ message: 'Demasiadas solicitudes' });
    }

    const { nombre, telefono, email, comentario } = req.body;

    if (req.body.hiddenField) {
        return res.status(400).end();
    }

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isValidPhone = (phone) => {
        return !phone || /^[0-9+\-\s()]{6,20}$/.test(phone);
    };

    if (!nombre?.trim()) {
        return res.status(400).json({ message: 'Nombre requerido' });
    }

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Email inválido' });
    }

    if (!isValidPhone(telefono)) {
        return res.status(400).json({ message: 'Teléfono inválido' });
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

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
            signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!response.ok) {
            console.error('Airtable error:', {
                ip,
                userAgent,
                status: response.status,
            });

            return res.status(502).json({ message: 'Error externo (Airtable)' });
        }

        return res.status(200).json({ message: 'OK' });
    } catch (error) {
        if (error.name === 'AbortError') {
            return res.status(504).json({ message: 'Timeout externo' });
        }

        console.error('Submit error:', {
            ip,
            userAgent,
            error: error.message,
        });

        return res.status(500).json({ message: 'Error interno' });
    }
}
