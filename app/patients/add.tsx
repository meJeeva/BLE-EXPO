import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { api } from '../../src/services/api';
import { useAuthStore } from '../../src/store/authStore';
import { useAppStore } from '../../src/store/appStore';
import { Input } from '../../src/components/Input';
import { Button } from '../../src/components/Button';
import { Colors, Typography, Spacing } from '../../src/constants/theme';
import { validateName, validatePhone, validateAge, validateHeight, validateWeight } from '../../src/utils/helpers';

export default function AddPatient() {
  const router = useRouter();
  const { fetchBootstrap } = useAuthStore();
  const { fetchPatients } = useAppStore();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  
  const [formData, setFormData] = useState({
    full_name: '',
    relationship: 'self',
    gender: 'male',
    age_years: '',
    phone: '',
    height_cm: '',
    weight_kg: '',
    notes: '',
  });

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' });
  };

  const validate = () => {
    const newErrors: any = {};
    
    if (!validateName(formData.full_name)) {
      newErrors.full_name = 'Name must be 2-60 characters';
    }
    
    if (formData.age_years && !validateAge(parseInt(formData.age_years))) {
      newErrors.age_years = 'Age must be 0-120 years';
    }
    
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Phone must be 10-15 digits';
    }
    
    if (formData.height_cm && !validateHeight(parseFloat(formData.height_cm))) {
      newErrors.height_cm = 'Height must be 20-250 cm';
    }
    
    if (formData.weight_kg && !validateWeight(parseFloat(formData.weight_kg))) {
      newErrors.weight_kg = 'Weight must be 1-300 kg';
    }
    
    if (formData.notes.length > 200) {
      newErrors.notes = 'Notes must be max 200 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const payload: any = {
        full_name: formData.full_name.trim(),
        relationship: formData.relationship,
        gender: formData.gender,
      };
      
      if (formData.age_years) payload.age_years = parseInt(formData.age_years);
      if (formData.phone) payload.phone = formData.phone.trim();
      if (formData.height_cm) payload.height_cm = parseFloat(formData.height_cm);
      if (formData.weight_kg) payload.weight_kg = parseFloat(formData.weight_kg);
      if (formData.notes) payload.notes = formData.notes.trim();

      await api.createPatient(payload);

      // Refresh data
      await fetchBootstrap();
      await fetchPatients();
      
      Alert.alert('Success', 'Family member added successfully', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to add family member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Input
            label="Full Name *"
            placeholder="Enter full name"
            value={formData.full_name}
            onChangeText={(text) => updateField('full_name', text)}
            error={errors.full_name}
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Relationship *</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.relationship}
                onValueChange={(value) => updateField('relationship', value)}
                style={styles.picker}
              >
                <Picker.Item label="Self" value="self" />
                <Picker.Item label="Spouse" value="spouse" />
                <Picker.Item label="Parent" value="parent" />
                <Picker.Item label="Child" value="child" />
                <Picker.Item label="Sibling" value="sibling" />
                <Picker.Item label="Grandparent" value="grandparent" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Gender *</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={formData.gender}
                onValueChange={(value) => updateField('gender', value)}
                style={styles.picker}
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
          </View>

          <Input
            label="Age (Years)"
            placeholder="Enter age"
            value={formData.age_years}
            onChangeText={(text) => updateField('age_years', text)}
            keyboardType="number-pad"
            error={errors.age_years}
          />

          <Input
            label="Phone (Optional)"
            placeholder="Enter phone number"
            value={formData.phone}
            onChangeText={(text) => updateField('phone', text)}
            keyboardType="phone-pad"
            error={errors.phone}
          />

          <Input
            label="Height (cm)"
            placeholder="Enter height in cm"
            value={formData.height_cm}
            onChangeText={(text) => updateField('height_cm', text)}
            keyboardType="decimal-pad"
            error={errors.height_cm}
          />

          <Input
            label="Weight (kg)"
            placeholder="Enter weight in kg"
            value={formData.weight_kg}
            onChangeText={(text) => updateField('weight_kg', text)}
            keyboardType="decimal-pad"
            error={errors.weight_kg}
          />

          <Input
            label="Notes (Optional)"
            placeholder="Any additional notes"
            value={formData.notes}
            onChangeText={(text) => updateField('notes', text)}
            multiline
            numberOfLines={2}
            maxLength={200}
            style={{ height: 60, textAlignVertical: 'top', paddingTop: 12 }}
            error={errors.notes}
          />

          <Button
            title="Add Family Member"
            onPress={handleSubmit}
            loading={loading}
            disabled={loading}
            style={styles.button}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.lg,
  },
  pickerContainer: {
    marginBottom: Spacing.md,
  },
  pickerLabel: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
    marginBottom: Spacing.xs,
        fontFamily: 'Inter_600SemiBold',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 8,
    backgroundColor: Colors.Surface,
  },
  picker: {
    height: 48,
  },
  button: {
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
});
