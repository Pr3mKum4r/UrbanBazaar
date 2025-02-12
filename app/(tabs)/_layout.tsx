import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
            <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                        headerShown: false,
                        unmountOnBlur: true,
                    }}
                />
                <Tabs.Screen
                    name="explore"
                    options={{
                        title: 'Explore',
                        tabBarIcon: ({ color }) => <FontAwesome name="search" size={28} color={color} />,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="addpost"
                    options={{
                        title: 'Add Post',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="camera" color={color} />,
                        headerShown: false,
                        unmountOnBlur: true,
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="user-circle-o" color={color} />,
                        headerShown: false,
                    }}
                />
            </Tabs>
    );
}
