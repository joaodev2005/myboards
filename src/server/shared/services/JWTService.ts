import * as jwt from 'jsonwebtoken';

interface IJwtData {
  uid: number;
}

const sign = (data: IJwtData): string | 'JWT_SECRET not defined' => {
  if (!process.env.JWT_SECRET) return 'JWT_SECRET not defined';

  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
}

const verify = (token: string): IJwtData | 'Invalid token' | 'JWT_SECRET not defined' => {
  if (!process.env.JWT_SECRET) return 'JWT_SECRET not defined';

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (typeof decoded === 'string') return 'Invalid token';

    return decoded as IJwtData;
  } catch (err) {
    return 'Invalid token';
  }
}

export const JWTService = {
  sign,
  verify,
};
