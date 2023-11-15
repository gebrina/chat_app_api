import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'public_api';
export const PublicApi = () => SetMetadata(IS_PUBLIC_KEY, true);
