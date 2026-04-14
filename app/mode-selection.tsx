import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/theme';
import { USAGE_TYPES, UsageType } from '@/src/constants/usageTypes';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/src/store/authStore';
import { saveAppMode } from '@/src/utils/mode';

export default function ModeSelection() {
  const router = useRouter();
  const { setAppMode } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<'HOME' | 'HOSPITAL' | null>(null);

  const handleSelectMode = async (mode: 'HOME' | 'HOSPITAL') => {
    setLoading(true);
    try {
      await saveAppMode(mode);
      setAppMode(mode);

      if (mode === 'HOME') {
        router.replace('/home-mode/login');
      } else {
        router.push('/hospital-mode');
      }
    } catch (error) {
      console.error('Error saving mode:', error);
    } finally {
      setLoading(false);
    }
  };

  const onHandleContinue = () => {
    if (selected) handleSelectMode(selected);
  }

  const RenderUsageType = ({ item }: { item: UsageType }) => {
    const isSelected = selected === item.id;

    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.card,
          isSelected && styles.selectedCard,
        ]}
        onPress={() => setSelected(item.id)}
      >
        <View
          style={[
            styles.iconBox,
            { backgroundColor: item.bgColor },
          ]}
        >
          <Ionicons
            name={item.icon as any}
            size={24}
            color={item.iconColor}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardSubtitle}>
            {item.subtitle}
          </Text>
        </View>

        {
          isSelected && (
            <Ionicons
              name={'checkmark-circle'
              }
              size={22}
              color={Colors.Primary
              }
            />
          )
        }
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar barStyle={'dark-content'} />
      <View style={styles.content}>
        <Text style={styles.title}>Choose Usage Type</Text>
        <Text style={styles.subtitle}>How will you use VitalZ?</Text>

        <View style={styles.iconContainer}>
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.appIcon}
            resizeMode="contain"
          />
        </View>

        <View style={styles.cardContainer}>
          <FlatList
            data={USAGE_TYPES}
            renderItem={RenderUsageType}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cardContainer}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            !selected && { opacity: 0.5 },
          ]}
          disabled={!selected || loading}
          onPress={onHandleContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    justifyContent: 'space-between',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.TextPrimary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.TextSecondary,
    marginBottom: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  appIcon: {
    width: 120,
    height: 120,
  },
  cardContainer: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.Surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.Border,
  },
  selectedCard: {
    borderColor: Colors.primaryBackground,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.TextPrimary,
  },
  cardSubtitle: {
    fontSize: 13,
    color: Colors.TextSecondary,
    marginTop: 4,
  },
  footer: {
    padding: 20,
  },
  button: {
    backgroundColor: Colors.Primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.TextWhite,
    fontWeight: '600',
    fontSize: 16,
  },
});
