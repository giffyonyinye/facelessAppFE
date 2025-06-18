import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fontFamily } from '../../constants/theme';
import { API_ENDPOINTS, apiRequest } from '../../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    if (!email.trim() || !password.trim() || !nickname.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      const data = await apiRequest(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        body: JSON.stringify({
          email: email.trim(),
          password,
          nickname: nickname.trim()
        }),
      });

      // Save token and navigate
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      Alert.alert('Success', 'Registration successful');
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'Could not connect to server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>
      <Text style={styles.subheader}>Join Faceless and start threading!</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        placeholderTextColor={colors.accent}
        value={nickname}
        onChangeText={setNickname}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('./login')} style={styles.link}>
        <Text style={styles.linkText}>Already have an account? <Text style={styles.linkAccent}>Login</Text></Text>
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