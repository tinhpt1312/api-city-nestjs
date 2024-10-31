import { SetMetadata } from '@nestjs/common';

export const SKIP_JWT_AUTH = 'skip_jwt_auth';
export const SkipJwtAuth = () => SetMetadata(SKIP_JWT_AUTH, true);
