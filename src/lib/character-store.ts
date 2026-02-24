/**
 * User-scoped character persistence.
 * All localStorage keys are namespaced by Clerk user ID so each
 * authenticated user has their own independent roster.
 */

export interface Character {
  id: string;
  name: string;
  class: string;
  stats: { str: number; dex: number; int: number; cha: number };
}

function listKey(userId: string)   { return `characters_${userId}`; }
function activeKey(userId: string) { return `activeCharacter_${userId}`; }

export function getCharacters(userId: string): Character[] {
  try {
    const raw = localStorage.getItem(listKey(userId));
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveCharacter(userId: string, char: Character): void {
  const list = getCharacters(userId);
  const idx = list.findIndex(c => c.id === char.id);
  if (idx >= 0) list[idx] = char; else list.push(char);
  localStorage.setItem(listKey(userId), JSON.stringify(list));
}

export function deleteCharacter(userId: string, charId: string): void {
  const list = getCharacters(userId).filter(c => c.id !== charId);
  localStorage.setItem(listKey(userId), JSON.stringify(list));
  // Clear active if it was this one
  const active = getActiveCharacter(userId);
  if (active?.id === charId) clearActiveCharacter(userId);
}

export function getActiveCharacter(userId: string): Character | null {
  try {
    const raw = localStorage.getItem(activeKey(userId));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function setActiveCharacter(userId: string, char: Character): void {
  localStorage.setItem(activeKey(userId), JSON.stringify(char));
}

export function clearActiveCharacter(userId: string): void {
  localStorage.removeItem(activeKey(userId));
}
