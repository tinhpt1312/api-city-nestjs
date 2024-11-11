import { Users } from './entities';

declare global {
  namespace Express {
    interface Request {
      user?: Users;
    }
  }
}
