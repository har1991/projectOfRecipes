import { AuthGuard } from '@nestjs/passport';

export class BasicUserGuard extends AuthGuard('basic') {}