import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard(new JwtService())).toBeDefined();
  });
});
