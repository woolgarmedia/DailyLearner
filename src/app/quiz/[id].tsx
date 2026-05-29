import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { T } from '@/components/Typography';
import { Fonts, Palette, Radius, Spacing } from '@/constants/theme';
import { QUIZZES } from '@/data/quizzes';
import { useProgress } from '@/store/progress';

export default function QuizScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const quizId = String(params.id);
  const quiz = QUIZZES[quizId];
  const { recordAttempt } = useProgress();

  const [qIdx, setQIdx] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [savedThisRun, setSavedThisRun] = useState(false);

  const question = quiz?.questions[qIdx];
  const total = quiz?.questions.length ?? 0;

  const onSelect = (idx: number) => {
    if (chosen !== null) return;
    setChosen(idx);
    if (question && idx === question.correct) {
      setScore((s) => s + 1);
    }
  };

  const onNext = () => {
    if (qIdx < total - 1) {
      setQIdx(qIdx + 1);
      setChosen(null);
    } else {
      const passed = score === total;
      const date = new Date().toLocaleString('en-AU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      if (!savedThisRun) {
        recordAttempt(quizId, { score, total, passed, date });
        setSavedThisRun(true);
      }
      setShowResult(true);
    }
  };

  const retake = () => {
    setQIdx(0);
    setChosen(null);
    setScore(0);
    setShowResult(false);
    setSavedThisRun(false);
  };

  if (!quiz) {
    return (
      <View style={{ padding: 24 }}>
        <T variant="h2">Quiz not found.</T>
      </View>
    );
  }

  if (showResult) {
    const passed = score === total;
    return (
      <>
        <Stack.Screen options={{ title: quiz.title }} />
        <ScrollView
          style={{ flex: 1, backgroundColor: Palette.cream }}
          contentContainerStyle={styles.resultScroll}>
          <View
            style={[
              styles.scoreCircle,
              {
                borderColor: passed ? Palette.success : Palette.error,
                backgroundColor: passed ? Palette.successBg : Palette.errorBg,
              },
            ]}>
            <T
              variant="h1"
              color={passed ? Palette.success : Palette.error}>
              {score}/{total}
            </T>
          </View>
          <T variant="h1" style={{ textAlign: 'center', marginTop: Spacing.three }}>
            {passed ? 'Perfect score!' : 'Not quite there yet'}
          </T>
          <T
            variant="body"
            style={{ textAlign: 'center', marginTop: Spacing.two, paddingHorizontal: 20 }}>
            {passed
              ? 'Topic unlocked. Head back and tick it off your list.'
              : `You need 10/10 to unlock this topic. Review the content and retake.`}
          </T>
          <View style={{ marginTop: Spacing.five, gap: 10, width: '100%' }}>
            <Button label="Retake Quiz" variant="secondary" onPress={retake} />
            <Button
              label={passed ? 'Done — Topic Unlocked ✓' : 'Back to Topic'}
              variant={passed ? 'success' : 'primary'}
              onPress={() => router.back()}
            />
          </View>
        </ScrollView>
      </>
    );
  }

  if (!question) return null;

  return (
    <>
      <Stack.Screen options={{ title: quiz.title }} />
      <ScrollView
        style={{ flex: 1, backgroundColor: Palette.cream }}
        contentContainerStyle={styles.scroll}>
        <ProgressBar percent={(qIdx / total) * 100} height={4} />

        <T variant="label" style={{ marginTop: Spacing.three }}>
          Question {qIdx + 1} of {total}
        </T>
        <T variant="h2" style={{ marginTop: 12, lineHeight: 28 }}>
          {question.q}
        </T>

        <View style={{ marginTop: Spacing.four, gap: 10 }}>
          {question.options.map((opt, i) => {
            const isChosen = chosen === i;
            const isCorrect = i === question.correct;
            const revealing = chosen !== null;
            const isWrong = isChosen && !isCorrect;
            const showAsCorrect = revealing && isCorrect;

            return (
              <Pressable
                key={i}
                onPress={() => onSelect(i)}
                disabled={revealing}
                style={[
                  styles.option,
                  showAsCorrect && {
                    backgroundColor: Palette.successBg,
                    borderColor: Palette.success,
                  },
                  isWrong && {
                    backgroundColor: Palette.errorBg,
                    borderColor: Palette.error,
                  },
                ]}>
                <View
                  style={[
                    styles.optionLetter,
                    showAsCorrect && {
                      backgroundColor: Palette.success,
                      borderColor: Palette.success,
                    },
                    isWrong && {
                      backgroundColor: Palette.error,
                      borderColor: Palette.error,
                    },
                  ]}>
                  <T
                    style={{
                      fontFamily: Fonts.monoMedium,
                      fontSize: 11,
                      color:
                        showAsCorrect || isWrong ? Palette.cream : Palette.dark,
                    }}>
                    {String.fromCharCode(65 + i)}
                  </T>
                </View>
                <T
                  variant="body"
                  style={{ flex: 1 }}
                  color={
                    showAsCorrect
                      ? '#1A5235'
                      : isWrong
                        ? '#7A1C1C'
                        : Palette.dark
                  }>
                  {opt}
                </T>
              </Pressable>
            );
          })}
        </View>

        {chosen !== null ? (
          <View
            style={[
              styles.feedback,
              chosen === question.correct ? styles.feedbackCorrect : styles.feedbackIncorrect,
            ]}>
            <T
              variant="body"
              color={chosen === question.correct ? '#1A5235' : '#7A1C1C'}>
              {chosen === question.correct ? '✓ Correct. ' : '✗ Not quite. '}
              {question.explanation}
            </T>
          </View>
        ) : null}

        {chosen !== null ? (
          <View style={{ marginTop: Spacing.four }}>
            <Button
              label={qIdx < total - 1 ? 'Next →' : 'See Results'}
              onPress={onNext}
            />
          </View>
        ) : null}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: Spacing.four,
    paddingBottom: Spacing.seven,
  },
  resultScroll: {
    padding: Spacing.four,
    paddingTop: Spacing.seven,
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: Palette.border,
    borderRadius: Radius.lg,
    backgroundColor: Palette.card,
  },
  optionLetter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Palette.cardAlt,
    borderWidth: 1,
    borderColor: Palette.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  feedback: {
    marginTop: Spacing.three,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  feedbackCorrect: {
    backgroundColor: Palette.successBg,
    borderColor: Palette.successBorder,
  },
  feedbackIncorrect: {
    backgroundColor: Palette.errorBg,
    borderColor: Palette.errorBorder,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
