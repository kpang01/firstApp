import React, { use, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
    const { user, logout } = useAuth();
    const [showCamera, setShowCamere] = useState(false);
    
    if(showCamera) {
        return <CameraScreen onBack={() => setShowCamere(false)} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.greeting}>Hello, {user?.name}!</Text>
                <Text style={styles.username}>{user?.name ?? user?.email ?? 'User'}</Text>
            </View>
            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                <Text style={styles.logoutBtnText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}