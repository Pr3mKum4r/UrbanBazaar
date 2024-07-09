import { View, Text, FlatList, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router';

interface Category {
    icon: string;
    name: string;
}

interface CategoryProps {
    categoryList: Category[];
}

export default function Categories({ categoryList }: CategoryProps) {
    type Nav = {
        navigate: (value: string, object: object) => void;
      }
      
    const { navigate } = useNavigation<Nav>()

    return (
        <View className='mt-4'>
            <Text className='font-bold text-[20px]'>Categories</Text>
            <FlatList
                data={categoryList}
                numColumns={4}
                
                renderItem={({ item, index }) => (
                    <Pressable onPress={()=> navigate('ItemList', {category: item?.name})} className='flex-1 items-center jusitfy-center p-2 border-[1px] border-blue-300 m-1 h-[80px] rounded-lg bg-blue-50'>
                        <Image source={{ uri: item?.icon }} className="h-[40px] w-[40px]" />
                        <Text className='text-[12px] mt-1'>{item?.name}</Text>
                    </Pressable>
                )}
            />
        </View>
    )
}