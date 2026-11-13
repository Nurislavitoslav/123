import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppInput from '../components/ui/AppInput';
import AppButton from '../components/ui/AppButton';
import { useAuthStore } from '../store/useAuthStore';
import { colors } from '../constants/colors';
import { spacing } from '../constants/spacing';

export default function LoginScreen() {
  const [email, setEmail] = useState('student@campus.edu');
  const [password, setPassword] = useState('123456');
  const [errors, setErrors] = useState({});
  
  const login = useAuthStore((s) => s.login);
  const loading = useAuthStore((s) => s.loading);
  const storeError = useAuthStore((s) => s.error);

  const validate = () => {
    const e = {};
    if (!email.includes('@')) e.email = 'Введите корректный email';
    if (password.length < 6) e.password = 'Минимум 6 символов';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    await login(email, password);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Бюро находок</Text>
          <Text style={styles.subtitle}>
            Вход для студентов и сотрудников кампуса
          </Text>

          <View style={styles.form}>
            <AppInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
            <AppInput
              label="Пароль"
              value={password}
              onChangeText={setPassword}
              icon="lock-closed-outline"
              isPassword
              error={errors.password}
            />
            {storeError && <Text style={styles.serverError}>{storeError}</Text>}

            <AppButton
              title="Войти"
              onPress={handleLogin}
              loading={loading}
              size="lg"
            />
            <AppButton
              title="Забыли пароль?"
              variant="outline"
              size="md"
              style={{ marginTop: spacing.MD }}
              onPress={() => {}}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.BACKGROUND },
  container: { flexGrow: 1, justifyContent: 'center', padding: spacing.XL },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.TEXT_PRIMARY,
    marginBottom: spacing.SM,
  },
  subtitle: {
    fontSize: 15,
    color: colors.TEXT_SECONDARY,
    marginBottom: spacing.XXL,
  },
  form: { marginTop: spacing.LG },
  serverError: {
    color: colors.ERROR,
    marginBottom: spacing.MD,
    fontSize: 13,
  },
});
