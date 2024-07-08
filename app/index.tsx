// import { Image, StyleSheet, Platform, View, Text, Button } from 'react-native';
// import '../global.css';
// import { Link } from 'expo-router';
// import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";

// export default function HomeScreen() {
//   const { user } = useUser();
//   return (
//     <View className='text-white'>
//       {/* <SignedIn>
//         <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
//       </SignedIn> */}
//       <SignedOut>
//         <Link href="/sign-in">
//           <Text>Sign In</Text>
//         </Link>
//         <Link href="/sign-up">
//           <Text>Sign Up</Text>
//         </Link>
//       </SignedOut>
//       <Link className="text-white" href={'/login'}>Login</Link>
//     </View>
//   )
// }


import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Link, Redirect, useRouter } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking"
import { Image, StyleSheet, Platform, View, Text, Pressable } from 'react-native';
import '../global.css';
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";

export default function HomeScreen() {

  const useWarmUpBrowser = () => {
    React.useEffect(() => {
      // Warm up the android browser to improve UX
      // https://docs.expo.dev/guides/authentication/#improving-user-experience
      void WebBrowser.warmUpAsync();
      return () => {
        void WebBrowser.coolDownAsync();
      };
    }, []);
  };

  WebBrowser.maybeCompleteAuthSession();

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const { user } = useUser();
  const router = useRouter();

  const onPress = React.useCallback(async () => {
    try {
      if (user) {
        console.log("User is already signed in");
        return router.replace("/home");
      }    
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({ redirectUrl: Linking.createURL("/home", { scheme: "myapp" }) });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.log("OAuth error", err);
    }
  }, []);

  return (
      <View className='pt-20 h-full bg-white'>
        <Image source={require('../assets/images/community.jpg')} className='w-full h-[300px] object-cover' />
        <View className='p-8'>
          <Text className='text-[30px] font-bold text-center'>UrbanBazaar</Text>
          <Text className='text-[18px] text-slate-500 mt-6 text-center'>An online community marketplace to sell or buy anything you need !</Text>
          <Pressable onPress={onPress} className='p-4 bg-blue-500 rounded-full mt-20'>
            <Text className='text-white text-center text-[18px]'>Get Started</Text>
          </Pressable>
        </View>
      </View>
  )
}
