import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Badge } from '@/components/Badge';
import { PressableCard } from '@/components/Card';
import { ProgressBar } from '@/components/ProgressBar';
import { T } from '@/components/Typography';
import { Palette, Spacing, tagColors } from '@/constants/theme';
import { PHASES } from '@/data/phases';
import { TOPICS, topicsByPhase } from '@/data/topics';
import { useProgress } from '@/store/progress';

export default function LearningPathScreen() {
  const router = useRouter();
  const { state } = useProgress();

  const totalTopics = TOPICS.length;
  const passedCount = Object.keys(state.passedTopics).length;
  const percent = (passedCount / totalTopics) * 100;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Palette.cream }}
      contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.hero}>
        <T variant="label" color={Palette.resolve}>
          Learning Roadmap · Gaming YouTube
        </T>
        <T variant="hero" style={{ marginTop: 10 }}>
          From Raw Footage to Captivating Content
        </T>
        <T
          variant="body"
          color={'rgba(247,244,239,0.7)'}
          style={{ marginTop: 14, maxWidth: 480 }}>
          A structured path through DaVinci Resolve, Photoshop, and YouTube craft — with practical exercises, flashcards, and quizzes baked in.
        </T>
      </View>

      <View style={styles.progressCard}>
        <View style={styles.progressHeader}>
          <T variant="h3">Your Progress</T>
          <T variant="mono">
            {passedCount} / {totalTopics} complete
          </T>
        </View>
        <ProgressBar percent={percent} />
        <T variant="small" style={{ marginTop: 12 }}>
          Pass a topic{"’"}s quiz with 10/10 to unlock its checkbox. Quizzes are retakeable any time.
        </T>
      </View>

      {PHASES.map((phase) => {
        const topics = topicsByPhase(phase.number);
        return (
          <View key={phase.number} style={styles.phase}>
            <View style={styles.phaseHeader}>
              <T variant="hero" style={styles.phaseNumber}>
                {String(phase.number).padStart(2, '0')}
              </T>
              <View style={{ flex: 1 }}>
                <Badge tag={phase.tag} label={phase.badgeLabel} />
                <T variant="h2" style={{ marginTop: 8 }}>
                  {phase.title}
                </T>
                <T variant="small" style={{ marginTop: 4 }}>
                  {phase.subtitle}
                </T>
              </View>
            </View>

            <View style={{ gap: 12, marginTop: 18 }}>
              {topics.map((topic) => {
                const passed = !!state.passedTopics[topic.id];
                const tag = tagColors(topic.iconTag);
                return (
                  <PressableCard
                    key={topic.id}
                    onPress={() => router.push(`/topic/${topic.id}`)}
                    style={passed ? { borderColor: Palette.successBorder } : undefined}>
                    <View style={styles.topicRow}>
                      <View
                        style={[
                          styles.iconBox,
                          { backgroundColor: tag.bg },
                        ]}>
                        <T style={{ fontSize: 18 }}>{topic.icon}</T>
                      </View>
                      <View style={{ flex: 1 }}>
                        <T variant="h3">{topic.title}</T>
                        <T variant="small" style={{ marginTop: 2 }}>
                          {topic.steps.length} steps · 10 quiz Qs
                        </T>
                      </View>
                      <T style={{ fontSize: 20, color: Palette.muted }}>
                        {passed ? '✓' : '›'}
                      </T>
                    </View>
                  </PressableCard>
                );
              })}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: Palette.dark,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.six,
  },
  progressCard: {
    margin: Spacing.four,
    padding: Spacing.four,
    backgroundColor: Palette.card,
    borderColor: Palette.border,
    borderWidth: 1,
    borderRadius: 10,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  phase: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.five,
  },
  phaseHeader: {
    flexDirection: 'row',
    gap: Spacing.three,
    paddingBottom: Spacing.three,
    borderBottomColor: Palette.border,
    borderBottomWidth: 1,
  },
  phaseNumber: {
    color: Palette.border,
    fontSize: 56,
    lineHeight: 56,
  },
  topicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.three,
    gap: Spacing.three,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
