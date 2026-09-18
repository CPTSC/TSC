export const MIN_VOLUME = 10000;
export const MAX_VOLUME = 1000000;
export const RATE_DIFFERENCE = 0.007;
export function parseAmount(value: string): number | null {
  const clean = value.replace(/[$,\s]/g, '');
  if (!/^\d+(\.\d+)?$/.test(clean)) return null;
  const n = Number(clean);
  return Number.isFinite(n) ? n : null;
}
export function validVolume(n: number | null): n is number {
  return n !== null && n >= MIN_VOLUME && n <= MAX_VOLUME;
}
export function validMix(n: number | null): n is number {
  return n !== null && n >= 5 && n <= 100;
}
export function validAffected(n: number | null): n is number {
  return n !== null && n >= 0 && n <= 100;
}
export function nextVolume(current: number, direction: 1 | -1): number {
  const stops = [10000,20000,30000,40000,50000];
  for (let n = 70000; n < MAX_VOLUME; n += 20000) stops.push(n);
  stops.push(MAX_VOLUME);
  return direction === 1
    ? stops.find(n => n > current) ?? MAX_VOLUME
    : [...stops].reverse().find(n => n < current) ?? MIN_VOLUME;
}
export function estimate(volume: number, mix: number, affected: number) {
  const exposed = volume * mix / 100 * affected / 100;
  const monthly = exposed * RATE_DIFFERENCE;
  return { exposed, monthly, annual: monthly * 12 };
}
