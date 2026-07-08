import type { User } from "@/types/auth";

const USERS_KEY = "tidl-users-v1";
const SESSION_KEY = "tidl-session-v1";

interface StoredUser extends User {
  password: string;
}

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const sessionRaw = localStorage.getItem(SESSION_KEY);
    if (!sessionRaw) return null;
    const { userId } = JSON.parse(sessionRaw) as { userId: string };
    const user = readUsers().find((u) => u.id === userId);
    if (!user) return null;
    const { password: _, ...safe } = user;
    return safe;
  } catch {
    return null;
  }
}

export function setSession(userId: string): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId }));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function registerFromQuiz(params: {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
}): User {
  const users = readUsers();
  const existing = users.find((u) => u.email.toLowerCase() === params.email.toLowerCase());
  if (existing) {
    setSession(existing.id);
    const { password: _, ...safe } = existing;
    return safe;
  }

  const user: StoredUser = {
    id: crypto.randomUUID(),
    email: params.email,
    phone: params.phone,
    firstName: params.firstName,
    lastName: params.lastName,
    password: params.password,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  writeUsers(users);
  setSession(user.id);
  const { password: _, ...safe } = user;
  return safe;
}
