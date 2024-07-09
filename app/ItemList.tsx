import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '@/firebaseConfig';
import LatestItemList from '@/components/HomeScreen/LatestItemList';

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

export default function ItemList() {
  const { params } = useRoute();
  const db = getFirestore(app);

  const [itemList, setItemList] = useState<ItemList[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getItemListByCategory();
  }, []);

  const getItemListByCategory = async () => {
    setLoading(true);
    console.log(params?.category);
    const items: ItemList[] = [];
    const q = query(collection(db, 'UserPost'), where('category', '==', params?.category));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
      console.log(doc.data());
      items.push(doc.data() as ItemList);
    });
    setItemList(items);
    setLoading(false);
  }
  return (
    <View className='py-10 px-4'>
      {loading?
      <ActivityIndicator className='mt-24' size='large' color='blue'/>:
      <LatestItemList latestItemList={itemList} heading={params?.category} />}
    </View>
  )
}