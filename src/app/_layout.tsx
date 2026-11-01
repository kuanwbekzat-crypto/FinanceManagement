import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { colors } from '../shared/theme/tokens';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold });
  if (!fontsLoaded) return null;
  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />
    </>
  );
}
