import { Inject, Injectable } from '@nestjs/common';

interface IUserService {}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('UserRepository') private readonly UserRepository: typeof User
  ) {}
}
