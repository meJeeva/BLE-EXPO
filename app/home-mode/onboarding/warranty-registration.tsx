import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  FlatList,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '../../../src/components/Input';
import { Button } from '../../../src/components/Button';
import { Colors, Typography, Spacing } from '../../../src/constants/theme';
import OwnershipConfirmedScreen from './OwnershipConfirmed';
import { api } from '@/src/services/api';

export default function Warranty() {
  const router = useRouter();
  const params = useLocalSearchParams<{ deviceId: string }>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    purchaseDate: '',
    deviceId: params.deviceId ?? '',
    nickname: '',
  });

  const [showSellerDropdown, setShowSellerDropdown] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState('');
  const [showOwnershipConfirmed, setShowOwnershipConfirmed] = useState(false);

  const sellers = [
    'Select Seller',
    'Amazon',
    'Flipkart',
    'Official Website',
    'Hospital Purchase',
    'Authorized Distributor',
    'Other'
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.registerWarranty(params.deviceId, {
        purchase_date: formData.purchaseDate,
        nickname: formData.nickname || undefined,
      });

      Alert.alert('Success', 'Warranty registered successfully', [
        { text: 'OK', onPress: () => router.replace('/') },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to register warranty');
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {
            !showOwnershipConfirmed ?
              <>
                <View style={styles.header}>
                  <Text style={styles.title}>Warranty Registration</Text>
                  <Text style={styles.subtitle}>
                    Register your device warranty
                  </Text>
                </View>

                <View style={styles.form}>

                  <Input
                    label="Device ID"
                    placeholder="Enter device ID manually"
                    value={formData.deviceId}
                    onChangeText={(text) => {
                      setFormData({ ...formData, deviceId: text });
                    }}
                    autoCapitalize="characters"
                  />

                  <Input
                    label="Device Nickname (Optional)"
                    placeholder="e.g., Living Room Device"
                    value={formData.nickname}
                    onChangeText={(text) => setFormData({ ...formData, nickname: text })}
                  />

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Purchase Date</Text>
                    <View style={styles.dateInputWrapper}>
                      <Ionicons name="calendar" size={20} color={Colors.lightGrey} style={styles.calendarIconLeft} />
                      <TextInput
                        style={styles.dateInput}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor={Colors.TextSecondary}
                        value={formData.purchaseDate}
                        onChangeText={(text) => setFormData({ ...formData, purchaseDate: text })}
                      />
                      <Ionicons name="calendar" size={20} color={Colors.lightGrey} style={styles.calendarIconRight} />
                    </View>
                  </View>

                  <View style={styles.dropdownContainer}>
                    <TouchableOpacity
                      style={styles.dropdownButton}
                      onPress={() => setShowSellerDropdown(!showSellerDropdown)}
                    >
                      <Ionicons name="business" size={20} color={Colors.lightGrey} style={styles.sellerIcon} />
                      <Text style={styles.dropdownText}>
                        {selectedSeller || 'Select seller'}
                      </Text>
                      <Ionicons
                        name={showSellerDropdown ? "chevron-up" : "chevron-down"}
                        size={16}
                        color={Colors.Primary}
                      />
                    </TouchableOpacity>

                    {showSellerDropdown && (
                      <View style={styles.dropdownList}>
                        <FlatList
                          data={sellers}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={({ item, index }) => (
                            <TouchableOpacity
                              style={styles.dropdownItem}
                              onPress={() => {
                                setSelectedSeller(item);
                                setShowSellerDropdown(false);
                              }}
                            >
                              <Text style={styles.dropdownItemText}>{item}</Text>
                            </TouchableOpacity>
                          )}
                          style={styles.dropdownScroll}
                          nestedScrollEnabled
                          showsVerticalScrollIndicator={false}
                        />
                      </View>
                    )}
                  </View>

                  <WarrantyBenefitsCard />

                  <Button
                    title="Continue Setup"
                    // onPress={handleSubmit}
                    onPress={() => {
                      setShowOwnershipConfirmed(true);
                    }}
                    loading={loading}
                    // disabled={loading || !formData.purchaseDate}
                    style={styles.button}
                  />


                  {/* <Button
              title="Skip for Now"
              onPress={handleSkip}
              variant="outline"
              style={styles.button}
            /> */}
                </View>
              </>
              :
              <OwnershipConfirmedScreen />
          }
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const WarrantyBenefitsCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Warranty Benefits:</Text>

      <Text style={styles.item}>• 2 years comprehensive warranty</Text>
      <Text style={styles.item}>• Free firmware updates</Text>
      <Text style={styles.item}>• Priority customer support</Text>
      <Text style={styles.item}>• Calibration services included</Text>
    </View>
  );
};

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
  header: {
    marginBottom: Spacing.xl,
  },
  title: {
    ...Typography.H1,
    color: Colors.TextPrimary,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.Body,
    color: Colors.TextSecondary,
  },
  form: {
    flex: 1,
  },
  button: {
    marginVertical: Spacing.md,
  },
  card: {
    backgroundColor: Colors.PrimaryLight,
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
  },
  item: {
    ...Typography.Caption,
    color: Colors.TextSecondary,
    marginBottom: 6,
    lineHeight: 18,
  },
  dropdownContainer: {
    marginBottom: 16,
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
  },
  dropdownText: {
    flex: 1,
    ...Typography.Caption,
    color: Colors.TextPrimary,
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.Border,
    maxHeight: 200,
    zIndex: 1000,
  },
  dropdownScroll: {
    maxHeight: 180,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Border,
  },
  dropdownItemText: {
    ...Typography.Caption,
    color: Colors.TextPrimary,
  },
  inputContainer: {
    marginBottom: Spacing.md,
  },
  label: {
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
    marginBottom: Spacing.xs,
  },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderWidth: 1,
    borderColor: Colors.Border,
    borderRadius: 12,
    backgroundColor: Colors.Surface,
    paddingHorizontal: Spacing.md,
  },
  dateInput: {
    flex: 1,
    height: '100%',
    ...Typography.BodySmall,
    color: Colors.TextPrimary,
    paddingHorizontal: Spacing.sm,
  },
  calendarIconLeft: {
    marginRight: Spacing.sm,
  },
  calendarIconRight: {
    marginLeft: Spacing.sm,
  },
  sellerIcon: {
    marginRight: Spacing.sm,
  },
});
