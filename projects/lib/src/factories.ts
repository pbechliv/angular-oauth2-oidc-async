import { MemoryStorage, OAuthStorage, SyncStorageAdapter } from './types';

export function createDefaultLogger() {
  return console;
}

export function createDefaultStorage(): OAuthStorage {
  return typeof sessionStorage !== 'undefined'
    ? new SyncStorageAdapter(sessionStorage)
    : new MemoryStorage();
}
