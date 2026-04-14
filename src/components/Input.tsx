import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { Colors, Typography, BorderRadius, Spacing } from '../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.inputError, style]}
        placeholderTextColor={Colors.TextSecondary}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
    marginBottom: Spacing.xs,
    fontFamily: 'Inter_600SemiBold',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.Surface,
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
  },
  inputError: {
    borderColor: Colors.Error,
  },
  errorText: {
    ...Typography.Caption,
    color: Colors.Error,
    marginTop: Spacing.xs,
  },
});
