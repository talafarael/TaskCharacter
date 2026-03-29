export class AuthUserDto {
  id: string;
  email: string;
}

export class JwtPayloadDto {
  user: AuthUserDto;
}
