import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, fontFamily } from '../../constants/theme';

export default function PseudonymousScreen() {
  const [nickname, setNickname] = useState('');
  const router = useRouter();

  const handleContinue = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/pseudonymous', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname }),
      });
      const data = await res.json();
      if (res.ok) {
        Alert.alert('Welcome, guest!');
        // Save token, navigate, etc.
      } else {
        Alert.alert('Failed', data.error || 'Unknown error');
      }
    } catch (err) {
      Alert.alert('Error', 'Could not connect to server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Continue as Guest</Text>
      <Text style={styles.subheader}>Thread your thoughts anonymously</Text>
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        placeholderTextColor={colors.accent}
        value={nickname}
        onChangeText={setNickname}
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('./login')} style={styles.link}>
        <Text style={styles.linkText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('./register')} style={styles.link}>
        <Text style={styles.linkText}>Register</Text>
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
}); 