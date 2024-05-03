import { SetMetadata } from '@nestjs/common';

export const AllowJwtAny = () => SetMetadata('allow-any', true);
