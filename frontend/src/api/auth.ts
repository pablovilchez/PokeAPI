const AUTH_URL = import.meta.env.VITE_AUTH_URL;

interface LoginResponse {
  access_token: string;
  error?: string;
}

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  try {
    const res = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return { error: "Network error", access_token: null };
  }
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function setToken(token: string): void {
  localStorage.setItem("token", token);
}

export function removeToken(): void {
  localStorage.removeItem("token");
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
