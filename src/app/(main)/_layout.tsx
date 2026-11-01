import { Stack } from 'expo-router';
import { colors } from '../../shared/theme/tokens';

export default function MainLayout() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }} />;
}
