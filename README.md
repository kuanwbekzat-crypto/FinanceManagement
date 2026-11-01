# Mint Finance

Мобильный прототип для бюджета, расходов и финансовой аналитики на Expo и React Native.

## Запуск

```powershell
npm install
npx expo start
```

Чтобы открыть web-версию:

```powershell
npx expo start --web
```

## Архитектура

- `src/app` — тонкие Expo Router маршруты и layouts.
- `src/features/auth` — вход, регистрация и восстановление пароля.
- `src/features/finance` — обзор, баланс, аналитика, категории и операции.
- `src/features/onboarding` — стартовый экран и знакомство с приложением.
- `src/features/security` — экран биометрического входа.
- `src/shared/ui` — повторно используемые элементы интерфейса и иконки.
- `src/shared/theme` — цвета, типографика и дизайн-токены.
- `src/shared/data` — демонстрационные финансовые данные.

Все финансовые данные в этом прототипе демонстрационные. Формы и действия показывают навигационный сценарий без подключения сервера или банковских счетов.

## Проверки

```powershell
npx expo lint
npx tsc --noEmit
```
