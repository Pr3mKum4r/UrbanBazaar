import Header from '@/components/HomeScreen/Header';
import Slider from '@/components/HomeScreen/Slider';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import { app } from '@/firebaseConfig'
import { useEffect, useState } from 'react';
import Categories from '@/components/HomeScreen/Categories';
import LatestItemList from '@/components/HomeScreen/LatestItemList';

interface slider {
  image: string;
}

interface Category {
  icon: string;
  name: string;
}

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

  const [sliderList, setSliderList] = useState<slider[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [latestItemList, setLatestItemList] = useState<ItemList[]>([]);

  useEffect(() => {
    getSliderImgs();
    getCategoryList();
    getLatestItemList();
  }, []);

  const getSliderImgs = async () => {
    try {

      const querySnapshot = await getDocs(collection(db, 'Sliders'));

      const sliders: slider[] = [];

      querySnapshot.forEach((doc) => {
        console.log("Docs: ", doc.data());
        sliders.push(doc.data() as slider);
      });

      setSliderList(sliders);
    } catch (err) {
      console.log(err);
    }
  }

  const getCategoryList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Category'));

      const categories: Category[] = [];

      querySnapshot.forEach((doc) => {
        console.log("Docs: ", doc.data());
        categories.push(doc.data() as Category);
      });

      setCategoryList(categories);
    } catch (err) {
      console.log(err);
    }
  }

  const getLatestItemList = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, 'UserPost'), orderBy("createdAt", "desc")));
      
      const items: ItemList[] = [];

      querySnapshot.forEach((doc) => {
        console.log("Docs: ", doc.data());
        items.push(doc.data() as ItemList);
      });

      setLatestItemList(items);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ScrollView className='p-8 pt-14 bg-white flex-1'>
      <Header />
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList} />
      <LatestItemList latestItemList={latestItemList}/>
      <View className='h-20'></View> 
    </ScrollView>
  );
}
