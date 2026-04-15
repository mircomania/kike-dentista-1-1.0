const rateLimitMap = new Map();

export const isRateLimited = async (ip, userAgent) => {
    const key = `${ip}:${userAgent}`;
    const now = Date.now();
    const window = 60 * 1000;

    const user = rateLimitMap.get(key) || { count: 0, start: now };

    if (now - user.start > window) {
        user.count = 0;
        user.start = now;
    }

    user.count++;

    rateLimitMap.set(key, user);

    return user.count > 5;
};
