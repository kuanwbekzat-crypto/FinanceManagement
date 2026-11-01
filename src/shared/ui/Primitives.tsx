import React, { type ReactNode } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, spacing } from '../theme/tokens';
import { transactions, type Transaction } from '../data/finance';
import Icon, { type IconName } from './Icon';

export function ScreenFrame({ children, background = colors.background }: { children: ReactNode; background?: string }) {
  return <SafeAreaView edges={['top', 'bottom']} style={[styles.screen, { backgroundColor: background }]}>{children}</SafeAreaView>;
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <View style={styles.brandRow}>
      <View style={styles.brandMark}><Icon name="spark" size={compact ? 17 : 20} color={colors.black} /></View>
      <Text style={[styles.brandName, compact && styles.brandCompact]}>MINT<Text style={styles.brandDot}>.</Text></Text>
    </View>
  );
}

type ButtonTone = 'primary' | 'secondary' | 'quiet';
export function PrimaryButton({
  title,
  onPress,
  icon,
  tone = 'primary',
  style,
}: {
  title: string;
  onPress: () => void;
  icon?: IconName;
  tone?: ButtonTone;
  style?: StyleProp<ViewStyle>;
}) {
  const buttonStyle = tone === 'primary' ? styles.primaryButton : tone === 'secondary' ? styles.secondaryButton : styles.quietButton;
  const textStyle = tone === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText;
  const iconColor = tone === 'primary' ? colors.black : colors.text;
  return (
    <Pressable accessibilityRole="button" onPress={onPress} style={({ pressed }) => [styles.button, buttonStyle, pressed && styles.pressed, style]}>
      {icon ? <Icon name={icon} size={18} color={iconColor} /> : null}
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}

export function TextLink({ children, onPress, style }: { children: ReactNode; onPress: () => void; style?: StyleProp<ViewStyle> }) {
  return <Pressable onPress={onPress} hitSlop={8} style={style}><Text style={styles.textLink}>{children}</Text></Pressable>;
}

export function TextField({
  label,
  leading,
  trailing,
  containerStyle,
  ...inputProps
}: TextInputProps & { label: string; leading?: ReactNode; trailing?: ReactNode; containerStyle?: StyleProp<ViewStyle> }) {
  return (
    <View style={[styles.fieldWrap, containerStyle]}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.field}>
        {leading ? <View style={styles.fieldLeading}>{leading}</View> : null}
        <TextInput
          {...inputProps}
          placeholderTextColor={colors.muted}
          selectionColor={colors.primary}
          style={[styles.input, inputProps.style]}
        />
        {trailing}
      </View>
    </View>
  );
}

export function AuthFrame({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <ScreenFrame>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.authContent}
        showsVerticalScrollIndicator={false}
      >
        <Brand />
        <Text style={styles.authKicker}>YOUR MONEY, IN FOCUS</Text>
        <Text style={styles.authTitle}>{title}</Text>
        <Text style={styles.authSubtitle}>{subtitle}</Text>
        <View style={styles.authForm}>{children}</View>
      </ScrollView>
    </ScreenFrame>
  );
}

export type TabKey = 'home' | 'analysis' | 'transactions' | 'categories';
const tabs: { key: TabKey; label: string; icon: IconName; route: string }[] = [
  { key: 'home', label: 'Overview', icon: 'home', route: '/home' },
  { key: 'analysis', label: 'Insights', icon: 'analysis', route: '/analysis' },
  { key: 'transactions', label: 'Activity', icon: 'transactions', route: '/transactions' },
  { key: 'categories', label: 'Budget', icon: 'categories', route: '/categories' },
];

function BottomNavigation({ active }: { active: TabKey }) {
  return (
    <View style={styles.bottomNavigation}>
      {tabs.map((tab) => {
        const selected = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            onPress={() => router.replace(tab.route as never)}
            style={styles.tab}
          >
            <View style={[styles.tabIcon, selected && styles.tabIconActive]}>
              <Icon name={tab.icon} size={19} color={selected ? colors.black : colors.muted} />
            </View>
            <Text style={[styles.tabLabel, selected && styles.tabLabelActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function FinanceLayout({ active, children }: { active: TabKey; children: ReactNode }) {
  return (
    <ScreenFrame>
      <View style={styles.financeRoot}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.financeContent}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
        <BottomNavigation active={active} />
      </View>
    </ScreenFrame>
  );
}

export function PageHeader({ title, onBack, action }: { title: string; onBack?: () => void; action?: ReactNode }) {
  return (
    <View style={styles.pageHeader}>
      <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={onBack ?? (() => router.back())} style={styles.headerBack}>
        <Icon name="back" size={20} color={colors.text} />
      </Pressable>
      <Text numberOfLines={1} style={styles.pageTitle}>{title}</Text>
      <View style={styles.headerAction}>{action}</View>
    </View>
  );
}

export function SectionHeading({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View style={styles.sectionHeading}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Pressable onPress={onAction}><Text style={styles.sectionAction}>{action}</Text></Pressable> : null}
    </View>
  );
}

export function BalanceOverview({ compact = false, onPress }: { compact?: boolean; onPress?: () => void }) {
  const Wrapper = onPress ? Pressable : View;
  return (
    <Wrapper onPress={onPress} style={[styles.balanceCard, compact && styles.balanceCompact]}>
      <View style={styles.balanceTop}>
        <View>
          <Text style={styles.balanceLabel}>TOTAL BALANCE</Text>
          <Text style={styles.balanceAmount}>$7,783<Text style={styles.balanceCents}>.00</Text></Text>
        </View>
        <View style={styles.currencyBadge}><Text style={styles.currencyText}>USD</Text><Icon name="chevron" size={13} color={colors.text} /></View>
      </View>
      {!compact ? (
        <>
          <View style={styles.balanceDivider} />
          <View style={styles.balanceStats}>
            <View style={styles.balanceStat}>
              <View style={styles.statIconIncome}><Icon name="arrowDown" size={15} color={colors.primary} /></View>
              <View><Text style={styles.statLabel}>Income</Text><Text style={styles.statValue}>$4,120.00</Text></View>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.balanceStat}>
              <View style={styles.statIconExpense}><Icon name="arrowUp" size={15} color={colors.negative} /></View>
              <View><Text style={styles.statLabel}>Spent</Text><Text style={styles.statValue}>$1,187.40</Text></View>
            </View>
          </View>
        </>
      ) : null}
    </Wrapper>
  );
}

export function TransactionRow({ item }: { item: Transaction }) {
  const isIncome = item.amount.startsWith('+');
  return (
    <View style={styles.transactionRow}>
      <View style={[styles.transactionIcon, isIncome && styles.transactionIconIncome]}>
        <Icon name={item.icon} size={19} color={isIncome ? colors.black : colors.text} />
      </View>
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionDate}>{item.date} · {item.detail}</Text>
      </View>
      <Text style={[styles.transactionAmount, isIncome && styles.incomeAmount]}>{item.amount}</Text>
    </View>
  );
}

export function TransactionList({ items = transactions }: { items?: Transaction[] }) {
  return <View style={styles.transactionList}>{items.map((item) => <TransactionRow item={item} key={item.id} />)}</View>;
}

export function MiniStat({ label, value, note, accent = false }: { label: string; value: string; note?: string; accent?: boolean }) {
  return (
    <View style={styles.miniStat}>
      <Text style={styles.miniStatLabel}>{label}</Text>
      <Text style={[styles.miniStatValue, accent && styles.miniStatAccent]}>{value}</Text>
      {note ? <Text style={styles.miniStatNote}>{note}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  brandMark: { width: 34, height: 34, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary },
  brandName: { color: colors.text, fontFamily: fonts.bold, fontSize: 19, letterSpacing: 1.3 },
  brandCompact: { fontSize: 15 },
  brandDot: { color: colors.primary },
  button: { minHeight: 56, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 9, paddingHorizontal: spacing.lg },
  primaryButton: { backgroundColor: colors.primary },
  secondaryButton: { backgroundColor: colors.surfaceRaised, borderWidth: 1, borderColor: colors.border },
  quietButton: { backgroundColor: 'transparent' },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
  primaryButtonText: { color: colors.black, fontFamily: fonts.semiBold, fontSize: 14 },
  secondaryButtonText: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 14 },
  textLink: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 12 },
  fieldWrap: { gap: 8, marginBottom: 16 },
  fieldLabel: { color: colors.text, fontFamily: fonts.medium, fontSize: 12 },
  field: { minHeight: 54, borderRadius: 16, paddingHorizontal: 15, backgroundColor: colors.surfaceRaised, borderWidth: 1, borderColor: colors.border, flexDirection: 'row', alignItems: 'center' },
  fieldLeading: { marginRight: 10 },
  input: { flex: 1, minHeight: 52, color: colors.text, fontFamily: fonts.medium, fontSize: 13, paddingVertical: 0 },
  authContent: { width: '100%', maxWidth: 520, alignSelf: 'center', flexGrow: 1, paddingHorizontal: 26, paddingTop: 18, paddingBottom: 28 },
  authKicker: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 10, letterSpacing: 1.6, marginTop: 58 },
  authTitle: { color: colors.text, fontFamily: fonts.bold, fontSize: 31, lineHeight: 40, marginTop: 10 },
  authSubtitle: { color: colors.muted, fontFamily: fonts.regular, fontSize: 13, lineHeight: 21, marginTop: 8, maxWidth: 370 },
  authForm: { marginTop: 34 },
  financeRoot: { flex: 1, width: '100%', maxWidth: 520, alignSelf: 'center' },
  financeContent: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 16, paddingBottom: 26 },
  bottomNavigation: { minHeight: 76, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border, paddingHorizontal: 8, paddingTop: 10, paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  tab: { alignItems: 'center', justifyContent: 'center', flex: 1, gap: 4 },
  tabIcon: { width: 38, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: 12 },
  tabIconActive: { backgroundColor: colors.primary },
  tabLabel: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9 },
  tabLabelActive: { color: colors.primary, fontFamily: fonts.semiBold },
  pageHeader: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  headerBack: { width: 42, height: 42, borderRadius: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  pageTitle: { flex: 1, textAlign: 'center', color: colors.text, fontFamily: fonts.semiBold, fontSize: 16, marginHorizontal: 10 },
  headerAction: { width: 42, alignItems: 'flex-end', justifyContent: 'center' },
  sectionHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 7, marginBottom: 12 },
  sectionTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16 },
  sectionAction: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 11 },
  balanceCard: { backgroundColor: colors.primary, borderRadius: radius.lg, padding: 21, marginBottom: 17 },
  balanceCompact: { padding: 20 },
  balanceTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  balanceLabel: { color: '#394629', fontFamily: fonts.semiBold, fontSize: 10, letterSpacing: 1.2 },
  balanceAmount: { color: colors.black, fontFamily: fonts.bold, fontSize: 34, marginTop: 5 },
  balanceCents: { color: '#455236', fontFamily: fonts.medium, fontSize: 20 },
  currencyBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: radius.pill, backgroundColor: 'rgba(8,16,13,0.1)', paddingHorizontal: 11, paddingVertical: 7 },
  currencyText: { color: colors.black, fontFamily: fonts.semiBold, fontSize: 9 },
  balanceDivider: { height: 1, backgroundColor: 'rgba(8,16,13,0.17)', marginVertical: 17 },
  balanceStats: { flexDirection: 'row', alignItems: 'center' },
  balanceStat: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 9 },
  statIconIncome: { width: 32, height: 32, borderRadius: 11, backgroundColor: colors.black, alignItems: 'center', justifyContent: 'center' },
  statIconExpense: { width: 32, height: 32, borderRadius: 11, backgroundColor: 'rgba(8,16,13,0.1)', alignItems: 'center', justifyContent: 'center' },
  statDivider: { width: 1, height: 34, backgroundColor: 'rgba(8,16,13,0.2)', marginHorizontal: 11 },
  statLabel: { color: '#455236', fontFamily: fonts.medium, fontSize: 9 },
  statValue: { color: colors.black, fontFamily: fonts.semiBold, fontSize: 12, marginTop: 3 },
  transactionList: { gap: 2 },
  transactionRow: { minHeight: 70, flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: colors.border },
  transactionIcon: { width: 43, height: 43, borderRadius: 15, backgroundColor: colors.surfaceRaised, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  transactionIconIncome: { backgroundColor: colors.primary, borderColor: colors.primary },
  transactionInfo: { flex: 1 },
  transactionTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 12 },
  transactionDate: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, marginTop: 4 },
  transactionAmount: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 12 },
  incomeAmount: { color: colors.primary },
  miniStat: { flex: 1, padding: 15, minHeight: 92, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  miniStatLabel: { color: colors.muted, fontFamily: fonts.medium, fontSize: 10 },
  miniStatValue: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 16, marginTop: 8 },
  miniStatAccent: { color: colors.primary },
  miniStatNote: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, marginTop: 4 },
});
