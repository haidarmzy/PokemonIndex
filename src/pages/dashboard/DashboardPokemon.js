import React, {Component} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    Animated,
    ImageBackground,
    Platform,
    ActivityIndicator
  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SearchBar } from 'react-native-elements';
import { PokeAPI } from '../../api/PokeAPI';
import PokemonListItem from '../../components/PokemonListItem';
import SearchPokemonView from '../../components/SearchPokemonView';
import { uppercaseLetter } from '../../utils/Utils';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export default class DashboardPokemon extends Component{

    state = {
      data : [],
      dataPokemon: [],
      animatedValue: new Animated.Value(0),
      animatedViewUpper : new Animated.Value(0),
      searchValue: '',
      isFetching: false,
      isLoadingMore: false,
      interval : {
        limit: 50,
        offset: 1
      },
      additionalLimit: 0,
      searchPokemonData: null,
      searchTimeout: 0
    }

    componentDidMount(){

    }

    componentDidUpdate(prevProps, prevState){
      let newData;
      if(this.state.searchValue !== ""){
        console.log("STATE POKEMON DATA ", this.state.searchPokemonData)
        if(this.state.searchTimeout){
          clearTimeout(this.state.searchTimeout)
        }

        this.state.searchTimeout = setTimeout(()=>{
          PokeAPI.getPokemonByName(this.state.searchValue.toLowerCase())
          .then((response)=> {
            console.log("DAPET RESPONSE ", response)
            newData = response
            if (prevState && prevState.searchPokemonData !== newData) {
              this.setState({searchPokemonData: newData});
            }
          })
          .catch((error)=>  {
            newData = "notfound"
            if (prevState && prevState.searchPokemonData !== newData) {
              this.setState({searchPokemonData: newData});
            }
          });
        },1000)
      }
    }

    UNSAFE_componentWillMount(){
      // if(this.state.data.length > this.state.interval.limit+1){
      //   console.log("Masuk IF")
      //   let reducedata = this.state.data.splice(0, this.state.interval.limit+1)
      //   this.setState({
      //     data : reducedata
      //   })
      // }
      this.setState({
        isFetching: true
      })
      PokeAPI.getPokemonsList(this.state.interval)
      .then((response)=>{
        if(response.results){
          let dataPokemon = response.results

          dataPokemon.map((data, index)=>{
            PokeAPI.getPokemonByName(data.name)
            .then((response)=> {
              dataPokemon.pokemonData =response
              this.state.dataPokemon.push(response)
              if(this.state.dataPokemon.length === this.state.interval.limit + 1){
                this.state.dataPokemon.sort((a,b)=> a.id - b.id)
                this.setState({
                  isFetching: false
                })
              } else {
                this.setState({
                  isFetching: true
                })
              }
            })
            .catch((error)=>  {
              console.log('There was an ERROR: ', error);
            });
          })
          
        }
      })
      .catch((error)=> {
        console.log('There was an ERROR: ', error);
      });
    }

    updateSearch(value){
      this.setState({
        searchValue : value
      })
    }

    loadMore(){
      this.setState({
        isLoadingMore: true
      })
      let offset = this.state.interval.offset + 1
      let limit = this.state.interval.limit
      let total = offset + limit
      this.state.interval.offset = offset + limit
      this.setState({
        interval : {
          limit : limit,
          offset : total
        },
        additionalLimit : limit
      })
      PokeAPI.getPokemonsList(this.state.interval)
      .then((response)=>{
        if(response.results){
          let dataPokemon = response.results

          dataPokemon.map((data, index)=>{
            PokeAPI.getPokemonByName(data.name)
            .then((response)=> {
              dataPokemon.pokemonData =response
              this.state.dataPokemon.push(response)
              this.state.dataPokemon.sort((a,b)=> a.id - b.id)
              this.setState({
                isLoadingMore: false
              })
            })
            .catch((error)=>  {
              console.log('There was an ERROR: ', error);
            });
          })
          
        }
      })
      .catch((error)=> {
        console.log('There was an ERROR: ', error);
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
                      placeholder="Type Pokémon Name or Id..."
                      onChangeText={(value)=> this.updateSearch(value)}
                      onClear={()=>this.setState({searchValue: '', searchPokemonData: null})}
                      value={this.state.searchValue}
                      lightTheme={true}
                      searchIcon={<MaterialCommunityIcons name="magnify" color="gray" size={25} />}
                      round={true}
                    />
                  </View>
                </ImageBackground>
              </Animated.View>
              {this.renderList()}
              {this.state.isLoadingMore ? 
                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, marginBottom: 15}}>
                  <ActivityIndicator/>
                </View>
                :
                null
              }

            </SafeAreaView>
        );
      }

      renderList(){
        if(!this.state.isFetching){
          console.log("DATA POKEMON ", this.state.dataPokemon)
          return(
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
                  data={this.state.dataPokemon}
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
                  keyExtractor={(item, index)=> item.id.toString()}
                  initialNumToRender={20}
                  maxToRenderPerBatch={20}
                  removeClippedSubviews={true}
                  updateCellsBatchingPeriod={100}
                  onEndReached={()=>this.loadMore()}
                  onEndReachedThreshold={1}
                  renderItem={({ item }) => 
                    <PokemonListItem
                      pokemonName={item.name}
                      pokemonId={item.id}
                      pokemonTypes={item.types}
                      pokemonSprites={item.sprites}
                      onPokemonListPressed={()=>this.props.navigation.navigate(
                        'PokemonDetail', {
                          pokemonData: item,
                          title: uppercaseLetter(item.name)
                        })}
                    />
                  }
                />
              }
            </Animated.View>
          )
        } else {
          return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size={60}/>
            </View>
          )
        }
      }

      renderSearchView(){

        return (
          <View style={{flex: 1}}>
            {this.state.searchPokemonData === null || this.state.searchPokemonData === undefined ? 
              <ActivityIndicator style={{marginTop: 25}}/>
              :
              this.state.searchPokemonData === "notfound" ? 
                <View style={{marginTop: 25, alignItems: 'center'}}>
                  <Text>Pokémon Not Found</Text>
                </View>
                :
                <SearchPokemonView
                searchedPokemonData={this.state.searchPokemonData}
                onPressResult={()=>this.props.navigation.navigate(
                  'PokemonDetail', {
                    pokemonData: this.state.searchPokemonData
                  })
                }
                />
            }
          </View>
        )
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