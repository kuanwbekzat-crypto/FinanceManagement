import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { colors, fonts } from '../../shared/theme/tokens';
import Icon from '../../shared/ui/Icon';
import { AuthFrame, PrimaryButton } from '../../shared/ui/Primitives';

export function FingerprintScreen() {
  return (
    <AuthFrame title="Your money stays yours" subtitle="Use your fingerprint to unlock Mint quickly and securely.">
      <View style={styles.fingerprintWrap}>
        <View style={styles.fingerprintRing}><Icon name="fingerprint" size={67} color={colors.primary} /></View>
        <View style={styles.secureBadge}><Icon name="check" size={14} color={colors.black} /></View>
      </View>
      <Text style={styles.secureTitle}>Biometric access</Text>
      <Text style={styles.secureCaption}>Your biometric data stays on this device. Mint never sees or stores it.</Text>
      <PrimaryButton title="Enable fingerprint" onPress={() => router.replace('/home' as never)} style={styles.enable} />
      <PrimaryButton title="Use password instead" tone="quiet" onPress={() => router.replace('/login' as never)} />
    </AuthFrame>
  );
}

const styles = StyleSheet.create({
  fingerprintWrap: { alignSelf: 'center', position: 'relative', marginTop: 8, marginBottom: 24 },
  fingerprintRing: { width: 144, height: 144, borderRadius: 46, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  secureBadge: { width: 30, height: 30, borderRadius: 10, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', position: 'absolute', right: -8, bottom: -6 },
  secureTitle: { textAlign: 'center', color: colors.text, fontFamily: fonts.semiBold, fontSize: 14 },
  secureCaption: { textAlign: 'center', color: colors.muted, fontFamily: fonts.medium, fontSize: 11, lineHeight: 18, marginTop: 8, marginHorizontal: 15 },
  enable: { marginTop: 28 },
});
