import LatestItemList from '@/components/HomeScreen/LatestItemList';
import { app } from '@/firebaseConfig';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

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

export default function Tab() {

  const db = getFirestore(app);

  useEffect(() => {
    getAllProducts();
  }, []);

  const [productList, setProductList] = useState<ItemList[]>([]);

  const getAllProducts = async () => {
    try {
      const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);

      const items: ItemList[] = [];

      snapshot.forEach((doc) => {
        console.log(doc.data());
        items.push(doc.data() as ItemList);
      });
      setProductList(items);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
    <ScrollView className='p-5 pt-14 bg-white flex-1'>
      <Text className='text-[30px] font-bold pt-5'>Explore More</Text>
      <LatestItemList latestItemList={productList} heading={''}/>
      <View className='h-20'></View>
    </ScrollView>
    </>
  );
}
