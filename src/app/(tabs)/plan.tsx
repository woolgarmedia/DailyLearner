import { useRouter } from 'expo-router';
import { useMemo, useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { PressableCard } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { T } from '@/components/Typography';
import { Palette, Spacing } from '@/constants/theme';
import { PLAN, type PlanDay } from '@/data/plan';
import { topicById } from '@/data/topics';
import { useProgress } from '@/store/progress';

const KIND_META: Record<PlanDay['kind'], { color: string; bg: string; label: string }> = {
  lesson: { color: Palette.resolve, bg: Palette.resolveLight, label: 'LESSON' },
  drill: { color: Palette.photoshop, bg: Palette.photoshopLight, label: 'DRILL' },
  review: { color: Palette.allBadge, bg: Palette.allBadgeLight, label: 'REVIEW' },
  production: { color: Palette.youtube, bg: Palette.youtubeLight, label: 'PRODUCTION' },
};

export default function PlanScreen() {
  const router = useRouter();
  const { state } = useProgress();
  const scrollRef = useRef<ScrollView>(null);

  const completed = Object.keys(state.completedDays).length;
  const percent = (completed / PLAN.length) * 100;

  const groupedByPhase = useMemo(() => {
    const groups: { phase: number; days: PlanDay[] }[] = [];
    for (const day of PLAN) {
      const phaseFromTopic = day.topicId
        ? topicById(day.topicId)?.phase
        : undefined;
      const phaseRange =
        day.day <= 12 ? 1 : day.day <= 30 ? 2 : day.day <= 40 ? 3 : day.day <= 50 ? 4 : 5;
      const p = phaseFromTopic ?? phaseRange;
      const existing = groups.find((g) => g.phase === p);
      if (existing) {
        existing.days.push(day);
      } else {
        groups.push({ phase: p, days: [day] });
      }
    }
    return groups;
  }, []);

  useEffect(() => {
    // Best-effort scroll to current-day on mount
    const idx = PLAN.findIndex((d) => d.day === state.currentDay);
    if (idx > 0) {
      // Defer until layout settles
      setTimeout(() => {
        scrollRef.current?.scrollTo({ y: idx * 116, animated: false });
      }, 100);
    }
  }, [state.currentDay]);

  return (
    <ScrollView
      ref={scrollRef}
      style={{ flex: 1, backgroundColor: Palette.cream }}
      contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <T variant="label" color={Palette.accent}>
          60-Day Plan · Roughly 1 hour per day
        </T>
        <T variant="hero" color={Palette.dark} style={{ marginTop: 8 }}>
          One day at a time
        </T>
        <View style={{ marginTop: 18 }}>
          <View style={styles.progressRow}>
            <T variant="h3">Days complete</T>
            <T variant="mono">
              {completed} / {PLAN.length}
            </T>
          </View>
          <ProgressBar percent={percent} />
          <T variant="small" style={{ marginTop: 8 }}>
            Today is suggested as Day {state.currentDay}. Tap any day to see the lesson, exercise, and deliverable.
          </T>
        </View>
      </View>

      {groupedByPhase.map((group) => (
        <View key={group.phase} style={{ marginTop: Spacing.five }}>
          <View style={styles.phaseHeader}>
            <T variant="label" color={Palette.muted}>
              Phase {group.phase}
            </T>
          </View>
          <View style={{ gap: 10, paddingHorizontal: Spacing.four }}>
            {group.days.map((day) => {
              const done = !!state.completedDays[day.day];
              const current = day.day === state.currentDay;
              const meta = KIND_META[day.kind];
              const minutes = day.blocks.reduce(
                (sum, b) => sum + b.minutes,
                0,
              );
              return (
                <PressableCard
                  key={day.day}
                  onPress={() => router.push(`/day/${day.day}`)}
                  style={[
                    done && { borderColor: Palette.successBorder, backgroundColor: Palette.successBg },
                    current && !done && { borderColor: Palette.accent, borderWidth: 2 },
                  ]}>
                  <View style={styles.dayRow}>
                    <View style={styles.dayBadge}>
                      <T
                        variant="mono"
                        color={Palette.muted}
                        style={{ fontSize: 9, letterSpacing: 1 }}>
                        DAY
                      </T>
                      <T
                        variant="h2"
                        style={{
                          color: done ? Palette.success : Palette.dark,
                          lineHeight: 28,
                        }}>
                        {day.day}
                      </T>
                    </View>
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 8,
                          marginBottom: 4,
                        }}>
                        <View
                          style={[
                            styles.kindPill,
                            { backgroundColor: meta.bg },
                          ]}>
                          <T variant="label" color={meta.color}>
                            {meta.label}
                          </T>
                        </View>
                        <T variant="small">{minutes} min total</T>
                      </View>
                      <T variant="h3">{day.title}</T>
                      <T variant="small" style={{ marginTop: 4 }} numberOfLines={2}>
                        Deliverable: {day.deliverable}
                      </T>
                    </View>
                    <T style={{ fontSize: 20, color: Palette.muted }}>
                      {done ? '✓' : current ? '›' : '›'}
                    </T>
                  </View>
                </PressableCard>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
    paddingBottom: Spacing.three,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  phaseHeader: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.two,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 14,
  },
  dayBadge: {
    width: 52,
    height: 52,
    borderRadius: 8,
    backgroundColor: Palette.cardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kindPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
});
