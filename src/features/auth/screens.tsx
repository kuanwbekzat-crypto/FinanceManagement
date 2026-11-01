import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, fonts } from '../../shared/theme/tokens';
import Icon from '../../shared/ui/Icon';
import { AuthFrame, PrimaryButton, TextField, TextLink } from '../../shared/ui/Primitives';

export function LoginScreen() {
  const [visible, setVisible] = useState(false);
  return (
    <AuthFrame title="Welcome back" subtitle="Pick up where you left off. Your finances are right where you left them.">
      <TextField label="Email address" placeholder="name@example.com" keyboardType="email-address" autoCapitalize="none" autoComplete="email" leading={<Icon name="mail" size={17} color={colors.muted} />} />
      <TextField
        label="Password"
        placeholder="Enter your password"
        secureTextEntry={!visible}
        autoComplete="current-password"
        leading={<Icon name="lock" size={17} color={colors.muted} />}
        trailing={<Pressable accessibilityRole="button" accessibilityLabel={visible ? 'Hide password' : 'Show password'} onPress={() => setVisible(!visible)}><Icon name={visible ? 'eyeOff' : 'eye'} size={18} color={colors.muted} /></Pressable>}
      />
      <TextLink style={styles.forgot} onPress={() => router.push('/forgot-password' as never)}>Forgot password?</TextLink>
      <PrimaryButton title="Log in" onPress={() => router.replace('/home' as never)} style={styles.formButton} />
      <View style={styles.footer}><Text style={styles.footerText}>New to Mint? </Text><TextLink onPress={() => router.push('/onboarding-one' as never)}>Create account</TextLink></View>
      <View style={styles.orRow}><View style={styles.rule} /><Text style={styles.orText}>OR CONTINUE WITH</Text><View style={styles.rule} /></View>
      <PrimaryButton title="Use fingerprint" icon="fingerprint" tone="secondary" onPress={() => router.push('/fingerprint' as never)} />
    </AuthFrame>
  );
}

export function SignUpScreen() {
  const [visible, setVisible] = useState(false);
  return (
    <AuthFrame title="Create your account" subtitle="A clearer picture of your money starts with a few details.">
      <TextField label="Full name" placeholder="Your name" autoComplete="name" leading={<Icon name="profile" size={17} color={colors.muted} />} />
      <TextField label="Email address" placeholder="name@example.com" keyboardType="email-address" autoCapitalize="none" autoComplete="email" leading={<Icon name="mail" size={17} color={colors.muted} />} />
      <TextField label="Password" placeholder="At least 8 characters" secureTextEntry={!visible} autoComplete="new-password" leading={<Icon name="lock" size={17} color={colors.muted} />} trailing={<Pressable onPress={() => setVisible(!visible)}><Icon name={visible ? 'eyeOff' : 'eye'} size={18} color={colors.muted} /></Pressable>} />
      <View style={styles.terms}><View style={styles.termsCheck}><Icon name="check" size={13} color={colors.black} /></View><Text style={styles.termsText}>I agree to the <Text style={styles.termsAccent}>Terms</Text> and <Text style={styles.termsAccent}>Privacy Policy</Text>.</Text></View>
      <PrimaryButton title="Create account" onPress={() => router.replace('/home' as never)} style={styles.formButton} />
      <View style={styles.footer}><Text style={styles.footerText}>Already have an account? </Text><TextLink onPress={() => router.push('/login' as never)}>Log in</TextLink></View>
    </AuthFrame>
  );
}

export function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  return (
    <AuthFrame title="Reset password" subtitle="Enter the email linked to your account and we’ll send a verification code.">
      <TextField label="Email address" placeholder="name@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoComplete="email" leading={<Icon name="mail" size={17} color={colors.muted} />} />
      <PrimaryButton title="Send verification code" onPress={() => router.push({ pathname: '/security-pin', params: { email: email || 'name@example.com' } } as never)} style={styles.formButton} />
      <TextLink style={styles.centerLink} onPress={() => router.back()}>Back to log in</TextLink>
    </AuthFrame>
  );
}

export function SecurityPinScreen() {
  const { email } = useLocalSearchParams<{ email?: string }>();
  const [code, setCode] = useState('');
  const [sentAgain, setSentAgain] = useState(false);
  return (
    <AuthFrame title="Check your inbox" subtitle={'We sent a six-digit code to ' + (email || 'your email address') + '.'}>
      <View style={styles.codeCard}><View style={styles.codeIcon}><Icon name="mail" size={22} color={colors.primary} /></View><Text style={styles.codeTitle}>Verification code</Text><Text style={styles.codeCaption}>Enter the code from your email</Text></View>
      <TextField label="6-digit code" placeholder="000000" value={code} onChangeText={(value) => setCode(value.replace(/\D/g, '').slice(0, 6))} keyboardType="number-pad" maxLength={6} style={styles.codeInput} />
      <PrimaryButton title="Verify code" onPress={() => router.push('/new-password' as never)} style={styles.formButton} />
      <View style={styles.footer}><Text style={styles.footerText}>{sentAgain ? 'A new code is on its way. ' : 'Didn’t get the email? '}</Text><TextLink onPress={() => setSentAgain(true)}>Send again</TextLink></View>
    </AuthFrame>
  );
}

export function NewPasswordScreen() {
  const [visible, setVisible] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <AuthFrame title={saved ? 'Password updated' : 'Create a new password'} subtitle={saved ? 'Your account is ready for a fresh start.' : 'Choose a strong password you haven’t used before.'}>
      {saved ? <View style={styles.successIcon}><Icon name="check" size={30} color={colors.black} /></View> : <>
        <TextField label="New password" placeholder="At least 8 characters" secureTextEntry={!visible} autoComplete="new-password" leading={<Icon name="lock" size={17} color={colors.muted} />} trailing={<Pressable onPress={() => setVisible(!visible)}><Icon name={visible ? 'eyeOff' : 'eye'} size={18} color={colors.muted} /></Pressable>} />
        <TextField label="Confirm password" placeholder="Enter it once more" secureTextEntry={!visible} autoComplete="new-password" leading={<Icon name="lock" size={17} color={colors.muted} />} />
      </>}
      <PrimaryButton title={saved ? 'Back to log in' : 'Update password'} onPress={() => saved ? router.replace('/login' as never) : setSaved(true)} style={styles.formButton} />
      {!saved ? <TextLink style={styles.centerLink} onPress={() => router.back()}>Cancel</TextLink> : null}
    </AuthFrame>
  );
}

const styles = StyleSheet.create({
  forgot: { alignSelf: 'flex-end', marginTop: -4, marginBottom: 22 },
  formButton: { marginTop: 5 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 23 },
  footerText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 11 },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 22 },
  rule: { flex: 1, height: 1, backgroundColor: colors.border },
  orText: { color: colors.muted, fontFamily: fonts.semiBold, fontSize: 8, letterSpacing: 1 },
  terms: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 17 },
  termsCheck: { width: 18, height: 18, borderRadius: 6, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  termsText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 10 },
  termsAccent: { color: colors.text, fontFamily: fonts.semiBold },
  centerLink: { alignSelf: 'center', marginTop: 21 },
  codeCard: { alignItems: 'center', paddingVertical: 20, paddingHorizontal: 14, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, marginBottom: 22 },
  codeIcon: { width: 46, height: 46, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceSoft, marginBottom: 11 },
  codeTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 13 },
  codeCaption: { color: colors.muted, fontFamily: fonts.medium, fontSize: 10, marginTop: 4 },
  codeInput: { textAlign: 'center', letterSpacing: 12, fontSize: 18 },
  successIcon: { width: 72, height: 72, borderRadius: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, alignSelf: 'center', marginBottom: 22 },
});
