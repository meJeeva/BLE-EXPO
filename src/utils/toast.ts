import Toast from 'react-native-toast-message';
import { Colors } from '../constants/theme';

export interface ToastConfig {
  type?: 'success' | 'error' | 'info' | 'warning';
  text1?: string;
  text2?: string;
  position?: 'top' | 'bottom';
  visibilityTime?: number;
  autoHide?: boolean;
  topOffset?: number;
  bottomOffset?: number;
  keyboardOffset?: number;
  onShow?: () => void;
  onHide?: () => void;
  onPress?: () => void;
}

const showToast = ({
  type = 'info',
  text1,
  text2,
  position = 'top',
  visibilityTime = 3000,
  autoHide = true,
  topOffset = 50,
  bottomOffset = 40,
  ...props
}: ToastConfig) => {
  Toast.show({
    type,
    text1,
    text2,
    position,
    visibilityTime,
    autoHide,
    topOffset,
    bottomOffset,
    ...props,
  });
};

// Predefined toast functions
export const toast = {
  success: (message: string, description?: string) =>
    showToast({
      type: 'success',
      text1: message,
      text2: description,
    }),

  error: (message: string, description?: string) =>
    showToast({
      type: 'error',
      text1: message,
      text2: description,
    }),

  info: (message: string, description?: string) =>
    showToast({
      type: 'info',
      text1: message,
      text2: description,
    }),

  warning: (message: string, description?: string) =>
    showToast({
      type: 'warning',
      text1: message,
      text2: description,
    }),

  // Custom toast with more options
  custom: (config: ToastConfig) => showToast(config),

  // Hide toast manually
  hide: () => Toast.hide(),
};

export default toast;
