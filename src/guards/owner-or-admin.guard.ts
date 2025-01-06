import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UsersReadBookService } from 'src/users-read-book/users-read-book.service';

@Injectable()
export class OwnerOrAdminGuard implements CanActivate {
  constructor(private readonly userReadBookService: UsersReadBookService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userRead = await this.userReadBookService.findOne(request.params.id);
    if (userRead.user.id != request.user.id && !request.user.idAdmin) {
      throw new ForbiddenException()
    }
    return true
  }
}
