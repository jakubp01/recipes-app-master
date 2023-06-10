import { localStorage } from "./localStorage";

class TokenStorage {
  private readonly tokenKey = "Bearer";

  public saveToken(token: string): void {
    return localStorage.set(this.tokenKey, token);
  }

  public readToken(): string | null {
    return localStorage.get(this.tokenKey);
  }

  public removeToken(): void {
    return localStorage.remove(this.tokenKey);
  }
}

export default new TokenStorage();
