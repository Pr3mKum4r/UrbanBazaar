import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

interface slider{
    image: string;
}

interface SliderProps {
    sliderList: slider[];
}


export default function Slider({ sliderList }: SliderProps) {
  return (
    <View className='mt-5 rounded-xl flex flex-row justify-center'>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={sliderList}
        renderItem={({item, index}) => (
            <View className='mr-5'>
                <Image source={{uri: item?.image}} className="h-[180px] w-[320px] object-cover rounded-xl"/>
            </View>
        )}
        />
    </View>
  )
}