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
    heading: string
}

export default function LatestItemList({latestItemList, heading}: LatestItemListProps) {
  return (
    <View className='mt-4'>
        <Text className='ml-2 font-bold text-[20px]'>{heading}</Text>
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