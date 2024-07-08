import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'

type ItemList = {
    title: string
    desc: string
    price: string
    category: string
    address: string
    image: string
    userName: string
    userEmail: string
    userImage: string
    createdAt: string
}

interface ItemListProp {
    item: ItemList;
}

export default function Item({item}: ItemListProp) {
  return (
    <Pressable className='flex-1 m-2 rounded-lg border-2 px-1 py-2 border-slate-200'>
                <Image source={{uri: item?.image}} className="h-[140px] w-full rounded-lg" />
                <View className='px-2 gap-1'>
                     <Text className='text-[15px] font-bold mt-2'>{item?.title}</Text>
                     <Text className='text-[20px] font-bold text-blue-500'>${item?.price}</Text>
                     <Text className='text-blue-500 bg-blue-200 p-1 rounded-full px-2 text-[12px] self-start'><Text>{item?.category}</Text></Text>
                </View>
    </Pressable>
  )
}