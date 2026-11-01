import React from 'react';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { colors } from '../theme/tokens';

export type IconName =
  | 'home' | 'analysis' | 'transactions' | 'categories' | 'profile' | 'bell'
  | 'back' | 'mail' | 'lock' | 'eye' | 'eyeOff' | 'fingerprint' | 'food'
  | 'car' | 'medicine' | 'groceries' | 'rent' | 'gift' | 'savings'
  | 'entertainment' | 'more' | 'wallet' | 'calendar' | 'search' | 'plus'
  | 'check' | 'chevron' | 'arrowUp' | 'arrowDown' | 'spark';

type Props = { name: IconName; size?: number; color?: string };

export default function Icon({ name, size = 22, color = colors.text }: Props) {
  const stroke = {
    fill: 'none' as const,
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (name) {
    case 'home': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></Svg>;
    case 'analysis': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="M4 20V12m5 8V7m5 13v-5m5 5V4M2 21h20" /></Svg>;
    case 'transactions': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="M4 7h15l-3-3m4 13H5l3 3M19 7v5M5 17v-5" /></Svg>;
    case 'categories': return <Svg width={size} height={size} viewBox="0 0 24 24"><Rect {...stroke} x="4" y="4" width="6" height="6" rx="1"/><Rect {...stroke} x="14" y="4" width="6" height="6" rx="1"/><Rect {...stroke} x="4" y="14" width="6" height="6" rx="1"/><Rect {...stroke} x="14" y="14" width="6" height="6" rx="1"/></Svg>;
    case 'profile': return <Svg width={size} height={size} viewBox="0 0 24 24"><Circle {...stroke} cx="12" cy="8" r="3.5"/><Path {...stroke} d="M4.5 21c.5-4.1 3.1-6.2 7.5-6.2s7 2.1 7.5 6.2"/></Svg>;
    case 'bell': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4"/></Svg>;
    case 'back': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="m15 18-6-6 6-6M9 12h12"/></Svg>;
    case 'mail': return <Svg width={size} height={size} viewBox="0 0 24 24"><Rect {...stroke} x="3" y="5" width="18" height="14" rx="2"/><Path {...stroke} d="m4 7 8 6 8-6"/></Svg>;
    case 'lock': return <Svg width={size} height={size} viewBox="0 0 24 24"><Rect {...stroke} x="4" y="10" width="16" height="11" rx="2"/><Path {...stroke} d="M8 10V7a4 4 0 1 1 8 0v3m-4 5v2"/></Svg>;
    case 'eye': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="M2.5 12s3.2-6 9.5-6 9.5 6 9.5 6-3.2 6-9.5 6-9.5-6-9.5-6Z"/><Circle {...stroke} cx="12" cy="12" r="2.5"/></Svg>;
    case 'eyeOff': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="m3 3 18 18M10.6 6.2A10.5 10.5 0 0 1 12 6c6.3 0 9.5 6 9.5 6a14 14 0 0 1-3.1 3.8M6.2 6.7A15 15 0 0 0 2.5 12s3.2 6 9.5 6c.8 0 1.5-.1 2.2-.3"/></Svg>;
    case 'fingerprint': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="M12 4a7 7 0 0 0-7 7m14 1v-1a7 7 0 0 0-14 0v1m3 0v-1a4 4 0 0 1 8 0v1c0 3-.7 5.1-2.1 7m-5.9-7c0 2.2-.3 4.2-1.1 6m4.1-6c0 3.4-.3 5.7-1.1 7.6m-6.7-4.3c-.2-1-.3-2.1-.3-3.3m15.7 0c0 1.1-.1 2.1-.3 3.1"/></Svg>;
    case 'food': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="M6 3v7m-3-7v4a3 3 0 0 0 6 0V3m-3 7v11m9-18v18m0-18c3 2 4 5 4 9h-4"/></Svg>;
    case 'car': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="m4 11 2-5h12l2 5 1 2v6h-3v-2H6v2H3v-6zM4 11h16M7 15h.1M17 15h.1"/></Svg>;
    case 'medicine': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="M9 4a5 5 0 0 1 7.1 0l3.9 3.9a5 5 0 0 1-7.1 7.1L9 11.1A5 5 0 0 1 9 4Z"/><Path {...stroke} d="m9 11 7-7"/></Svg>;
    case 'groceries': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="M5 8h14l-1 13H6L5 8Zm3 0V6a4 4 0 0 1 8 0v2"/><Path {...stroke} d="M9 12v5m6-5v5"/></Svg>;
    case 'rent': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="m3 11 9-8 9 8M5 10v11h14V10M9 21v-7h6v7"/></Svg>;
    case 'gift': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="M3 10h18v11H3zM2 6h20v4H2zM12 6v15M12 6H8a2 2 0 1 1 2-2c0 1.2 2 2 2 2Zm0 0h4a2 2 0 1 0-2-2c0 1.2-2 2-2 2Z"/></Svg>;
    case 'savings': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="M4 9h16v11H4zM8 9V6h8v3m-4 4v3m-1.5-1.5h3M7 20v2m10-2v2"/></Svg>;
    case 'entertainment': return <Svg width={size} height={size} viewBox="0 0 24 24"><Rect {...stroke} x="3" y="5" width="18" height="14" rx="2"/><Path {...stroke} d="M8 9h.1M12 9h.1M16 9h.1M8 13h.1M12 13h.1M16 13h.1"/></Svg>;
    case 'more': case 'plus': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="M12 5v14M5 12h14"/></Svg>;
    case 'wallet': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="M4 6h15a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h13"/><Path {...stroke} d="M16 12h5m-4 0h.1"/></Svg>;
    case 'calendar': return <Svg width={size} height={size} viewBox="0 0 24 24"><Rect {...stroke} x="3" y="5" width="18" height="16" rx="2"/><Path {...stroke} d="M16 3v4M8 3v4M3 10h18"/></Svg>;
    case 'search': return <Svg width={size} height={size} viewBox="0 0 24 24"><Circle {...stroke} cx="10.8" cy="10.8" r="6.8"/><Path {...stroke} d="m16 16 5 5"/></Svg>;
    case 'check': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="m5 12 4 4L19 6"/></Svg>;
    case 'chevron': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="m9 18 6-6-6-6"/></Svg>;
    case 'arrowUp': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="M12 19V5m-6 6 6-6 6 6"/></Svg>;
    case 'arrowDown': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="M12 5v14m6-6-6 6-6-6"/></Svg>;
    case 'spark': return <Svg width={size} height={size} viewBox="0 0 24 24"><Path {...stroke} d="m12 3 1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3Zm7 12 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></Svg>;
    default: return null;
  }
}
