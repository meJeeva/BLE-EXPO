import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { api } from '../../../src/services/api';
import { useAuthStore } from '../../../src/store/authStore';
import { Colors, Typography, Spacing, BorderRadius } from '../../../src/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddPatient() {
  const router = useRouter();
  const { logout, fetchBootstrap } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    gender: 'male',
    relationship: 'Self',
  });

  const [dob, setDob] = useState<Date | null>(null);
  const [showDate, setShowDate] = useState(false);
  const [showRelationshipDropdown, setShowRelationshipDropdown] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB');
  };

  const relationshipOptions = [
    'Self',
    'Spouse',
    'Parent',
    'Child',
    'Sibling',
    'Grandparent',
    'Other'
  ];

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    } else if (formData.full_name.trim().length < 2) {
      newErrors.full_name = 'Name must be at least 2 characters';
    } else if (formData.full_name.trim().length > 60) {
      newErrors.full_name = 'Name must be less than 60 characters';
    }

    if (!dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();
      const actualAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

      if (actualAge < 0) {
        newErrors.dob = 'Date of birth cannot be in the future';
      } else if (actualAge > 120) {
        newErrors.dob = 'Please enter a valid date of birth';
      }
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!formData.relationship) {
      newErrors.relationship = 'Relationship is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const payload: any = {
        full_name: formData.full_name.trim(),
        relationship: formData.relationship,
        gender: formData.gender,
      };

      await api.createPatient(payload);

      await fetchBootstrap();

      router.replace('/home-mode/onboarding/device-onboarding');
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to add family member');
    } finally {
      setLoading(false);
    }
  };


  const GenderSelector = () => {
    const options = ['male', 'female', 'other'];

    return (
      <View style={styles.genderRow}>
        {options.map((item) => {
          const isActive = formData.gender === item;

          return (
            <TouchableOpacity
              key={item}
              style={[
                styles.genderBtn,
                isActive && styles.genderBtnActive,
              ]}
              onPress={() => updateField('gender', item)}
            >
              <Text
                style={[
                  styles.genderText,
                  isActive && styles.genderTextActive,
                ]}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.header}>
            <Text style={styles.title}>Add Family Member</Text>
            <Text style={styles.subtitle}>
              Add a family member to start monitoring
            </Text>
          </View>

          <Text style={styles.label}>Full Name</Text>
          <View style={styles.inputBox}>
            <Ionicons name="person-outline" size={18} color={Colors.lightGrey} />
            <TextInput
              placeholder="Enter full name"
              placeholderTextColor={Colors.TextSecondary}
              value={formData.full_name}
              onChangeText={(text) => updateField('full_name', text)}
              style={styles.input}
            />
          </View>
          {errors.full_name && <Text style={styles.errorText}>{errors.full_name}</Text>}

          <Text style={styles.label}>Age / Date of Birth</Text>
          <TouchableOpacity
            style={styles.inputBox}
            onPress={() => setShowDate(true)}
          >
            <Ionicons name="calendar-outline" size={18} color={Colors.lightGrey} />
            <Text style={styles.inputText}>
              {dob ? formatDate(dob) : 'Select Date of Birth'}
            </Text>
          </TouchableOpacity>

          {showDate && (
            <DateTimePicker
              value={dob || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDate(false);
                if (selectedDate) {
                  setDob(selectedDate);
                  setErrors({ ...errors, dob: '' });
                }
              }}
            />
          )}
          {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

          <Text style={styles.label}>Gender</Text>
          <GenderSelector />

          <Text style={styles.label}>Relationship</Text>
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowRelationshipDropdown(!showRelationshipDropdown)}
            >
              <Ionicons name="people-outline" size={20} color={Colors.lightGrey} style={styles.sellerIcon} />
              <Text style={styles.dropdownText}>
                {formData.relationship}
              </Text>
              <Ionicons
                name={showRelationshipDropdown ? "chevron-up" : "chevron-down"}
                size={16}
                color={Colors.Primary}
              />
            </TouchableOpacity>

            {showRelationshipDropdown && (
              <View style={styles.dropdownList}>
                {relationshipOptions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      updateField('relationship', item);
                      setShowRelationshipDropdown(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.primaryBtn} onPress={handleSubmit} disabled={loading}>
            <Text style={styles.primaryText}>{loading ? 'Saving...' : 'Save Member'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryBtn} onPress={() => router.navigate('/home-mode/drawer/dashboard')}>
            <Text style={styles.secondaryText}>Skip for Now</Text>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },

  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
  },

  header: {
    marginBottom: Spacing.lg,
  },

  title: {
    ...Typography.H1,
    color: Colors.TextPrimary,
  },

  subtitle: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
    marginTop: Spacing.xs,
  },

  label: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
    marginBottom: Spacing.xs,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.Border,
    backgroundColor: Colors.Surface,
    marginBottom: Spacing.md,
  },

  input: {
    marginLeft: Spacing.xs,
    flex: 1,
    color: Colors.TextPrimary,
  },

  inputText: {
    marginLeft: Spacing.sm,
    color: Colors.TextPrimary,
    marginVertical: Spacing.sm,
  },

  genderRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },

  genderBtn: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.Border,
    alignItems: 'center',
    backgroundColor: Colors.Surface,
  },

  genderBtnActive: {
    backgroundColor: Colors.PrimaryLight,
    borderColor: Colors.Primary,
  },

  genderText: {
    ...Typography.BodySmall,
    color: Colors.TextSecondary,
  },

  genderTextActive: {
    ...Typography.Body,
    color: Colors.Primary,
  },

  primaryBtn: {
    marginTop: Spacing.lg,
    backgroundColor: Colors.Primary,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
  },

  primaryText: {
    ...Typography.Body,
    color: Colors.TextWhite,
  },

  secondaryBtn: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.Border,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.xl,
    alignItems: 'center',
  },

  secondaryText: {
    ...Typography.Body,
    color: Colors.TextSecondary,
  },
  dropdownContainer: {
    marginBottom: Spacing.md,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.Surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 50,
    borderWidth: 1,
    borderColor: Colors.Border,
  },
  sellerIcon: {
    marginRight: Spacing.sm,
  },
  dropdownText: {
    flex: 1,
    fontSize: 14,
    color: Colors.TextPrimary,
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: Colors.DropdownBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.Border,
    maxHeight: 200,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  dropdownItemText: {
    fontSize: 14,
    color: Colors.TextPrimary,
  },
  errorText: {
    ...Typography.Caption,
    color: Colors.Error,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
});