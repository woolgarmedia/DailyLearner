import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { T } from '@/components/Typography';
import { Palette, Spacing } from '@/constants/theme';
import { QUIZZES } from '@/data/quizzes';
import { topicById } from '@/data/topics';
import { useProgress } from '@/store/progress';

export default function CompletedScreen() {
  const router = useRouter();
  const { state } = useProgress();

  const ids = Object.keys(state.attempts);

  if (ids.length === 0) {
    return (
      <View style={styles.empty}>
        <T style={{ fontSize: 48, marginBottom: 12 }}>📋</T>
        <T variant="h2" style={{ textAlign: 'center' }}>
          No quizzes attempted yet
        </T>
        <T
          variant="body"
          style={{ textAlign: 'center', marginTop: 8, paddingHorizontal: 40 }}>
          Head to the Learning Path and take your first quiz to start tracking attempts.
        </T>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Palette.cream }}
      contentContainerStyle={{ padding: Spacing.four, paddingBottom: Spacing.seven }}>
      <T variant="label" color={Palette.muted}>
        Attempt history
      </T>
      <T variant="h1" style={{ marginTop: 8 }}>
        Completed Quizzes
      </T>
      <T variant="small" style={{ marginTop: 8, marginBottom: Spacing.four }}>
        All quiz attempts — passed and failed. Retake any time to sharpen.
      </T>

      <View style={{ gap: 12 }}>
        {ids.map((id) => {
          const quiz = QUIZZES[id];
          const topic = topicById(id);
          const attempts = state.attempts[id] ?? [];
          const best = attempts.reduce(
            (b, a) => (a.score > b.score ? a : b),
            attempts[0],
          );
          const passed = !!state.passedTopics[id];
          return (
            <Card key={id} style={{ padding: 14 }}>
              <View style={styles.row}>
                <View style={[styles.badge, { backgroundColor: passed ? Palette.successBg : Palette.cardAlt }]}>
                  <T style={{ fontSize: 18 }}>{topic?.icon ?? '📋'}</T>
                </View>
                <View style={{ flex: 1 }}>
                  <T variant="h3">{quiz?.title ?? id}</T>
                  <T variant="small" style={{ marginTop: 2 }}>
                    {attempts.length} attempt{attempts.length !== 1 ? 's' : ''} · Best {best.score}/10
                    {passed ? ' · Passed ✓' : ''}
                  </T>
                </View>
                <Button
                  label="Retake"
                  variant="secondary"
                  onPress={() => router.push(`/quiz/${id}`)}
                />
              </View>
              <View style={styles.attemptList}>
                {attempts.slice(0, 5).map((a, i) => (
                  <View key={i} style={styles.attemptRow}>
                    <T
                      variant="mono"
                      color={a.passed ? Palette.success : Palette.error}>
                      {a.score}/{a.total} {a.passed ? '✓' : ''}
                    </T>
                    <T variant="small">{a.date}</T>
                  </View>
                ))}
                {attempts.length > 5 ? (
                  <T variant="small" style={{ marginTop: 4 }}>
                    + {attempts.length - 5} earlier attempt{attempts.length - 5 !== 1 ? 's' : ''}
                  </T>
                ) : null}
              </View>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    backgroundColor: Palette.cream,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attemptList: {
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Palette.border,
  },
  attemptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
});
