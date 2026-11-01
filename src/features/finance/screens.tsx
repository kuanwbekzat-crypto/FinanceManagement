import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { spendingCategories, transactions } from '../../shared/data/finance';
import { colors, fonts, radius } from '../../shared/theme/tokens';
import Icon, { type IconName } from '../../shared/ui/Icon';
import { BalanceOverview, FinanceLayout, MiniStat, PageHeader, PrimaryButton, SectionHeading, TransactionList } from '../../shared/ui/Primitives';

const periods = ['Week', 'Month', 'Year'] as const;

export function HomeScreen() {
  const [period, setPeriod] = useState<(typeof periods)[number]>('Month');
  return (
    <FinanceLayout active="home">
      <View style={styles.topLine}>
        <View><Text style={styles.mutedLabel}>MONDAY, APRIL 20</Text><Text style={styles.greeting}>Good morning, Bek</Text></View>
        <Pressable accessibilityRole="button" accessibilityLabel="Notifications" onPress={() => router.push('/transactions' as never)} style={styles.avatar}><Text style={styles.avatarText}>B</Text><View style={styles.onlineDot} /></Pressable>
      </View>
      <BalanceOverview onPress={() => router.push('/balance' as never)} />
      <View style={styles.goalCard}>
        <View style={styles.goalIcon}><Icon name="spark" color={colors.black} size={18} /></View>
        <View style={styles.goalCopy}>
          <Text style={styles.goalEyebrow}>MONTHLY GOAL</Text>
          <Text style={styles.goalTitle}>You’re building a great habit</Text>
          <View style={styles.goalTrack}><View style={styles.goalProgress} /></View>
          <Text style={styles.goalHint}>$1,320 saved <Text style={styles.goalHintSoft}>of $2,000</Text></Text>
        </View>
        <Text style={styles.goalPercent}>66%</Text>
      </View>
      <View style={styles.periodSelector}>
        {periods.map((item) => {
          const active = item === period;
          return <Pressable key={item} onPress={() => setPeriod(item)} style={[styles.periodChip, active && styles.periodChipActive]}><Text style={[styles.periodText, active && styles.periodTextActive]}>{item}</Text></Pressable>;
        })}
      </View>
      <SectionHeading title="Recent activity" action="See all" onAction={() => router.push('/transactions' as never)} />
      <TransactionList items={transactions.slice(0, 4)} />
      <PrimaryButton title="Explore insights" icon="analysis" tone="secondary" onPress={() => router.push('/analysis' as never)} style={styles.homeAction} />
    </FinanceLayout>
  );
}

export function BalanceScreen() {
  return (
    <FinanceLayout active="home">
      <PageHeader title="Your balance" />
      <Text style={styles.pageEyebrow}>ALL ACCOUNTS</Text>
      <BalanceOverview />
      <View style={styles.statsRow}><MiniStat label="Income" value="$4,120" note="↑ 12.8% this month" accent /><MiniStat label="Expenses" value="$1,187" note="↓ 4.2% vs last month" /></View>
      <View style={styles.accountCard}>
        <View style={styles.accountIcon}><Icon name="wallet" size={20} color={colors.primary} /></View>
        <View style={styles.accountCopy}><Text style={styles.accountTitle}>Everyday account</Text><Text style={styles.accountSub}>••••  2048  ·  USD</Text></View>
        <Text style={styles.accountAmount}>$7,783</Text>
      </View>
      <SectionHeading title="Latest transactions" action="All" onAction={() => router.push('/transactions' as never)} />
      <TransactionList items={transactions.slice(0, 3)} />
    </FinanceLayout>
  );
}

export function AnalysisScreen() {
  const [period, setPeriod] = useState<(typeof periods)[number]>('Month');
  const barData = [38, 55, 46, 72, 52, 86, 63, 95, 58, 78, 49, 70];
  return (
    <FinanceLayout active="analysis">
      <PageHeader title="Insights" action={<Pressable accessibilityLabel="Calendar" style={styles.headerAction}><Icon name="calendar" size={18} color={colors.text} /></Pressable>} />
      <Text style={styles.pageEyebrow}>YOUR MONEY AT A GLANCE</Text>
      <View style={styles.analysisHero}>
        <Text style={styles.analysisLabel}>Net income this month</Text>
        <Text style={styles.analysisTotal}>+$2,932.60</Text>
        <View style={styles.trendBadge}><Icon name="arrowUp" size={12} color={colors.primary} /><Text style={styles.trendText}>8.4% from last month</Text></View>
        <View style={styles.chartRow}>{barData.map((height, index) => <View key={index} style={styles.barSlot}><View style={[styles.bar, index > 8 && styles.barHighlight, { height }]} /></View>)}</View>
        <View style={styles.chartLabels}><Text style={styles.chartLabel}>APR 01</Text><Text style={styles.chartLabel}>APR 10</Text><Text style={styles.chartLabel}>APR 20</Text><Text style={styles.chartLabel}>APR 30</Text></View>
      </View>
      <View style={styles.periodSelector}>
        {periods.map((item) => <Pressable key={item} onPress={() => setPeriod(item)} style={[styles.periodChip, period === item && styles.periodChipActive]}><Text style={[styles.periodText, period === item && styles.periodTextActive]}>{item}</Text></Pressable>)}
      </View>
      <SectionHeading title="Where it goes" action="Budget" onAction={() => router.push('/categories' as never)} />
      <View style={styles.categorySummary}>
        {spendingCategories.slice(0, 4).map((item) => {
          const percent = Math.round((item.amount / item.limit) * 100);
          return <View key={item.label} style={styles.categoryInsight}>
            <View style={styles.categoryInsightTop}><View style={styles.categoryInsightIcon}><Icon name={item.icon} size={17} color={colors.primary} /></View><Text style={styles.categoryInsightName}>{item.label}</Text><Text style={styles.categoryInsightAmount}>{'$' + item.amount}</Text></View>
            <View style={styles.categoryTrack}><View style={[styles.categoryFill, { width: Math.min(percent, 100) + '%' }]} /></View>
          </View>;
        })}
      </View>
    </FinanceLayout>
  );
}

export function TransactionsScreen() {
  const { category } = useLocalSearchParams<{ category?: string }>();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'All' | 'Income' | 'Expense'>('All');
  const items = useMemo(() => transactions.filter((item) => {
    const matchesCategory = !category || item.category.toLowerCase() === String(category).toLowerCase() || item.title.toLowerCase() === String(category).toLowerCase();
    const matchesSearch = !query || [item.title, item.detail, item.category].join(' ').toLowerCase().includes(query.toLowerCase());
    const matchesFlow = filter === 'All' || (filter === 'Income' ? item.amount.startsWith('+') : item.amount.startsWith('-'));
    return matchesCategory && matchesSearch && matchesFlow;
  }), [category, filter, query]);
  return (
    <FinanceLayout active="transactions">
      <PageHeader title={category ? String(category) : 'Activity'} action={<Pressable accessibilityLabel="More options" style={styles.headerAction}><Icon name="more" size={19} color={colors.text} /></Pressable>} />
      <View style={styles.activityHero}>
        <Text style={styles.balanceLabel}>APRIL SPENDING</Text>
        <Text style={styles.activityTotal}>$1,187<Text style={styles.activityCents}>.40</Text></Text>
        <View style={styles.activityFooter}><Text style={styles.activityFooterText}>$4,120 income</Text><View style={styles.activityDot} /><Text style={styles.activityFooterText}>$2,932 saved</Text></View>
      </View>
      <View style={styles.searchBox}><Icon name="search" size={18} color={colors.muted} /><TextInput value={query} onChangeText={setQuery} placeholder="Search your activity" placeholderTextColor={colors.muted} style={styles.searchInput} /></View>
      <View style={styles.periodSelector}>
        {(['All', 'Income', 'Expense'] as const).map((item) => <Pressable key={item} onPress={() => setFilter(item)} style={[styles.periodChip, filter === item && styles.periodChipActive]}><Text style={[styles.periodText, filter === item && styles.periodTextActive]}>{item}</Text></Pressable>)}
      </View>
      <SectionHeading title="Latest transactions" action={items.length + ' items'} />
      {items.length ? <TransactionList items={items} /> : <Text style={styles.emptyText}>Nothing matches that search yet.</Text>}
    </FinanceLayout>
  );
}

const categories: { name: string; icon: IconName }[] = [
  { name: 'Food', icon: 'food' }, { name: 'Transport', icon: 'car' }, { name: 'Health', icon: 'medicine' },
  { name: 'Home', icon: 'rent' }, { name: 'Shopping', icon: 'gift' }, { name: 'Fun', icon: 'entertainment' },
];

export function CategoriesScreen() {
  const total = spendingCategories.reduce((sum, item) => sum + item.amount, 0);
  return (
    <FinanceLayout active="categories">
      <PageHeader title="Monthly budget" action={<Pressable accessibilityLabel="More options" style={styles.headerAction}><Icon name="more" size={19} color={colors.text} /></Pressable>} />
      <View style={styles.budgetHero}>
        <View style={styles.budgetHeading}><View><Text style={styles.balanceLabel}>APRIL, 2026</Text><Text style={styles.budgetAmount}>{'$' + total.toLocaleString()}</Text></View><Text style={styles.budgetOf}>of $3,900</Text></View>
        <View style={styles.budgetTrack}><View style={styles.budgetUsed} /></View>
        <View style={styles.budgetCaption}><Text style={styles.budgetCaptionText}>30% spent</Text><Text style={styles.budgetCaptionText}>$2,713 left</Text></View>
      </View>
      <SectionHeading title="Your categories" action="Edit" />
      <View style={styles.categoryList}>
        {spendingCategories.map((item) => {
          const percent = Math.round((item.amount / item.limit) * 100);
          const category = categories.find((entry) => entry.name === item.label);
          return <Pressable key={item.label} onPress={() => router.push({ pathname: '/transactions', params: { category: item.label } } as never)} style={styles.categoryRow}>
            <View style={styles.categoryIcon}><Icon name={category?.icon ?? 'more'} size={18} color={colors.primary} /></View>
            <View style={styles.categoryMain}>
              <View style={styles.categoryRowTop}><Text style={styles.categoryName}>{item.label}</Text><Text style={styles.categorySpent}>{'$' + item.amount} <Text style={styles.categoryLimit}>{'/ $' + item.limit}</Text></Text></View>
              <View style={styles.categoryTrack}><View style={[styles.categoryFill, { width: Math.min(percent, 100) + '%' }]} /></View>
            </View>
            <Text style={styles.categoryPercent}>{percent}%</Text>
          </Pressable>;
        })}
      </View>
      <PrimaryButton title="Add a category" icon="plus" tone="secondary" onPress={() => router.push('/transactions' as never)} style={styles.addCategory} />
    </FinanceLayout>
  );
}

const styles = StyleSheet.create({
  topLine: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 },
  mutedLabel: { color: colors.muted, fontFamily: fonts.semiBold, fontSize: 9, letterSpacing: 1.1 },
  greeting: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 19, marginTop: 5 },
  avatar: { width: 43, height: 43, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceSoft, borderWidth: 1, borderColor: colors.border, position: 'relative' },
  avatarText: { color: colors.primary, fontFamily: fonts.bold, fontSize: 16 },
  onlineDot: { position: 'absolute', right: 0, bottom: 0, width: 11, height: 11, borderRadius: 6, backgroundColor: colors.primary, borderWidth: 2, borderColor: colors.background },
  goalCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, padding: 16, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, marginBottom: 19 },
  goalIcon: { width: 35, height: 35, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  goalCopy: { flex: 1 },
  goalEyebrow: { color: colors.primary, fontFamily: fonts.semiBold, fontSize: 9, letterSpacing: 1 },
  goalTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 12, marginTop: 4 },
  goalTrack: { height: 5, borderRadius: 5, overflow: 'hidden', backgroundColor: colors.surfaceSoft, marginTop: 11 },
  goalProgress: { width: '66%', height: 5, borderRadius: 5, backgroundColor: colors.primary },
  goalHint: { color: colors.text, fontFamily: fonts.medium, fontSize: 9, marginTop: 7 },
  goalHintSoft: { color: colors.muted },
  goalPercent: { color: colors.primary, fontFamily: fonts.bold, fontSize: 13, marginTop: 10 },
  periodSelector: { flexDirection: 'row', gap: 7, padding: 4, borderRadius: 14, backgroundColor: colors.surface, marginBottom: 20 },
  periodChip: { flex: 1, alignItems: 'center', justifyContent: 'center', minHeight: 36, borderRadius: 11 },
  periodChipActive: { backgroundColor: colors.primary },
  periodText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 10 },
  periodTextActive: { color: colors.black, fontFamily: fonts.semiBold },
  homeAction: { marginTop: 18 },
  pageEyebrow: { color: colors.muted, fontFamily: fonts.semiBold, letterSpacing: 1.2, fontSize: 9, marginBottom: 12 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 15 },
  accountCard: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 21, padding: 15, borderRadius: radius.md, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  accountIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: colors.surfaceSoft, alignItems: 'center', justifyContent: 'center' },
  accountCopy: { flex: 1 },
  accountTitle: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 12 },
  accountSub: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, marginTop: 4 },
  accountAmount: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 13 },
  headerAction: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface },
  analysisHero: { borderRadius: radius.lg, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, padding: 20, marginBottom: 16, overflow: 'hidden' },
  analysisLabel: { color: colors.muted, fontFamily: fonts.medium, fontSize: 10 },
  analysisTotal: { color: colors.text, fontFamily: fonts.bold, fontSize: 30, marginTop: 4 },
  trendBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 7 },
  trendText: { color: colors.primary, fontFamily: fonts.medium, fontSize: 9 },
  chartRow: { height: 108, marginTop: 22, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 5 },
  barSlot: { flex: 1, height: '100%', justifyContent: 'flex-end' },
  bar: { width: '100%', borderRadius: 5, backgroundColor: colors.surfaceSoft },
  barHighlight: { backgroundColor: colors.primary },
  chartLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  chartLabel: { color: colors.muted, fontFamily: fonts.medium, fontSize: 8 },
  categorySummary: { gap: 8 },
  categoryInsight: { padding: 13, borderRadius: 15, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  categoryInsightTop: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 10 },
  categoryInsightIcon: { width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 10, backgroundColor: colors.surfaceSoft },
  categoryInsightName: { flex: 1, color: colors.text, fontFamily: fonts.medium, fontSize: 11 },
  categoryInsightAmount: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 11 },
  categoryTrack: { height: 5, borderRadius: 5, overflow: 'hidden', backgroundColor: colors.surfaceSoft },
  categoryFill: { height: 5, borderRadius: 5, backgroundColor: colors.primary },
  activityHero: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.lg, padding: 20, marginBottom: 13 },
  balanceLabel: { color: colors.muted, fontFamily: fonts.semiBold, fontSize: 9, letterSpacing: 1.1 },
  activityTotal: { color: colors.text, fontFamily: fonts.bold, fontSize: 32, marginTop: 8 },
  activityCents: { color: colors.muted, fontFamily: fonts.medium, fontSize: 20 },
  activityFooter: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  activityFooterText: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9 },
  activityDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.primary },
  searchBox: { minHeight: 48, flexDirection: 'row', alignItems: 'center', gap: 9, borderRadius: 15, paddingHorizontal: 14, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, marginBottom: 11 },
  searchInput: { flex: 1, color: colors.text, fontFamily: fonts.medium, fontSize: 11, paddingVertical: 0 },
  emptyText: { textAlign: 'center', color: colors.muted, fontFamily: fonts.medium, fontSize: 12, paddingVertical: 36 },
  budgetHero: { padding: 20, borderRadius: radius.lg, backgroundColor: colors.primary, marginBottom: 19 },
  budgetHeading: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  budgetAmount: { color: colors.black, fontFamily: fonts.bold, fontSize: 31, marginTop: 6 },
  budgetOf: { color: '#455236', fontFamily: fonts.medium, fontSize: 11, marginBottom: 6 },
  budgetTrack: { height: 8, borderRadius: 8, backgroundColor: 'rgba(8,16,13,0.16)', overflow: 'hidden', marginTop: 17 },
  budgetUsed: { width: '30%', height: 8, borderRadius: 8, backgroundColor: colors.black },
  budgetCaption: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  budgetCaptionText: { color: '#455236', fontFamily: fonts.medium, fontSize: 9 },
  categoryList: { gap: 4 },
  categoryRow: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  categoryIcon: { width: 40, height: 40, borderRadius: 13, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center' },
  categoryMain: { flex: 1 },
  categoryRowTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  categoryName: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 11 },
  categorySpent: { color: colors.text, fontFamily: fonts.semiBold, fontSize: 10 },
  categoryLimit: { color: colors.muted, fontFamily: fonts.medium },
  categoryPercent: { color: colors.muted, fontFamily: fonts.medium, fontSize: 9, width: 31, textAlign: 'right' },
  addCategory: { marginTop: 17 },
});
