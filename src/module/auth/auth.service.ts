import { verify, sign, Secret } from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { env } from '../../config';

class JwtTokenAuth {
  private accessTokenSecret: Secret;
  private refreshTokenSecret: Secret;
  private accessTokenExpiresIn: string;
  private refreshTokenExpiresIn: string;
  private static instance: JwtTokenAuth | null = null;
  constructor() {
    this.accessTokenSecret = '';
    this.refreshTokenSecret = '';
    this.accessTokenExpiresIn = '';
    this.refreshTokenExpiresIn = '';
    this.authenticateTokenMiddleWare =
      this.authenticateTokenMiddleWare.bind(this);
  }
  static getInstance(): JwtTokenAuth {
    if (!JwtTokenAuth.instance) {
      JwtTokenAuth.instance = new JwtTokenAuth();
      JwtTokenAuth.instance.setAccessTokenSecret(env.JWT_ACCESS);
      JwtTokenAuth.instance.setRefreshTokenSecret(env.JWT_REFRESH_ACCESS);
      JwtTokenAuth.instance.setAccessTokenExpiresIn(env.JWT_ACCESS_EXP);
      JwtTokenAuth.instance.setRefreshTokenExpiresIn(
        env.JWT_REFRESH_ACCESS_EXP,
      );
    }
    return JwtTokenAuth.instance;
  }
  private setAccessTokenSecret(accessTokenSecret: string): void {
    this.accessTokenSecret = accessTokenSecret;
  }
  private setRefreshTokenSecret(refreshTokenSecret: string): void {
    this.refreshTokenSecret = refreshTokenSecret;
  }
  private setAccessTokenExpiresIn(expiresIn: string) {
    this.accessTokenExpiresIn = expiresIn;
  }
  private setRefreshTokenExpiresIn(expiresIn: string) {
    this.refreshTokenExpiresIn = expiresIn;
  }
  authenticateTokenMiddleWare(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void | Response {
    const authHeader: string | undefined = req.headers['authorization'];
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'Access token is required', data: null });
    }
    const token: string = authHeader.split(' ')[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Access token is required', data: null });
    }

    verify(token, this.accessTokenSecret, (err) => {
      if (err) {
        return res
          .status(403)
          .json({ message: 'Invalid access token', data: null });
      }
      next();
    });
  }
  getAccessToken(payload: Object): Secret {
    return sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiresIn,
    });
  }
  getRefreshToken(payload: Object): Secret {
    return sign(payload, this.accessTokenSecret, {
      expiresIn: this.refreshTokenExpiresIn,
    });
  }
  getAccessTokenByRefreshToken(
    refreshToken: string,
    payload: Object,
  ): Promise<Secret> {
    return new Promise((resolve, reject) => {
      verify(refreshToken, this.refreshTokenSecret, (err) => {
        if (err) {
          reject(err);
        }
        resolve(this.getAccessToken(payload));
      });
    });
  }
}

export { JwtTokenAuth };
