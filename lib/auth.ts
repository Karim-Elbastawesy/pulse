export interface StoredUser {
  firstName: string
  lastName: string
  email: string
}

export const AUTH_KEY = 'pulse_user'

export function getStoredUser(): StoredUser | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(AUTH_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setStoredUser(user: StoredUser): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user))
}

export function clearStoredUser(): void {
  localStorage.removeItem(AUTH_KEY)
}