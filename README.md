# Cinemans Mobile

Professional Expo movie app with Home, Search, Details, Saved watchlist, and Profile.

## Setup

1. Install deps

```bash
npm install
```

2. Configure env

```bash
cp .env.example .env
# then set EXPO_PUBLIC_MOVIE_API_KEY
```

3. Run app

```bash
npx expo start
```

## Quality checks

```bash
npx expo-doctor
npm run lint
npm run typecheck
```

## Android preview APK (EAS)

```bash
eas login
eas build:configure
eas build --profile preview --platform android
```

Or use:

```bash
npm run build:android:preview
```
