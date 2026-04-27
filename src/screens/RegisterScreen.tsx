import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';

type Props = { onNavigateLogin: () => void };

export default function RegisterScreen({ onNavigateLogin }: Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.heading}>Register with us</Text>

                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. John Doe"
                        placeholderTextColor="#666"
                        keyboardType="default"
                        autoCapitalize="words"
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <Text style={styles.label}>Email</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. abc@gmail.com"
                        placeholderTextColor="#666"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Enter your password"
                        placeholderTextColor="#666"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                            name={showPassword ? 'eye-slash' : 'eye'}
                            size={20}
                            color="#ffffff"
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={[styles.input]}
                        placeholder="Enter your confirm password"
                        placeholderTextColor="#666"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Icon
                            name={showConfirmPassword ? 'eye-slash' : 'eye'}
                            size={20}
                            color="#ffffff"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Register</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={onNavigateLogin}>
                        <Text style={styles.footerLink}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: '#121212' },
    container: { paddingHorizontal: 24, paddingTop: 80, paddingBottom: 40, flexGrow: 1, backgroundColor: '#121212' },
    heading: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 32 },
    label: { color: '#aaa', fontSize: 13, marginBottom: 6, marginTop: 16 },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#333', borderRadius: 10, backgroundColor: '#1e1e1e', paddingHorizontal: 14, height: 50 },
    input: { flex: 1, color: '#fff', fontSize: 15 },
    eyeIcon: { fontSize: 18, padding: 8 },
    primaryButton: { backgroundColor: '#4f46e5', borderRadius: 10, height: 52, alignItems: 'center', justifyContent: 'center', marginTop: 32, marginBottom: 24 },
    primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    footer: { flexDirection: 'row', justifyContent: 'center' },
    footerText: { color: '#888', fontSize: 14 },
    footerLink: { color: '#4f46e5', fontSize: 14, fontWeight: 'bold' }
});