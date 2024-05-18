import { SigninInput } from '../../dto/signin.dto';

export class SigninQuery {
  constructor(readonly signinInput: SigninInput) {}
}
