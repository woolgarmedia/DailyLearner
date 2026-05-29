import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card, PressableCard } from '@/components/Card';
import { T } from '@/components/Typography';
import { Palette, Radius, Spacing } from '@/constants/theme';
import { dayByNumber } from '@/data/plan';
import { topicById } from '@/data/topics';
import { useProgress } from '@/store/progress';

const KIND_LABELS = {
  lesson: 'Lesson Day',
  drill: 'Drill Day',
  review: 'Review Day',
  production: 'Production Day',
} as const;

export default function DayScreen() {
  const params = useLocalSearchParams<{ num: string }>();
  const router = useRouter();
  const { state, toggleDayDone } = useProgress();

  const day = dayByNumber(Number(params.num));
  if (!day) {
    return (
      <View style={{ padding: 24 }}>
        <T variant="h2">Day not found.</T>
      </View>
    );
  }

  const done = !!state.completedDays[day.day];
  const topic = day.topicId ? topicById(day.topicId) : null;
  const totalMinutes = day.blocks.reduce((sum, b) => sum + b.minutes, 0);

  return (
    <>
      <Stack.Screen options={{ title: `Day ${day.day}` }} />
      <ScrollView
        style={{ flex: 1, backgroundColor: Palette.cream }}
        contentContainerStyle={styles.scroll}>
        <T variant="label" color={Palette.muted}>
          {KIND_LABELS[day.kind]} · ~{totalMinutes} min
        </T>
        <T variant="h1" style={{ marginTop: 8 }}>
          Day {day.day} — {day.title}
        </T>

        {topic ? (
          <PressableCard
            onPress={() => router.push(`/topic/${topic.id}`)}
            style={{ marginTop: Spacing.three }}>
            <View style={styles.topicLink}>
              <T style={{ fontSize: 22 }}>{topic.icon}</T>
              <View style={{ flex: 1 }}>
                <T variant="label">Linked topic</T>
                <T variant="h3" style={{ marginTop: 2 }}>
                  {topic.title}
                </T>
              </View>
              <T style={{ fontSize: 20, color: Palette.muted }}>›</T>
            </View>
          </PressableCard>
        ) : null}

        <View style={{ marginTop: Spacing.five }}>
          <T variant="label" style={{ marginBottom: 12 }}>
            Today’s session
          </T>
          {day.blocks.map((block, i) => (
            <View key={i} style={styles.blockRow}>
              <View style={styles.timeChip}>
                <T variant="mono" color={Palette.dark}>
                  {block.minutes}m
                </T>
              </View>
              <T variant="body" style={{ flex: 1 }}>
                {block.label}
              </T>
            </View>
          ))}
        </View>

        <View style={{ marginTop: Spacing.five }}>
          <T variant="label" style={{ marginBottom: 10 }}>
            Today’s deliverable
          </T>
          <Card style={{ padding: 14, backgroundColor: Palette.flashcardBg, borderColor: Palette.flashcardBorder }}>
            <T variant="body" color={Palette.flashcardText}>
              {day.deliverable}
            </T>
          </Card>
        </View>

        {day.note ? (
          <View style={styles.note}>
            <T variant="small" color={Palette.tipText}>
              {day.note}
            </T>
          </View>
        ) : null}

        <View style={{ marginTop: Spacing.five, gap: 10 }}>
          <Button
            label={done ? 'Mark Day Incomplete' : 'Mark Day Complete'}
            variant={done ? 'secondary' : 'success'}
            onPress={() => toggleDayDone(day.day)}
          />
          {topic && !done ? (
            <Button
              label="Open Topic Quiz"
              variant="primary"
              onPress={() => router.push(`/quiz/${topic.id}`)}
            />
          ) : null}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: Spacing.four,
    paddingBottom: Spacing.seven,
  },
  topicLink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 14,
  },
  blockRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10,
  },
  timeChip: {
    minWidth: 44,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: Palette.cardAlt,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Palette.border,
    alignItems: 'center',
  },
  note: {
    marginTop: Spacing.three,
    backgroundColor: Palette.tipBg,
    borderColor: Palette.tipBorder,
    borderLeftColor: Palette.tipAccent,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
  },
});
