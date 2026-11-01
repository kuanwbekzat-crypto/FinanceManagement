import { useEffect } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { Brand, ScreenFrame } from '../shared/ui/Primitives';
import { colors, fonts } from '../shared/theme/tokens';

export default function LaunchScreen() {
  useEffect(() => {
    const timer = setTimeout(() => router.replace('/welcome' as never), 700);
    return () => clearTimeout(timer);
  }, []);
  return (
    <ScreenFrame>
      <View style={styles.launch}>
        <Brand />
        <Text style={styles.tagline}>A little more clarity. A lot more possibility.</Text>
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  launch: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 13 },
  tagline: { textAlign: 'center', color: colors.muted, fontFamily: fonts.medium, fontSize: 11, lineHeight: 19 },
});
