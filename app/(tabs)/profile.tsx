import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from 'expo-router';
import { View, Text, Image, FlatList, Pressable } from 'react-native';

export default function Tab() {
  const { user } = useUser();
  console.log(user);

  const menuList = [
    {
      id: 1,
      name: 'My Products',
      icon: 'https://firebasestorage.googleapis.com/v0/b/urbanbazaar-65c7f.appspot.com/o/Icons%2Fnew-product.png?alt=media&token=8d2204e9-6195-4c0e-8072-005db297eb4b',
      path: 'MyProducts'
    },
    {
      id: 2,
      name: 'Explore',
      icon: 'https://firebasestorage.googleapis.com/v0/b/urbanbazaar-65c7f.appspot.com/o/Icons%2Fsearch.png?alt=media&token=725d992e-1dbf-4995-ba30-adc2f790fc36',
      path: 'explore'
    },
    {
      id: 3,
      name: 'Logout',
      icon: 'https://firebasestorage.googleapis.com/v0/b/urbanbazaar-65c7f.appspot.com/o/Icons%2Flogout.png?alt=media&token=3457f341-d99f-4154-81ec-b3df4c72c958',
      path: ''
    }
  ]

  type Nav = {
    navigate: (value: string, object: object) => void;
  }
  
  const { navigate } = useNavigation<Nav>();

  return (
    <View className='px-5 pb-5 bg-white flex-1'>
      <View className='items-center mt-20'>
        <Image source={{ uri: user?.imageUrl }} style={{ width: 100, height: 100, borderRadius: 100 }} />
        <Text className='font-bold text-3xl mt-5'>{user?.fullName}</Text>
        <Text className='text-gray-500 text-lg mt-2'>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>
      <FlatList
        data={menuList}
        numColumns={3}
        style={{marginTop: 20}}
        renderItem={({ item, index }) => (
          <Pressable onPress={()=>navigate(item?.path, {})} style={{borderColor:'#34a2eb'}} className='flex-1 mr-2 ml-2 py-5 px-2 border-[1px] border-sky-500 items-center m-4 rounded-lg bg-blue-50'>
            {item && <Image source={{uri: item?.icon}} style={{ width: 50, height: 50 }}  />}
            {item && <Text>{item?.name}</Text>}
          </Pressable>
        )} />
    </View>
  );
}

