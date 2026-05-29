import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'daily_learner_state_v1';

export type Attempt = {
  score: number;
  total: number;
  passed: boolean;
  date: string;
};

export type ProgressState = {
  passedTopics: Record<string, true>;
  attempts: Record<string, Attempt[]>;
  completedDays: Record<number, true>;
  currentDay: number;
};

const initialState: ProgressState = {
  passedTopics: {},
  attempts: {},
  completedDays: {},
  currentDay: 1,
};

type Listener = (s: ProgressState) => void;

class ProgressStore {
  private state: ProgressState = initialState;
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
          const parsed = JSON.parse(raw);
          this.state = { ...initialState, ...parsed };
        }
      } catch (e) {
        console.warn('progress load failed', e);
      }
      this.loaded = true;
      this.emit();
    })();
    return this.loadPromise;
  }

  getState(): ProgressState {
    return this.state;
  }

  isLoaded() {
    return this.loaded;
  }

  subscribe(l: Listener): () => void {
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }

  private async persist() {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('progress persist failed', e);
    }
  }

  private emit() {
    this.listeners.forEach((l) => l(this.state));
  }

  private update(mutator: (s: ProgressState) => ProgressState) {
    this.state = mutator(this.state);
    this.emit();
    void this.persist();
  }

  markTopicPassed(id: string) {
    this.update((s) => ({
      ...s,
      passedTopics: { ...s.passedTopics, [id]: true },
    }));
  }

  recordAttempt(id: string, attempt: Attempt) {
    this.update((s) => ({
      ...s,
      attempts: {
        ...s.attempts,
        [id]: [attempt, ...(s.attempts[id] ?? [])],
      },
      passedTopics: attempt.passed
        ? { ...s.passedTopics, [id]: true }
        : s.passedTopics,
    }));
  }

  toggleDayDone(day: number) {
    this.update((s) => {
      const next = { ...s.completedDays };
      if (next[day]) {
        delete next[day];
      } else {
        next[day] = true;
      }
      const completedSorted = Object.keys(next)
        .map((n) => Number(n))
        .sort((a, b) => a - b);
      const nextDay =
        completedSorted.length > 0
          ? Math.min(60, Math.max(...completedSorted) + 1)
          : 1;
      return { ...s, completedDays: next, currentDay: nextDay };
    });
  }

  setCurrentDay(day: number) {
    this.update((s) => ({ ...s, currentDay: day }));
  }

  reset() {
    this.update(() => ({ ...initialState }));
  }
}

export const progressStore = new ProgressStore();

export function useProgress() {
  const [state, setState] = useState<ProgressState>(progressStore.getState());
  const [loaded, setLoaded] = useState(progressStore.isLoaded());

  useEffect(() => {
    let active = true;
    progressStore.load().then(() => {
      if (active) {
        setState(progressStore.getState());
        setLoaded(true);
      }
    });
    const unsub = progressStore.subscribe((s) => {
      if (active) setState(s);
    });
    return () => {
      active = false;
      unsub();
    };
  }, []);

  const markTopicPassed = useCallback(
    (id: string) => progressStore.markTopicPassed(id),
    [],
  );
  const recordAttempt = useCallback(
    (id: string, a: Attempt) => progressStore.recordAttempt(id, a),
    [],
  );
  const toggleDayDone = useCallback(
    (d: number) => progressStore.toggleDayDone(d),
    [],
  );
  const setCurrentDay = useCallback(
    (d: number) => progressStore.setCurrentDay(d),
    [],
  );
  const reset = useCallback(() => progressStore.reset(), []);

  return {
    state,
    loaded,
    markTopicPassed,
    recordAttempt,
    toggleDayDone,
    setCurrentDay,
    reset,
  };
}
