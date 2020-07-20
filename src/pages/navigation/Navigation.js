import React, {Component} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/stack';
import DashboardPokemon from '../dashboard/DashboardPokemon'
import { View, Image, Dimensions, Text, ImageBackground, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import MovesPage from '../movespage/MovesPage';
import PokemonDetail from '../dashboard/PokemonDetail';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ItemsPage from '../items/ItemsPage';
import MovesDetail from '../movespage/MovesDetail';
import ItemsDetail from '../items/ItemsDetail';

const StackNavigation = createStackNavigator()
const MovesNavigationStack = createStackNavigator()
const ItemsNavigationStack = createStackNavigator()
const BottomTab = createBottomTabNavigator()
const vh = Dimensions.get('window').height
const wh = Dimensions.get('window').width

const PokemonListPageStack = ({navigation, route}) => {
    // if(route.state && route.state.index > 0){
	// 	navigation.setOptions({tabBarVisible: false})
	// } else {
	// 	navigation.setOptions({tabBarVisible: true})
	// }
    return(
        <StackNavigation.Navigator 
            screenOptions={{
                headerBackground: () => route.state && route.state.index > 0 ? null : <CustomHeaderBg/>, 
                headerTitleAlign: 'center', 
                headerTintColor: route.state && route.state.index > 0 ? 'white' : 'black',
                headerTransparent: route.state && route.state.index > 0 ? true : false,
                headerBackTitle: ' ',
                headerBackImage: () => (
                    <View style={{marginLeft: Platform.OS === 'ios' ? 10 : 0}}>
                        <IonIcon name="chevron-down-outline" color="#FFFFFF" size={25} />
                    </View>
                ),
            }}>
            
            <StackNavigation.Screen name="Dashboard" component={DashboardPokemon} options={{title: "Pokemon"}}/>
            <StackNavigation.Screen name="PokemonDetail" component={PokemonDetail} options={({route})=>({title: route.params.title, cardStyleInterpolator: Platform.OS === 'ios' ? CardStyleInterpolators.forVerticalIOS : CardStyleInterpolators.forRevealFromBottomAndroid})}/>
        </StackNavigation.Navigator>
    )
}

const MovesPageStack = ({navigation, route}) => {
    return(
        <MovesNavigationStack.Navigator
            screenOptions={{
                headerBackground: () => route.state && route.state.index > 0 ? null : <CustomHeaderBg/>, 
                headerTitleAlign: 'center', 
                headerTintColor: route.state && route.state.index > 0 ? 'white' : 'black',
                headerTransparent: route.state && route.state.index > 0 ? true : false,
                headerBackTitle: ' ',
                headerBackImage: () => (
                    <View style={{marginLeft: Platform.OS === 'ios' ? 10 : 0}}>
                        <IonIcon name="chevron-down-outline" color="#FFFFFF" size={25} />
                    </View>
                ),
            }}>
            <StackNavigation.Screen name="MovesPage" component={MovesPage} options={{title: "Moves"}}/>
            <StackNavigation.Screen name="MovesDetail" component={MovesDetail} options={({route})=>({title: route.params.title, cardStyleInterpolator: Platform.OS === 'ios' ? CardStyleInterpolators.forVerticalIOS : CardStyleInterpolators.forRevealFromBottomAndroid})}/>
        </MovesNavigationStack.Navigator>
    )
}

const ItemsPageStack = ({navigation, route}) => {
    return(
        <ItemsNavigationStack.Navigator 
            screenOptions={{
                headerBackground: () => route.state && route.state.index > 0 ? null : <CustomHeaderBg/>, 
                headerTitleAlign: 'center', 
                headerTransparent: route.state && route.state.index > 0 ? true : false,
                headerTintColor: route.state && route.state.index > 0 ? 'white' : 'black',
                headerBackTitle: ' ',
                headerBackImage: () => (
                    <View style={{marginLeft: Platform.OS === 'ios' ? 10 : 0}}>
                        <IonIcon name="chevron-down-outline" color="#FFFFFF" size={25} />
                    </View>
                ),
            }}>
            <StackNavigation.Screen name="ItemsPage" component={ItemsPage} options={{title: "Items"}}/>
            <StackNavigation.Screen name="ItemsDetail" component={ItemsDetail} options={({route})=>({title: route.params.title, cardStyleInterpolator: Platform.OS === 'ios' ? CardStyleInterpolators.forVerticalIOS : CardStyleInterpolators.forRevealFromBottomAndroid})}/>
        </ItemsNavigationStack.Navigator>
    )
}

const DashboardBottomTab = () => {
    return(
        <BottomTab.Navigator
            tabBar={props => <CustomBottomTab {...props}/>}
        	tabBarOptions={{
				activeTintColor: '#000000',
				tabStyle: {
					paddingVertical: 5,
				},
                keyboardHidesTabBar: true
			}}
            sceneAnimationEnabled={true}>
            <BottomTab.Screen
                name='DashboardPokemon'
                component={PokemonListPageStack}
                options={({route})=> ({
                    tabBarVisible: route.state && route.state.routes[route.state.index].name === 'PokemonDetail' ? false : true,
                    tabBarLabel: 'Pokemon',
                    tabBarIcon: ({focused}) => 
                        focused === true ?
                        <Image source={require('../../assets/icons/ic-pokemon-active.png')} style={{height: 25, width: 25}}/> :
                        <Image source={require('../../assets/icons/ic-pokemon-inactive.png')} style={{height: 25, width: 25}}/>
                })}
            />
            <BottomTab.Screen
                name='Moves'
                component={MovesPageStack}
                options={()=> ({
                    tabBarLabel: 'Moves',
                    tabBarIcon: ({focused}) => 
                        focused === true ?
                        <Image source={require('../../assets/icons/ic-moves-active.png')} style={{height: 25, width: 25}}/> :
                        <Image source={require('../../assets/icons/ic-moves-inactive.png')} style={{height: 25, width: 25}}/>
                })}
            />
            <BottomTab.Screen
                name='Items'
                component={ItemsPageStack}
                options={()=> ({
                    tabBarLabel: 'Items',
                    tabBarIcon: ({focused}) => 
                        focused === true ?
                        <Image source={require('../../assets/icons/ic-moves-active.png')} style={{height: 25, width: 25}}/> :
                        <Image source={require('../../assets/icons/ic-moves-inactive.png')} style={{height: 25, width: 25}}/>
                })}
            />
        </BottomTab.Navigator>
    )
}

export default class Navigation extends Component {
    render() {
        return (
            <NavigationContainer>
                <DashboardBottomTab/>
            </NavigationContainer>
        )
    }
}

const CustomHeaderBg = props => {
    return(
        <ImageBackground style={{flex: 1, justifyContent:'flex-end'}} resizeMode="cover" source={require('../../assets/images/header-bg.png')}>
            <View style={{flex: 1, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: '#FFFFFF', opacity: 0.65}}>

            </View>
        </ImageBackground>
    )
}

const CustomBottomTab = ({ state, descriptors, navigation}) => {
    // {console.log("DESCRIPTOR di awal ", descriptors)}
    // {console.log("STATE CUSTOM ", state.routes)}
    if(state.routes[0].state && state.routes[0].state.index > 0){
        return(
            null
        )
	} else {
        return(
            <View style={{width:'100%', height:Platform.OS === 'android' ? vh*0.09 : vh*0.1, backgroundColor: "#58d1ff", alignItems:'stretch'}}>
                <ImageBackground style={{flex: 1, marginHorizontal:-10, paddingHorizontal: 20, flexDirection: 'row'}} resizeMode="cover" source={require('../../assets/images/bottom-bar-bg.png')}>
                    <View style={{flex: 1, position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, marginHorizontal:-10, marginTop: 3, backgroundColor: '#FFFFFF', opacity: 0.65}}></View>
                        {state.routes.map((route, index) => {
                            const { options } = descriptors[route.key];
                            const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                ? options.title
                                : route.name;
    
                            const isFocused = state.index === index;
    
                            const onPress = () => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                            });
    
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                            };
    
                            const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                            };
    
                            return (
                            <TouchableOpacity
                                // accessibilityRole="button"
                                // accessibilityStates={isFocused ? ['selected'] : []}
                                // accessibilityLabel={options.tabBarAccessibilityLabel}
                                // testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                style={{ flex: 1, alignItems: 'center', paddingTop: 10}}>
                                {label === 'Pokemon' ? 
                                    isFocused ? 
                                    <Image source={require('../../assets/icons/ic-pokemon-active.png')} style={{height: 25, width: 25}}/>
                                    : <Image source={require('../../assets/icons/ic-pokemon-inactive.png')} style={{height: 25, width: 25}}/> : 
                                    label === 'Items' ?
                                        isFocused ?
                                        <Image source={require('../../assets/icons/ic-item-active.png')} style={{height: 25, width: 25}}/>
                                        : <Image source={require('../../assets/icons/ic-item-inactive.png')} style={{height: 25, width: 25}}/> :
                                        isFocused ?
                                        <Image source={require('../../assets/icons/ic-moves-active.png')} style={{height: 25, width: 25}}/>
                                        : <Image source={require('../../assets/icons/ic-moves-inactive.png')} style={{height: 25, width: 25}}/>
                                }
                                <Text style={{ color: isFocused ? '#673ab7' : '#222' , paddingTop: 5}}>
                                {label}
                                </Text>
                            </TouchableOpacity>
                            );
                        })}
                </ImageBackground>
            </View>
        )
	}
}

const styles = StyleSheet.create({
    backStyle: {
        marginLeft: 15
    }
})