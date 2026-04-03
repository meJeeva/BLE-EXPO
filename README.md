# VitalZ Mobile - Health Vitals Monitoring App

A React Native mobile application for monitoring health vitals at home. Built with Expo and TypeScript.

## Features

### Authentication & Onboarding
- OTP-based login (phone/email)
- Bootstrap-driven onboarding flow
- Household creation
- Family member management
- Device registration (QR scan + manual entry)
- Optional warranty registration

### Dashboard & Vitals
- Latest vitals display (SpO2, HR, HRV, RR, Temperature)
- Temperature unit toggle (°C/°F)
- Patient switching
- Real-time data refresh
- Demo mode for testing

### History & Analytics
- Log view (tabular vitals history)
- Chart view (graphical visualization)
- Session history
- Time-series data analysis

### Family Management
- Add/Edit family members
- Patient profiles with validation
- Relationship tracking
- Health metrics (height, weight, age)

### Settings
- Demo mode toggle
- User profile
- App information
- Logout functionality

## Tech Stack

- **Framework**: React Native with Expo (v54+)
- **Language**: TypeScript
- **Navigation**: Expo Router (file-based routing)
- **State Management**: Zustand
- **HTTP Client**: Axios with JWT interceptors
- **Secure Storage**: expo-secure-store
- **Offline Cache**: expo-sqlite
- **QR Scanning**: expo-camera + expo-barcode-scanner
- **Charts**: react-native-gifted-charts
- **Security**: expo-screen-capture (screenshot prevention)

## Project Structure

```
frontend/
├── app/                          # Expo Router screens (file-based routing)
│   ├── _layout.tsx              # Root layout with navigation
│   ├── index.tsx                # App entry point with routing logic
│   ├── login.tsx                # Login screen
│   ├── otp.tsx                  # OTP verification
│   ├── hospital-mode.tsx        # Hospital mode (Coming Soon)
│   ├── onboarding/              # Onboarding flow screens
│   │   ├── household.tsx
│   │   ├── add-patient.tsx
│   │   ├── device-onboarding.tsx
│   │   └── warranty.tsx
│   ├── (tabs)/                  # Main app tabs
│   │   ├── _layout.tsx
│   │   ├── dashboard.tsx
│   │   ├── history.tsx
│   │   ├── family.tsx
│   │   └── settings.tsx
│   └── patients/                # Patient management
│       ├── add.tsx
│       └── edit.tsx
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── VitalCard.tsx
│   │   ├── Loading.tsx
│   │   └── EmptyState.tsx
│   ├── config/
│   │   └── api.ts              # API configuration
│   ├── constants/
│   │   └── theme.ts            # Design tokens
│   ├── services/
│   │   └── api.ts              # API client with interceptors
│   ├── store/                  # Zustand state management
│   │   ├── authStore.ts
│   │   └── appStore.ts
│   └── utils/
│       ├── secureStore.ts      # Secure token storage
│       ├── database.ts         # SQLite offline cache
│       ├── demoMode.ts         # Demo data generator
│       └── helpers.ts          # Utility functions
└── assets/                      # Images, fonts, etc.
```

## Backend Integration

The app connects to an existing NestJS + Prisma + MySQL backend at:
- **Base URL**: `http://localhost:3000`
- **API Prefix**: `/v1`

### Key Endpoints Used

**Authentication**
- `POST /v1/auth/otp/request` - Request OTP
- `POST /v1/auth/otp/verify` - Verify OTP (returns JWT)
- `GET /v1/me` - Get current user

**Bootstrap**
- `GET /v1/bootstrap` - Get onboarding state and user data

**Households**
- `POST /v1/households` - Create household
- `GET /v1/households/me` - Get user's household

**Patients (Family Members)**
- `POST /v1/patients` - Create patient
- `GET /v1/patients` - List all patients
- `PATCH /v1/patients/:id` - Update patient

**Devices**
- `POST /v1/devices/:id/register` - Register device
- `POST /v1/devices/:id/claim` - Claim device
- `GET /v1/devices/my` - Get user's devices
- `POST /v1/devices/:id/warranty` - Register warranty

**Vitals & Sessions**
- `GET /v1/patients/:id/latest-vitals` - Get latest vitals
- `GET /v1/patients/:id/vitals` - Get vitals history
- `GET /v1/patients/:id/sessions` - Get session history
- `POST /v1/sessions` - Create session
- `POST /v1/sessions/:id/close` - Close session

## Getting Started

### Prerequisites
- Node.js 18+ and Yarn
- Expo CLI
- iOS Simulator (Mac) or Android Emulator
- Expo Go app (for physical device testing)

### Installation

1. Install dependencies:
```bash
cd frontend
yarn install
```

2. Start the development server:
```bash
yarn start
```

3. Run on device/simulator:
- Scan the QR code with Expo Go (iOS/Android)
- Press `i` for iOS Simulator
- Press `a` for Android Emulator

### Development Mode

**DEV OTP Code**: `123456` (for testing without SMS/Email)

**Demo Mode**: Enable in Settings to generate fake vitals data for UI testing

## Environment Variables

The app uses the following environment variables (configured in `.env`):

```
EXPO_PUBLIC_BACKEND_URL=https://vitalz-app-1.preview.emergentagent.com
```

## Key Features Implementation

### Bootstrap-Driven Routing
The app uses `GET /v1/bootstrap` to determine the user's onboarding state:
- No household → Create Household screen
- No patient → Add Family Member screen
- No claimed device → Device Onboarding screen
- Complete → Dashboard

### Offline Support
- SQLite database caches bootstrap and vitals data
- Upload queue for pending measurements
- Graceful degradation when offline

### Security
- JWT stored in SecureStore (encrypted)
- Screenshots globally disabled
- No sensitive data in logs
- Secure API communication

### Demo Mode
- Generates realistic fake vitals data
- Useful for UI testing and demos
- Data not uploaded to server
- Toggle in Settings

### Form Validation
All forms include strict validation:
- **Name**: 2-60 characters
- **Age**: 0-120 years
- **Phone**: 10-15 digits
- **Height**: 20-250 cm
- **Weight**: 1-300 kg
- **Notes**: Max 200 characters

## Design Tokens

### Colors
- Primary: `#0E5CAD`
- Secondary: `#27AE60`
- Background: `#F7F9FC`
- Surface: `#FFFFFF`
- Error: `#E53935`

### Typography
- H1: 22px, Bold
- H2: 18px, SemiBold
- Body: 16px/14px
- Caption: 12px

### Spacing
Uses 8pt grid: 4, 8, 16, 24, 32, 48

## Testing

### Manual Testing Checklist
- [ ] Login with OTP (use 123456)
- [ ] Complete onboarding flow
- [ ] Add family members
- [ ] Register device via QR or manual
- [ ] View vitals on dashboard
- [ ] Switch between patients
- [ ] Toggle temperature unit
- [ ] View history (log and chart)
- [ ] Enable demo mode
- [ ] Logout and re-login

## Known Limitations

1. **BLE Integration**: Stub interface only (no actual Bluetooth functionality)
2. **Hospital Mode**: UI shows "Coming Soon" placeholder
3. **Warranty**: Optional feature, can be skipped
4. **Offline Upload**: Queue scaffold present but not fully implemented

## Troubleshooting

### App won't load
- Check if backend is running at http://localhost:3000
- Verify `EXPO_PUBLIC_BACKEND_URL` in .env
- Clear Metro cache: `yarn start --clear`

### QR Scanner not working
- Grant camera permissions when prompted
- Check app.json has camera permission declarations
- Try manual device ID entry as fallback

### Charts not displaying
- Ensure vitals history has data
- Check demo mode is working
- Verify react-native-svg is installed

## Build for Production

### iOS
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

Ensure you have configured `eas.json` and have an Expo account.

## License

Proprietary - VitalZ Health Monitoring System
