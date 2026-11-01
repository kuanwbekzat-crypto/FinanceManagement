import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link, router } from 'expo-router';
import { colors, fonts, radius } from '../../shared/theme/tokens';
import Icon from '../../shared/ui/Icon';
import { Brand, PrimaryButton, ScreenFrame } from '../../shared/ui/Primitives';

function PreviewCard() {
  const bars = [32, 52, 40, 72, 48, 88, 64];
  return (
    <View style={styles.previewCard}>
      <View style={styles.previewHeader}><View><Text style={styles.previewLabel}>TOTAL BALANCE</Text><Text style={styles.previewBalance}>$7,783.00</Text></View><View style={styles.previewBadge}><Icon name="arrowUp" size={13} color={colors.black} /></View></View>
      <View style={styles.previewChart}>{bars.map((height, index) => <View key={index} style={[styles.previewBar, index === 5 && styles.previewBarActive, { height }]} />)}</View>
      <View style={styles.previewFooter}><View style={styles.previewMiniIcon}><Icon name="wallet" size={15} color={colors.primary} /></View><View><Text style={styles.previewLabel}>SAVINGS THIS MONTH</Text><Text style={styles.previewSave}>+$1,320.00</Text></View><Text style={styles.previewChange}>+12.8%</Text></View>
    </View>
  );
}

export function WelcomeScreen() {
  return (
    <ScreenFrame>
      <ScrollView contentContainerStyle={styles.welcomePage} showsVerticalScrollIndicator={false}>
        <Brand />
        <View style={styles.welcomeCopy}><Text style={styles.welcomeEyebrow}>A BETTER WAY TO BUDGET</Text><Text style={styles.welcomeTitle}>Money, made <Text style={styles.welcomeAccent}>simple.</Text></Text><Text style={styles.welcomeText}>See the full picture, spend with intention, and make room for what matters.</Text></View>
        <PreviewCard />
        <View style={styles.welcomeActions}>
          <PrimaryButton title="Get started" onPress={() => router.push('/onboarding-one' as never)} />
          <View style={styles.loginRow}><Text style={styles.loginText}>Already have an account? </Text><Link href="/login" style={styles.loginLink}>Log in</Link></View>
        </View>
      </ScrollView>
    </ScreenFrame>
  );
}

export function OnboardingOneScreen() {
  return <OnboardingScreen step={1} title="See where it goes." caption="Track every expense in one calm, clear place." next="Next" onNext={() => router.push('/onboarding-two' as never)} />;
}

export function OnboardingTwoScreen() {
  return <OnboardingScreen step={2} title="Make room for more." caption="Set thoughtful goals and build a future that feels like yours." next="Create my account" onNext={() => router.push('/signup' as never)} />;
}

function OnboardingScreen({ step, title, caption, next, onNext }: { step: 1 | 2; title: string; caption: string; next: string; onNext: () => void }) {
  return (
    <ScreenFrame>
      <View style={styles.onboardingPage}>
        <View style={styles.onboardingTop}><Brand compact /><Link href="/login" style={styles.skipLink}>Skip</Link></View>
        <View style={styles.onboardArt}>
          <View style={styles.orbit} />
          <View style={styles.artIcon}><Icon name={step === 1 ? 'analysis' : 'savings'} size={46} color={colors.primary} /></View>
          <View style={styles.floatCard}><Text style={styles.floatLabel}>{step === 1 ? 'THIS WEEK' : 'YOUR GOAL'}</Text><Text style={styles.floatValue}>{step === 1 ? '-$284.30' : '$2,000'}</Text><View style={styles.floatLine}><View style={styles.floatProgress} /></View></View>
          <View style={styles.floatBadge}><Icon name={step === 1 ? 'check' : 'spark'} size={16} color={colors.black} /></View>
        </View>
        <View style={styles.onboardText}><Text style={styles.stepLabel}>0{step} <Text style={styles.stepDivider}>/ 02</Text></Text><Text style={styles.onboardTitle}>{title}</Text><Text style={styles.onboardCaption}>{caption}</Text></View>
        <View style={styles.onboardBottom}><View style={styles.dots}><View style={[styles.dot, step === 1 && styles.dotActive]} /><View style={[styles.dot, step === 2 && styles.dotActive]} /></View><PrimaryButton title={next} icon={step === 2 ? 'chevron' : undefined} onPress={onNext} /></View>
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  welcomePage: { width: '100%', maxWidth: 520, alignSelf: 'center', flexGrow: 1, paddingHorizontal: 25, paddingTop: 22, paddingBottom: 24, justifyContent: 'space-between' },
  welcomeCopy: { marginTop: 40, marginBottom: 28 },
  welcomeEyebrow: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 9, letterSpacing: 1.8 },
  welcomeTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 42, lineHeight: 50, marginTop: 12, maxWidth: 360 },
  welcomeAccent: { color: colors.primary },
  welcomeText: { color: colors.muted, fontFamily: fonts.regular, fontSize: 13, lineHeight: 21, marginTop: 11, maxWidth: 350 },
  previewCard: { borderRadius: radius.lg, backgroundColor: colors.surface, padding: 19, borderWidth: 1, borderColor: colors.border },
  previewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  previewLabel: { color: colors.muted, fontFamily: fonts.semiBold, fontSize: 8, letterSpacing: 1 },
  previewBalance: { color: colors.text, fontFamily: fonts.bold, fontSize: 24, marginTop: 5 },
  previewBadge: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary },
  previewChart: { height: 94, marginVertical: 13, flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  previewBar: { flex: 1, borderRadius: 5, backgroundColor: colors.surfaceSoft },
  previewBarActive: { backgroundColor: colors.primary },
  previewFooter: { flexDirection: 'row', alignItems: 'center', gap: 9, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 13 },
  previewMiniIcon: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceSoft },
  previewSave: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 10, marginTop: 3 },
  previewChange: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 9, marginLeft: 'auto' },
  welcomeActions: { marginTop: 22 },
  loginRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  loginText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 11 },
  loginLink: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 11 },
  onboardingPage: { flex: 1, width: '100%', maxWidth: 520, alignSelf: 'center', paddingHorizontal: 24, paddingTop: 15, paddingBottom: 20 },
  onboardingTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  skipLink: { color: colors.muted, fontFamily: fonts.medium, fontSize: 11, padding: 8 },
  onboardArt: { flex: 1, minHeight: 300, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  orbit: { width: 250, height: 250, borderRadius: 125, borderWidth: 1, borderColor: colors.border, position: 'absolute' },
  artIcon: { width: 118, height: 118, borderRadius: 38, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  floatCard: { position: 'absolute', left: 0, top: '24%', backgroundColor: colors.surfaceRaised, borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 13, minWidth: 126 },
  floatLabel: { color: colors.muted, fontFamily: fonts.semiBold, fontSize: 8, letterSpacing: 0.7 },
  floatValue: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 15, marginTop: 6 },
  floatLine: { height: 4, backgroundColor: colors.surfaceSoft, borderRadius: 4, marginTop: 9, overflow: 'hidden' },
  floatProgress: { width: '68%', height: 4, borderRadius: 4, backgroundColor: colors.primary },
  floatBadge: { position: 'absolute', right: 22, bottom: '25%', width: 38, height: 38, borderRadius: 14, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  onboardText: { paddingBottom: 18 },
  stepLabel: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 10, letterSpacing: 1 },
  stepDivider: { color: colors.muted },
  onboardTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 29, marginTop: 10 },
  onboardCaption: { color: colors.muted, fontFamily: fonts.regular, fontSize: 13, lineHeight: 21, marginTop: 7, maxWidth: 340 },
  onboardBottom: { gap: 18 },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.surfaceSoft },
  dotActive: { width: 20, borderRadius: 4, backgroundColor: colors.primary },
});
