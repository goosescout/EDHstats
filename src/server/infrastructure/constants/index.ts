export const TTL_1_DAY = 24 * 60 * 60 * 1000;

export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN ?? '7d';
