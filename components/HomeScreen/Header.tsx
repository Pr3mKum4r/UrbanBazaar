import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import '../../global.css'
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Header() {
    const { user } = useUser();
    console.log(user?.imageUrl);

    return (
        <>
            <View style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'row', gap: 10 }}>
                <Image source={{ uri: user?.imageUrl }} style={{ width: 50, height: 50, borderRadius: 40 }} />
                <View className='justify-center'>
                    <Text className='text-[16px] '>Welcome</Text>
                    <Text className='text-xl font-bold'>{user?.fullName}</Text>
                </View>
            </View>
            <View className='flex flex-row items-center p-3 px-5 mt-5 gap-2 bg-gray-200 rounded-full'>
                <Ionicons name="search" size={22} color="gray" />
                <TextInput placeholder='Search' className='text-[18px]'/>
            </View>
        </>
    )
}