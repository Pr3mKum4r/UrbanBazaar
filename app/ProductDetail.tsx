import { View, Text, Image, ScrollView, Pressable, Linking, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '@/firebaseConfig';
import { useNavigation } from 'expo-router';

export default function ProductDetail() {
  const { params } = useRoute();
  const [product, setProduct] = useState([]);

  const { user } = useUser();

  type Nav = {
    goBack: () => void;
  }
  
  const { goBack } = useNavigation<Nav>();

  const db = getFirestore(app);

  useEffect(() => {
    params && setProduct(params?.product);
  }, [params])

  const sendEmail = () => {
    const subject = 'Regarding your product ' + product?.title + ' on UrbanBazaar';
    const body = 'Hi ' + product?.userName + ', I am interested in your product ' + product?.title + '. Can you please provide more details?';
    Linking.openURL(`mailto:${product?.userEmail}?subject=${subject}&body=${body}`);
  }

  const deleteUserPost = async() =>{
    Alert.alert('Do you want to Delete?', 'Are you sure you want to delete the post?', [
      {
        text: 'Yes',
        onPress: async() => {
          await deleteFromFirestore();
        }
      },
      {
        text: 'Cancel',
        onPress: ()=> console.log('Cancel Pressed'),
        style: 'cancel',
      }
    ])
  }

  const deleteFromFirestore = async() =>{
    const q = query(collection(db, 'UserPost'), where('title', '==', product?.title));
    const snapshot = await getDocs(q);
    snapshot.forEach(doc => {
      deleteDoc(doc.ref).then(resp=>{
        console.log("Deleted the Doc...");
        goBack();
      })
    });
  }

  return (
    <ScrollView>
      <Image source={{ uri: product?.image }} className="h-[320px] w-full" />
      <View className='p-3'>
        <Text className='text-[24px] font-bold'>{product?.title}</Text>
        <Text className='text-blue-500 bg-blue-200 p-1 rounded-full px-2 text-[12px] self-start mt-1'>{product?.category}</Text>
        <Text className='mt-3 font-bold text-[20px]'>Description</Text>
        <Text className='text-[17px] text-gray-500'>{product?.desc}</Text>
      </View>

      <View className='p-3 mt-2 flex flex-row items-center gap-3 bg-blue-100 border-gray-400'>
        <Image source={{ uri: product?.userImage }} className="h-12 w-12 rounded-full" />
        <View className=''>
          <Text className='font-bold text-[18px]'>{product?.userName}</Text>
          <Text className='text-gray-500'>{product?.userEmail}</Text>
        </View>
      </View>
      {user?.primaryEmailAddress?.emailAddress == product?.userEmail ?
        <Pressable onPress={() => deleteUserPost()} className='z-40 p-3 m-2 rounded-full py-4' style={{backgroundColor:'red'}}>
          <Text className='text-lg text-center text-white'>Delete Post</Text>
        </Pressable> :
        <Pressable onPress={() => sendEmail()} className='z-40 bg-sky-500 p-3 m-2 rounded-full py-4'>
          <Text className='text-lg text-center text-white'>Send Message</Text>
        </Pressable>
      }

    </ScrollView>
  )
}