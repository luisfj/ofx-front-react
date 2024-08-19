import { serialize, parse } from 'cookie';

export const setCookie = (res: Response, name: string, value: string, options = {}) => {
  const cookie = serialize(name, value, { path: '/', ...options });
  res.headers.set('Set-Cookie', cookie);
};

export const getCookie = (req: Request, name: string) => {
  const cookies = parse(req.headers.get('Cookie') || '');
  return cookies[name];
};