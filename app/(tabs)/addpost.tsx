import { View, TextInput, StyleSheet, Image, Text, Pressable, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { getFirestore, getDocs, collection, addDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../firebaseConfig";
import { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';
import moment from 'moment';

interface Category {
  icon: string;
  name: string;
}

type FormData = {
  title: string
  desc: string
  price: string
  category: string
  address: string
  image: string
  userName: string
  userEmail: string
  userImage: string
  createdAt: String
}

export default function Tab() {
  const { user } = useUser();

  const db = getFirestore(app);

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    setValue,
    resetField,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const storage = getStorage();

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await fetch(image);
      const blob = await response.blob();
      const storageRef = ref(storage, 'community-post/' + Date.now() + ".jpg");

      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).then((resp) => {
        getDownloadURL(storageRef).then(async (downloadUrl) => {
          console.log(downloadUrl);
          data.image = downloadUrl;
          data.userName = user?.fullName || '';
          data.userEmail = user?.primaryEmailAddress?.emailAddress || '';
          data.userImage = user?.imageUrl || '';
          data.createdAt = moment().format('Do MMMM YYYY, h:mm:ss a');
          console.log(data);
          const docRef = await addDoc(collection(db, "UserPost"), data);
          if(docRef) {
            setIsLoading(false);
            Alert.alert('Post Added Successfully!');
            resetField('title');
            resetField('desc');
            resetField('price');
            resetField('address');
            resetField('category');
            setImage('');
          }
        })
      });
    } catch (err) {
      Alert.alert('Failed to add Post!')
      console.log(err);
    }
  }

  useEffect(() => {
    try {
      console.log("inside:");
      const getList = async () => {
        await getCategoryList();
      }
      getList();
    } catch (err) {
      console.log(err);
    }
  }, []);

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

  const [image, setImage] = useState<string>('');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView>
    <ScrollView className='p-10 bg-white'>
      <Text className='font-bold text-3xl mt-5'>Add New Post</Text>
      <Text className='text-md text-gray-500 mb-5'>Create a new post and start selling!</Text>
      <View>
        <Pressable onPress={pickImage}>
          {image ?
            <Image className='rounded-xl w-[200px] h-[200px] object-cover mx-16 mb-5' source={{ uri: image }} /> :
            <Image className='rounded-xl w-[200px] h-[200px] object-cover mx-16 mb-5' source={require('../../assets/images/uploadimg.jpeg')} />}
        </Pressable>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className='p-4 border rounded-lg mb-3'
            />
          )}
          name="title"
        />
        {errors.title && <Text className='text-red-500 mb-2 mt-[-10px]'>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Description"
              numberOfLines={5}
              multiline={true}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className='p-4 border rounded-lg mb-3'
            />
          )}
          name="desc"
        />
        {errors.desc && <Text className='text-red-500 mb-2 mt-[-10px]'>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Price"
              keyboardType='numeric'
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className='p-4 border rounded-lg mb-3'
            />
          )}
          name="price"
        />
        {errors.price && <Text className='text-red-500 mb-2 mt-[-10px]'>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className='p-4 border rounded-lg mb-3'
            />
          )}
          name="address"
        />
        {errors.address && <Text className='text-red-500 mb-2 mt-[-10px]'>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className='border rounded-lg mb-3'>
              <Picker
                selectedValue={value}
                onValueChange={onChange}>
                {categoryList && categoryList.map((item, index) => (
                  <Picker.Item key={index} label={item.name} value={item.name} />
                ))}
              </Picker>
            </View>
          )}
          name="category"
        />

        <View className='flex w-full justify-center'>
          <Pressable className='p-4 flex px-2 rounded-full' style={{backgroundColor: isLoading? '#ccc':'#0ea5e9'}} onPress={handleSubmit(onSubmit)} disabled={isLoading}>
            {isLoading?
            <ActivityIndicator color='white' />
            :
            <Text className='text-white text-xl font-bold text-center'>Submit</Text>}
          </Pressable>
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
