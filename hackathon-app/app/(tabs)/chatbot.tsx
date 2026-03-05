import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, FlatList } from 'react-native';
import { Theme } from '../../constants/DesignSystem';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
};

import { useRouter } from 'expo-router';

import { chatbotApi } from '../../constants/Api';

export default function ChatbotScreen() {
    const router = useRouter();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hello! I am your AI campus assistant. How can I help you today?', sender: 'bot', timestamp: new Date() }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    const sendMessage = async () => {
        if (!input.trim() || isTyping) return;

        const userMessage: Message = {
            id: Math.random().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await chatbotApi.sendMessage(input);
            const botMessage: Message = {
                id: Math.random().toString(),
                text: response.data.reply,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error: any) {
            console.error('Chatbot API Error:', error.response?.data || error.message);
            const errorMessage: Message = {
                id: Math.random().toString(),
                text: "I'm sorry, I'm having trouble connecting to the campus AI server.",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    useEffect(() => {
        if (flatListRef.current) {
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
        }
    }, [messages]);

    const renderItem = ({ item }: { item: Message }) => (
        <View style={[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.botBubble]}>
            <Text style={[styles.messageText, item.sender === 'user' ? styles.userText : styles.botText]}>
                {item.text}
            </Text>
            <Text style={styles.timestamp}>
                {item.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.backButtonContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Ionicons name="arrow-back" size={24} color={Theme.colors.text} />
                    <Text style={styles.backText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.header}>
                <LinearGradient
                    colors={['#8B5CF6', '#6366F1']}
                    style={styles.headerGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.headerContent}>
                        <View style={styles.botIcon}>
                            <Ionicons name="chatbubbles" size={30} color="#FFF" />
                        </View>
                        <View>
                            <Text style={styles.headerTitle}>AI Assistant</Text>
                            <Text style={styles.headerStatus}>
                                {isTyping ? 'Typing...' : 'Online / Powered by Gemini'}
                            </Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.chatList}
                contentContainerStyle={styles.chatContent}
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <View style={styles.inputArea}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type message here..."
                        value={input}
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                    />
                    <TouchableOpacity
                        style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
                        onPress={sendMessage}
                        disabled={!input.trim()}
                    >
                        <Ionicons name="send" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    header: {
        height: 120,
        overflow: 'hidden',
    },
    headerGradient: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Theme.spacing.lg,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    botIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Theme.spacing.md,
    },
    headerTitle: {
        ...Theme.typography.h2,
        color: '#FFF',
    },
    headerStatus: {
        ...Theme.typography.bodySmall,
        color: 'rgba(255,255,255,0.8)',
    },
    chatList: {
        flex: 1,
    },
    chatContent: {
        padding: Theme.spacing.md,
        paddingBottom: Theme.spacing.lg,
    },
    backButtonContainer: {
        backgroundColor: Theme.colors.surface,
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: Theme.spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.border,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        ...Theme.typography.bodySmall,
        color: Theme.colors.text,
        fontWeight: '600',
        marginLeft: Theme.spacing.sm,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: Theme.spacing.md,
        borderRadius: Theme.radius.lg,
        marginBottom: Theme.spacing.sm,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 1 },
            },
            android: {
                elevation: 1,
            },
            web: {
                boxShadow: '0px 1px 5px rgba(0,0,0,0.05)',
            },
        }),
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: Theme.colors.primary,
        borderBottomRightRadius: 2,
    },
    botBubble: {
        alignSelf: 'flex-start',
        backgroundColor: Theme.colors.surface,
        borderBottomLeftRadius: 2,
    },
    messageText: {
        ...Theme.typography.body,
        fontSize: 15,
    },
    botText: {
        color: Theme.colors.text,
    },
    userText: {
        color: '#FFF',
    },
    timestamp: {
        fontSize: 10,
        color: 'rgba(0,0,0,0.3)',
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    inputArea: {
        flexDirection: 'row',
        padding: Theme.spacing.md,
        backgroundColor: Theme.colors.surface,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: Theme.colors.border,
    },
    input: {
        flex: 1,
        backgroundColor: Theme.colors.background,
        borderRadius: Theme.radius.full,
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: Theme.spacing.sm,
        marginRight: Theme.spacing.md,
        fontSize: 16,
        color: Theme.colors.text,
    },
    sendBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: Theme.colors.primary,
                shadowOpacity: 0.3,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
            },
            android: {
                elevation: 3,
            },
            web: {
                boxShadow: `0px 2px 4px rgba(0, 98, 255, 0.3)`,
            },
        }),
    },
    sendBtnDisabled: {
        backgroundColor: Theme.colors.textSecondary,
    }
});
