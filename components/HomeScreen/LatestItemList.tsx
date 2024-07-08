import { View, Text, FlatList, Image, Pressable } from 'react-native'
import React from 'react'
import Item from './Item'

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

interface LatestItemListProps {
    latestItemList: ItemList[];
}

export default function LatestItemList({latestItemList}: LatestItemListProps) {
  return (
    <View className='mt-4'>
        <Text className='font-bold text-[20px]'>Latest Items</Text>
        <FlatList
        data = {latestItemList}
        numColumns={2}
        renderItem={({ item, index }) => (
            <Item item={item}/>
        )}
        />
    </View>
  )
}