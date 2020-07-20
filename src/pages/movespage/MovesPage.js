import React, {Component} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    ImageBackground,
    ActivityIndicator,
  } from 'react-native';
import Animated from 'react-native-reanimated';
import { SearchBar } from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PokemonMovesList from '../../components/PokemonMovesList';
import { PokeAPI } from '../../api/PokeAPI';
import { uppercaseLetter } from '../../utils/Utils';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export default class MovesPage extends Component{
    state = {
      // data : [],
      dataMoves: [],
      animatedValue: new Animated.Value(0),
      animatedViewUpper : new Animated.Value(0),
      searchValue: '',
      isFetching: false,
      interval : {
        limit: 50,
        offset: 1
      },
      // additionalLimit: 0,
      // searchPokemonData: null,
      // searchTimeout: 0
    }

    componentDidMount(){

    }
    
    UNSAFE_componentWillMount(){
      this.setState({
        isFetching: true
      })
      let moveLists;
      PokeAPI.getMovesList(this.state.interval)
        .then((response)=> {
          moveLists = response.results
          moveLists.map((result)=>{
            PokeAPI.resource(result.url)
            .then((dataMoves)=> {
              this.state.dataMoves.push(dataMoves)
              if(this.state.dataMoves.length === this.state.interval.limit + 1){
                this.setState({
                  isFetching: false
                })
              } else {
                this.setState({
                  isFetching: true
                })
              }
              console.log('THIS STATE NYA ', this.state.dataMoves);
            })
            .catch((error)=>  {
              console.log('There was an ERROR: ', error);
              this.setState({
                isFetching: false
              })
            });
          })
          // this.setState({
          //   dataMoves: response.results,
          //   isFetching: false
          // })
          console.log('THIS STATE NYA ', this.state.dataMoves);
        })
        .catch((error)=>  {
          console.log('There was an ERROR: ', error);
          this.setState({
            isFetching: false
          })
        });
    }

    render(){
        return (
          <SafeAreaView style={styles.pageContainer}>
            <Animated.View style={[styles.headerWrapper,
                {transform: [{
                  translateY: this.state.animatedValue.interpolate({
                      inputRange: [0, 120],
                      outputRange: [0, -57],
                      extrapolate: 'clamp',
                    })
                  }]
                }]}>
              <ImageBackground style={styles.headerImageBackground} source={require('../../assets/images/header-bg.png')} resizeMode='cover'>
                <View style={styles.whiteOverlayHeader}></View>
                <View style={styles.searchBarContainer}>
                  <SearchBar
                    containerStyle={styles.searchBarStyle}
                    inputContainerStyle={styles.inputSearchBarStyle}
                    placeholderTextColor={'gray'}
                    placeholder="Search Pokémon Moves.."
                    onChangeText={(value)=> this.updateSearch(value)}
                    onClear={()=>this.setState({searchValue: ''})}
                    value={this.state.searchValue}
                    lightTheme={true}
                    searchIcon={<MaterialCommunityIcons name="magnify" color="gray" size={25} />}
                    round={true}
                  />
                </View>
              </ImageBackground>
            </Animated.View>

            {!this.state.isFetching ? 
              <Animated.View style={[styles.headerWrapper2,
                {transform: [{
                  translateY: this.state.animatedValue.interpolate({
                      inputRange: [0, 120],
                      outputRange: [0, -57],
                      extrapolate: 'clamp',
                    })
                  }]
                }]}>
                
                {this.state.searchValue !== "" ?
                  this.renderSearchView()
                  :
                  <AnimatedFlatList
                    data={this.state.dataMoves}
                    scrollEventThrottle={1}
                    onScroll={
                      Animated.event(
                          [
                            {
                              nativeEvent: { contentOffset: { y: this.state.animatedValue } },
                            },
                          ], 
                        // {listener: (event) => console.log("EVENT SCROLL ", this.state.animatedValue)},
                        { useNativeDriver: true }
                      )
                    }
                    keyExtractor={(item)=> item.name.toString()}
                    // initialNumToRender={20}
                    // maxToRenderPerBatch={20}
                    // removeClippedSubviews={true}
                    // updateCellsBatchingPeriod={100}
                    // onEndReached={()=>this.loadMore()}
                    // onEndReachedThreshold={1}
                    renderItem={({ item }) => 
                      <PokemonMovesList
                        pokemonMovesData = {item}
                        onMovePressed = {()=>this.props.navigation.navigate(
                          'MovesDetail', {
                            movesData: item,
                            title: uppercaseLetter(item.name.replace(/-/g, ' '))
                          }
                        )}
                      />
                    }
                  />
                }
              </Animated.View>
              :
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size={60}/>
              </View>
            }

          </SafeAreaView>
        );
      }

      renderSearchView(){

        return (
          <View style={{flex: 1}}>
          </View>
        )
      }

      updateSearch(value){
        this.setState({
          searchValue : value
        })
      }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  headerImageBackground: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center'
  },
  whiteOverlayHeader:{
    flex: 1, 
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    right: 0, 
    left: 0, 
    backgroundColor: '#FFFFFF', 
    opacity: 0.65, 
    marginBottom: 3
  },
  searchBarContainer:{
    width: '100%', 
    height: 50, 
    paddingHorizontal: 20
  },
  searchBarStyle:{
    flex: 1, 
    backgroundColor: 'transparent', 
    borderTopColor: 'transparent', 
    borderBottomColor: 'transparent'
  },
  inputSearchBarStyle: {
    height: 40, 
    backgroundColor: 'rgba(52, 52, 52, 0.2)'
  },
  headerWrapper: {
    height: 60,
    left: 0,
    right: 0,
  },
  headerWrapper2: {
    flexGrow: 1,
  },
})