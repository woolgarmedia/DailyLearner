import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { T } from '@/components/Typography';
import { Fonts, Palette, Radius, Spacing, tagColors } from '@/constants/theme';
import { PHASES } from '@/data/phases';
import { topicById } from '@/data/topics';
import { useProgress } from '@/store/progress';

export default function TopicScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { state } = useProgress();

  const topic = topicById(String(params.id));
  if (!topic) {
    return (
      <View style={{ padding: 24 }}>
        <T variant="h2">Topic not found.</T>
      </View>
    );
  }

  const phase = PHASES.find((p) => p.number === topic.phase);
  const passed = !!state.passedTopics[topic.id];
  const attempts = state.attempts[topic.id] ?? [];

  return (
    <>
      <Stack.Screen options={{ title: phase?.badgeLabel ?? 'Topic' }} />
      <ScrollView
        style={{ flex: 1, backgroundColor: Palette.cream }}
        contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          {phase ? <Badge tag={phase.tag} label={phase.badgeLabel} /> : null}
          <T variant="h1" style={{ marginTop: 10 }}>
            {topic.icon}  {topic.title}
          </T>
          {passed ? (
            <View style={styles.passedPill}>
              <T variant="label" color={Palette.success}>
                ✓ Quiz passed
              </T>
            </View>
          ) : null}
        </View>

        <Section label="What to learn — step by step">
          {topic.steps.map((step, idx) => (
            <View key={idx} style={styles.stepRow}>
              <View style={styles.stepNum}>
                <T
                  style={{
                    fontFamily: Fonts.monoMedium,
                    fontSize: 11,
                    color: Palette.cream,
                  }}>
                  {idx + 1}
                </T>
              </View>
              <T variant="body" style={{ flex: 1 }}>
                {step}
              </T>
            </View>
          ))}
        </Section>

        {topic.shortcuts?.length ? (
          <Section label="Essential keyboard shortcuts">
            <Card>
              {topic.shortcuts.map((s, i) => (
                <View
                  key={i}
                  style={[
                    styles.shortcutRow,
                    i === (topic.shortcuts?.length ?? 0) - 1
                      ? { borderBottomWidth: 0 }
                      : null,
                  ]}>
                  <T variant="body" style={{ flex: 1 }}>
                    {s.action}
                  </T>
                  <View style={styles.kbd}>
                    <T
                      style={{
                        fontFamily: Fonts.mono,
                        fontSize: 11,
                        color: Palette.cream,
                      }}>
                      {s.keys}
                    </T>
                  </View>
                </View>
              ))}
            </Card>
          </Section>
        ) : null}

        <Section label="How to remember it">
          <View style={{ gap: 10 }}>
            {topic.memory.map((m, i) => (
              <MemoryCard key={i} m={m} />
            ))}
          </View>
        </Section>

        {topic.tip ? (
          <View style={styles.tip}>
            <T
              variant="small"
              color={Palette.tipText}
              style={{ fontFamily: Fonts.sansSemibold, marginBottom: 4 }}>
              {topic.tip.title}
            </T>
            <T variant="body" color={Palette.tipText}>
              {topic.tip.body}
            </T>
          </View>
        ) : null}

        <View style={{ marginTop: Spacing.five, gap: 10 }}>
          <Button
            label={passed ? 'Retake Quiz' : 'Take Quiz to Unlock'}
            variant={passed ? 'success' : 'primary'}
            onPress={() => router.push(`/quiz/${topic.id}`)}
          />
          <T variant="small" style={{ textAlign: 'center' }}>
            {passed
              ? `Best score so far: ${Math.max(...attempts.map((a) => a.score), 0)}/10`
              : 'Score 100% to check this topic off your list'}
          </T>
        </View>
      </ScrollView>
    </>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={{ marginTop: Spacing.five }}>
      <T variant="label" style={{ marginBottom: 12 }}>
        {label}
      </T>
      {children}
    </View>
  );
}

function MemoryCard({ m }: { m: import('@/data/topics').MemoryCard }) {
  const colors =
    m.kind === 'flashcard'
      ? {
          bg: Palette.flashcardBg,
          border: Palette.flashcardBorder,
          text: Palette.flashcardText,
          label: '✦ Flashcard',
        }
      : m.kind === 'exercise'
        ? {
            bg: Palette.exerciseBg,
            border: Palette.exerciseBorder,
            text: Palette.exerciseText,
            label: '▶ Practical Exercise',
          }
        : {
            bg: Palette.quizBg,
            border: Palette.quizBorder,
            text: Palette.quizText,
            label: '? Self-Quiz',
          };

  return (
    <View
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: Radius.md,
        padding: 14,
      }}>
      <T variant="label" color={colors.text} style={{ marginBottom: 6 }}>
        {colors.label}
      </T>
      <T variant="body" color={Palette.mid}>
        {m.text}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: Spacing.four,
    paddingBottom: Spacing.seven,
  },
  header: {
    marginBottom: Spacing.three,
  },
  passedPill: {
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: Palette.successBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    borderColor: Palette.successBorder,
    borderWidth: 1,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  stepNum: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Palette.dark,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  shortcutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EDE8',
  },
  kbd: {
    backgroundColor: Palette.dark,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  tip: {
    marginTop: Spacing.four,
    backgroundColor: Palette.tipBg,
    borderColor: Palette.tipBorder,
    borderLeftColor: Palette.tipAccent,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderRadius: 6,
    padding: 14,
  },
});
