import { Redirect } from 'expo-router';

export default function Index() {
    // In a real app, check for auth token here
    // For this prototype, we always start at the Login screen
    return <Redirect href="/(auth)/login" />;
}
