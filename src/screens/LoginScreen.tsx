import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { signInWithGoogle } from '../services/google_signin';
import Icon from 'react-native-vector-icons/FontAwesome';
import { 
    View, Text, TextInput, TouchableOpacity, StyleSheet,
    KeyboardAvoidingView, Platform, ScrollView,
    Image,
} from 'react-native';

type Props = { onNavigateRegister: () => void };

export default function LoginScreen({ onNavigateRegister }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                <Text style={styles.heading}>Let's Log you in</Text>

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
                        style={styles.input}
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

                <TouchableOpacity >
                    <Text style={styles.forgotPassword}>Forgot password?</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>Login</Text>
                </TouchableOpacity>

                <View style={styles.container_seperate}>
                            <View style={styles.line_seperate} />
                            <Text style={styles.text_seperate}>OR</Text>
                            <View style={styles.line_seperate} />
                </View>
                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialButton}>
                        <FontAwesome name="apple" style={styles.socialIcon_apple} />
                        <Text style={styles.socialText}>Continue with Apple</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.socialRow}>
                    <TouchableOpacity onPress={signInWithGoogle} style={styles.socialButton}>
                        <Image source={require('../assets/google.png')} style={styles.socialIcon_google} />
                        <Text style={styles.socialText}>Continue with Google</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={onNavigateRegister}>
                        <Text style={styles.footerLink}>Register</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles =StyleSheet.create({
    flex: { flex: 1, backgroundColor: '#121212' },
    container: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 80, paddingBottom: 40, backgroundColor: '#121212' },
    heading: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#fff' },
    label: { color: "#fffbfb", fontSize: 13, marginBottom: 6, marginTop: 16 },
    inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e1e1e', borderRadius: 10, borderWidth: 1, borderColor: '#333', paddingHorizontal: 12 },
    input: { color: '#fff', flex: 1, fontSize: 15 },
    forgotPassword: { textAlign: 'left', margin: 10, color: '#4f46e5', fontSize: 14, fontWeight: 'bold' },
    dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 28 },
    dividerLine: { flex: 1, height: 1, backgroundColor: '#333' },
    dividerText: { marginHorizontal: 12, color: '#666', fontSize: 13 },
    socialRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 28 },
    socialButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 10, backgroundColor: '#1e1e1e', height: 48, gap: 8, borderColor: '#333' },
    socialIcon_apple: { fontSize: 30, color: '#fff', fontWeight: 'bold', position: 'absolute', left: 20},
    socialIcon_google: { width: 28, height: 28, position: 'absolute', left: 20 },
    socialText: { color: '#fff', fontSize: 14 },
    primaryButton: { backgroundColor: '#ffffff', borderRadius: 10, height: 48, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
    primaryButtonText: { color: '#060606', fontSize: 16, fontWeight: 'bold' },
    footer: { flexDirection: 'row', justifyContent: 'center' },
    footerText: { color: '#888', fontSize: 14 },
    footerLink: { color: '#4f46e5', fontWeight: 'bold', fontSize: 14 },
    button_google: { alignItems: 'center', padding: 20 },
    container_seperate: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
    line_seperate: { flex: 1, height: 1, backgroundColor: '#ccc' },
    text_seperate: { alignItems: 'center', marginHorizontal: 20, color: '#888', fontWeight: 'bold', },
});