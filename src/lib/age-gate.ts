const AGE_GATE_KEY = "tidl-age-gate-v1";
const EXPIRY_DAYS = 30;

interface AgeGateState {
  confirmed: boolean;
  confirmedAt: string;
}

export function isAgeGateConfirmed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(AGE_GATE_KEY);
    if (!raw) return false;
    const state = JSON.parse(raw) as AgeGateState;
    if (!state.confirmed) return false;
    const confirmedAt = new Date(state.confirmedAt).getTime();
    const expiry = EXPIRY_DAYS * 24 * 60 * 60 * 1000;
    return Date.now() - confirmedAt < expiry;
  } catch {
    return false;
  }
}

export function confirmAgeGate(): void {
  const state: AgeGateState = {
    confirmed: true,
    confirmedAt: new Date().toISOString(),
  };
  localStorage.setItem(AGE_GATE_KEY, JSON.stringify(state));
}

let lockCount = 0;
let previousOverflow = "";

export function lockPageScroll(): void {
  if (typeof document === "undefined") return;
  lockCount += 1;
  if (lockCount === 1) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
}

export function unlockPageScroll(): void {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = previousOverflow;
  }
}
