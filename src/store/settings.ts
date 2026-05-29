import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'daily_learner_settings_v1';

export type NotificationSettings = {
  enabled: boolean;
  hour: number;
  minute: number;
};

const defaults: NotificationSettings = {
  enabled: false,
  hour: 19,
  minute: 0,
};

type Listener = (s: NotificationSettings) => void;

class SettingsStore {
  private state: NotificationSettings = defaults;
  private listeners = new Set<Listener>();
  private loaded = false;
  private loadPromise: Promise<void> | null = null;

  async load(): Promise<void> {
    if (this.loaded) return;
    if (this.loadPromise) return this.loadPromise;
    this.loadPromise = (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          this.state = { ...defaults, ...JSON.parse(raw) };
        }
      } catch (e) {
        console.warn('settings load failed', e);
      }
      this.loaded = true;
      this.emit();
    })();
    return this.loadPromise;
  }

  getState(): NotificationSettings {
    return this.state;
  }

  isLoaded() {
    return this.loaded;
  }

  subscribe(l: Listener): () => void {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }

  private emit() {
    this.listeners.forEach((l) => l(this.state));
  }

  private async persist() {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('settings persist failed', e);
    }
  }

  async set(partial: Partial<NotificationSettings>): Promise<NotificationSettings> {
    this.state = { ...this.state, ...partial };
    this.emit();
    await this.persist();
    return this.state;
  }
}

export const settingsStore = new SettingsStore();

export function useSettings() {
  const [state, setState] = useState<NotificationSettings>(settingsStore.getState());
  const [loaded, setLoaded] = useState(settingsStore.isLoaded());

  useEffect(() => {
    let active = true;
    settingsStore.load().then(() => {
      if (active) {
        setState(settingsStore.getState());
        setLoaded(true);
      }
    });
    const unsub = settingsStore.subscribe((s) => {
      if (active) setState(s);
    });
    return () => {
      active = false;
      unsub();
    };
  }, []);

  const set = useCallback(
    (partial: Partial<NotificationSettings>) => settingsStore.set(partial),
    [],
  );

  return { state, loaded, set };
}
