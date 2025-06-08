import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setAuthenticated(true);
      } else {
        router.replace('/auth/login');
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setAuthenticated(false);
    router.replace('/auth/login');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!authenticated) {
    return null; // Will redirect to login
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Faceless!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
}); 