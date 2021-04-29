import { generateTokenForUser, isValidToken } from "./auth.service";
import dotenv from "dotenv";

dotenv.config();

describe('auth', () => {
  it('should generate tokens', () => {
    const tokens = generateTokenForUser({ username: "test", _id: "test" });
    expect(tokens).toBeTruthy();
    expect(tokens.accessToken).toBeTruthy();
    expect(tokens.refreshToken).toBeTruthy();
    expect(tokens.expiresIn).toBeTruthy();
  });

  it('should verify tokens validated are correct', () => {
    const tokens = generateTokenForUser({ username: "test", _id: "test" });
    const decoded = isValidToken(tokens.accessToken);

    expect(decoded.userId).toBe('test');
    expect(decoded.username).toBe('test');
  });
});