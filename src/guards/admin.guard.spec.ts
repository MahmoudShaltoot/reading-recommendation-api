import { JwtService } from '@nestjs/jwt';
import { JwtAdminAuthGuard } from './admin.guard';

describe('AdminGuard', () => {
  it('should be defined', () => {
    expect(new JwtAdminAuthGuard(new JwtService())).toBeDefined();
  });
});
