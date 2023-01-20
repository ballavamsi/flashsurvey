export class UserSignInModel {
  userid: number;
  name: string;
  email: string;
  platformdetail: SocialPlatform;
}

export class SocialPlatform {
  platform: string = 'google';
  platformid: string;
  platformImage: string;
}

export class UserLoginResponse {
  userGuid: string;
  userName: string;
  userEmail: string;
  profileUrl: string;
  response: string;
}
