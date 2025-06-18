import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fontFamily } from '../../constants/theme';
import { API_ENDPOINTS, apiRequest } from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      const data = await apiRequest(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), password }),
      });

      // Save token and navigate
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      Alert.alert('Success', 'Login successful');
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Could not connect to server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back</Text>
      <Text style={styles.subheader}>Sign in to continue</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.accent}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={colors.accent}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('./register')} style={styles.link}>
        <Text style={styles.linkText}>Don't have an account? <Text style={styles.linkAccent}>Register</Text></Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('./pseudonymous')} style={styles.link}>
        <Text style={styles.linkText}>Continue as <Text style={styles.linkAccent}>Guest</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    fontFamily,
    marginBottom: 8,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 18,
    color: colors.accent,
    fontFamily,
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: colors.card,
    color: colors.text,
    fontFamily,
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: colors.text,
    fontFamily,
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    alignItems: 'center',
    marginBottom: 8,
  },
  linkText: {
    color: colors.text,
    fontFamily,
    fontSize: 15,
  },
  linkAccent: {
    color: colors.primary,
    fontFamily,
    fontWeight: 'bold',
  },
}); 