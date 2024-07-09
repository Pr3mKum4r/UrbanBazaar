import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '@/firebaseConfig'
import { useUser } from '@clerk/clerk-expo';
import LatestItemList from '@/components/HomeScreen/LatestItemList';
import { useNavigation } from 'expo-router';

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

export default function MyProducts() {
    const db = getFirestore(app);

    const { user } = useUser();

    const [productList, setProductList] = useState<ItemList[]>([]);

    const {addListener, isFocused} = useNavigation();

    useEffect(() => {
        user && getUserPost();
    }, []);

    useEffect(()=>{
        addListener('focus',()=>{
            user && getUserPost();
        })
    },[isFocused]);

    const getUserPost = async () => {
        try {
            const q = query(collection(db, 'UserPost'), where('userEmail', '==', user?.primaryEmailAddress?.emailAddress));
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
        <ScrollView className='p-5 pt-14 bg-white flex-1'>
            <Text className='text-[30px] font-bold pt-5'>My Products</Text>
            <LatestItemList latestItemList={productList} heading={''} />
            <View className='h-20'></View>
        </ScrollView>
    )
}