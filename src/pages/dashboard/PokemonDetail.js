import React, {Component} from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Platform,
    Image,
    FlatList,
    ActivityIndicator
  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getPokemonImage, uppercaseLetter, pokemonTag, removeLineBreaks, pokemonImageTypes, getPokemonBaseTypeColor } from '../../utils/Utils';
import { values } from 'pokedex-promise-v2/src/default';
import { PokeAPI } from '../../api/PokeAPI';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import PokemonListStats from '../../components/PokemonListStats';
import PokemonEvolution from '../../components/PokemonEvolution';
import PokemonDetailMoves from '../../components/PokemonDetailMoves';
import PokemonMultipliers from '../../components/PokemonMultipliers';
import PokemonAbilities from '../../components/PokemonAbilities';
import PokemonEncounters from '../../components/PokemonEncounters';
import PokemonCapture from '../../components/PokemonCapture';
import PokemonSprites from '../../components/PokemonSprites';

export default class PokemonDetail extends Component{

    state = {
        speciesData: null,
        isFetching: false,
        tabNavigationState : {
            index: 0,
            routes: [
              { key: 'stats', title: 'STATS' },
              { key: 'evolutions', title: 'EVOLUTIONS' },
              { key: 'moves', title: 'MOVES'}
            ],
        },
        currentPokemonTypes : '',
        pokemonEvolutionChains: null,
        pokemonMoves: [],
        pokemonTypeMultiplierData: null,
        pokemonAbility: [],
        pokemonEncounterData: []
    }

    UNSAFE_componentWillMount(){
        this.getPokemonSpecies()
    }

    componentDidMount(){
        // this.props.navigation.setOptions({
		// 	headerRight: () => (
		// 		<TouchableOpacity style={{marginHorizontal: 10}}>
		// 			<MaterialCommunityIcons name="logout" color={'white'} size={25} />
		// 		</TouchableOpacity>
		// 	)
        // })
        this.renderBackgroundTypes()
    }

    getPokemonSpecies(){
        this.setState({
            isFetching: true,
            currentPokemonTypes : this.props.route.params.pokemonData.types[0].type.name
        })
        PokeAPI.getPokemonSpeciesByName(this.props.route.params.pokemonData.id)
        .then((response)=> {
            this.setState({
                speciesData: response,
            })
            PokeAPI.resource(response.evolution_chain.url)
            .then((response)=> {
                console.log("EVOLUTION CHAIN ", response)
                this.sortPokemonMoves()
                this.getTypeMultiplier()
                this.getAbility()
                this.getPokemonEncounter()
                this.setState({
                    pokemonEvolutionChains: response,
                    isFetching: false
                })
            })
            .catch((error)=>  {
                console.log('There was an ERROR: ', error);
                this.setState({
                    isFetching: false
                })
            });
        })
        .catch((error)=>  {
            console.log('There was an ERROR: ', error);
            this.setState({
                isFetching: false
            })
        });
    }

    sortPokemonMoves(){
        let pokemonMoves = this.props.route.params.pokemonData.moves.filter((data)=>{
            return data.version_group_details[data.version_group_details.length-1].move_learn_method.name === "level-up"
        })

        this.setState({
            pokemonMoves: pokemonMoves
        })

        pokemonMoves.map((data, index)=>{
            PokeAPI.getMoveByName(data.move.name)
            .then((response)=> {
                this.state.pokemonMoves[index].move_type = response
                this.setState({
                    isFetching: false
                })
            })
            .catch((error)=>  {
                console.log('There was an ERROR: ', error);
                this.setState({
                    isFetching: false
                })
            });
        })
    }

    getTypeMultiplier(){
        PokeAPI.resource('https://pokeapi.co/api/v2/type/'+this.props.route.params.pokemonData.types[0].type.name+'/')
        .then((response)=> {
            this.setState({
                pokemonTypeMultiplierData: response
            })
        })
        .catch((error)=>  {
            console.log('There was an ERROR: ', error);
        });
    }

    getAbility(){
        let dataAbility = this.props.route.params.pokemonData.abilities;
        dataAbility.map((res, index)=>{
            PokeAPI.resource(res.ability.url)
                .then((response)=> {
                    let description_ability;
                    if(response.effect_entries.length > 0){
                        description_ability = response.effect_entries.filter((desc)=>{
                            return desc.language.name === "en"
                        })
                    }
                    dataAbility[index].ability_detail = response
                    dataAbility[index].description_ability = description_ability
                    this.state.pokemonAbility.push(dataAbility[index])
                })
                .catch((error)=>  {
                    console.log('There was an ERROR: ', error);
                });
        })
    }

    getPokemonEncounter(){
        let encounterData = this.props.route.params.pokemonData.location_area_encounters
        PokeAPI.resource(encounterData)
            .then((response)=> {
                console.log("CALLBACK ENCOUNTER ", response)
                if(response.length === 0){
                    this.setState({
                        pokemonEncounterData : null
                    })
                } else {
                    this.setState({
                        pokemonEncounterData : response
                    })
                }
            })
            .catch((error)=>  {
                console.log('There was an ERROR: ', error);
            });
    }

    render(){
        return (
            <>
            {this.renderBackgroundTypes()}
            <View style={styles.screenContainer}>
                <ScrollView>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <View style={styles.viewSpaceTop}></View>
                        <View style={styles.containerPokemonDetail}>
                            <Image style={styles.pokemonImageDetail} source={{uri: getPokemonImage(this.props.route.params.pokemonData.id)}}/>
                            <View style={styles.containerName}>
                                <Text style={styles.pokemonNameTextStyle}>{uppercaseLetter(this.props.route.params.pokemonData.name)}</Text>
                            </View>
                            <View style={styles.containerTag}>
                                {this.renderTagTypes(this.props.route.params.pokemonData.types)}
                            </View>
                            <View style={styles.containerDescription}>
                                {this.renderDescription()}
                            </View>
                            <View style={styles.containerTabView}>
                                <TabView
                                    navigationState={this.state.tabNavigationState}
                                    renderScene={this.renderScene}
                                    onIndexChange={this._handleIndexChange}
                                    renderTabBar={this.renderCustomTabBar}
                                    initialLayout={{ width: Dimensions.get('window').width }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            </>
        );
    }

    renderTagTypes(item){
        let imgSource;
        return item.map((res)=>{
            if(res.type.name === 'grass'){
                imgSource = pokemonTag.grass.uri
            } else if(res.type.name === 'fire'){
                imgSource = pokemonTag.fire.uri
            } else if(res.type.name === 'bug'){
                imgSource = pokemonTag.bug.uri
            } else if(res.type.name === 'dark'){
                imgSource = pokemonTag.dark.uri
            } else if(res.type.name === 'dragon'){
                imgSource = pokemonTag.dragon.uri
            } else if(res.type.name === 'electric'){
                imgSource = pokemonTag.electric.uri
            } else if(res.type.name === 'fairy'){
                imgSource = pokemonTag.fairy.uri
            } else if(res.type.name === 'fighting'){
                imgSource = pokemonTag.fighting.uri
            } else if(res.type.name === 'flying'){
                imgSource = pokemonTag.flying.uri
            } else if(res.type.name === 'ghost'){
                imgSource = pokemonTag.ghost.uri
            } else if(res.type.name === 'ground'){
                imgSource = pokemonTag.ground.uri
            } else if(res.type.name === 'ice'){
                imgSource = pokemonTag.ice.uri
            } else if(res.type.name === 'normal'){
                imgSource = pokemonTag.normal.uri
            } else if(res.type.name === 'poison'){
                imgSource = pokemonTag.poison.uri
            } else if(res.type.name === 'psychic'){
                imgSource = pokemonTag.psychic.uri
            } else if(res.type.name === 'rock'){
                imgSource = pokemonTag.rock.uri
            } else if(res.type.name === 'steel'){
                imgSource = pokemonTag.steel.uri
            } else if(res.type.name === 'water'){
                imgSource = pokemonTag.water.uri
            }
            return(
                <Image style={{height: 30, width: 110}} source={imgSource}/>
            )
        })
    }

    renderScene = ({ route }) => {
        switch (route.key) {
          case 'stats':
            return (
                <View style={{flexDirection: 'column', paddingVertical: 15}}>
                    <PokemonListStats 
                        labelFontColor={getPokemonBaseTypeColor(this.props.route.params.pokemonData.types[0].type.name)}
                        dataStats={this.props.route.params.pokemonData.stats}
                    />
                    <PokemonMultipliers
                        pokemonTypeMultiplierData={this.state.pokemonTypeMultiplierData}
                    />
                    <PokemonAbilities
                        pokemonAbilitiesData={this.state.pokemonAbility}
                        pokemonTypesColor={this.props.route.params.pokemonData.types}
                    />
                    <PokemonSprites
                        pokemonSpritesData={this.props.route.params.pokemonData.sprites}
                        pokemonTypesColor={this.props.route.params.pokemonData.types}
                    />
                    <PokemonCapture
                        pokemonSpeciesData={this.state.speciesData}
                        pokemonTypesColor={this.props.route.params.pokemonData.types}
                    />
                    <PokemonEncounters
                        pokemonEncountersData={this.state.pokemonEncounterData}
                        pokemonTypesColor={this.props.route.params.pokemonData.types}
                    />
                </View>
            )
          case 'evolutions':
            return (
                <View style={{flex: 1}}>
                    {!this.state.isFetching ? 
                        <PokemonEvolution 
                            pokemonSpeciesData={this.state.speciesData}
                            pokemonEvolutionData={this.state.pokemonEvolutionChains}
                            pokemonTypesColor={getPokemonBaseTypeColor(this.props.route.params.pokemonData.types[0].type.name)}
                        />
                        :
                        <View style={{height: 40, width: 40, alignSelf: 'center'}}>
                            <ActivityIndicator/>
                        </View>
                    }
                </View>
            )
          case 'moves':
            return (
                <View style={{flex: 1, marginVertical: 20}}>
                    {!this.state.isFetching && this.state.pokemonMoves ?
                        <PokemonDetailMoves
                            pokemonMoves={this.state.pokemonMoves}
                        />
                        :
                        null
                    }
                </View>
            )
          default:
            return null;
        }
    };

    _handleIndexChange = index => {
        this.setState({ 
            tabNavigationState:{
                index: index,
                routes: [
                    { key: 'stats', title: 'STATS' },
                    { key: 'evolutions', title: 'EVOLUTIONS' },
                    { key: 'moves', title: 'MOVES'}
                  ],
            }
        })
    }

    renderCustomTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);

        return (
            <View style={{flexDirection: 'row'}}>
              {props.navigationState.routes.map((route, i) => {
                const color = Animated.color(
                  Animated.round(
                    Animated.interpolate(props.position, {
                      inputRange,
                      outputRange: inputRange.map(inputIndex =>
                        inputIndex === i ? 255 : getPokemonBaseTypeColor(this.props.route.params.pokemonData.types[0].type.name)[0]
                      ),
                    })
                  ),
                  Animated.round(
                    Animated.interpolate(props.position, {
                      inputRange,
                      outputRange: inputRange.map(inputIndex =>
                        inputIndex === i ? 255 : getPokemonBaseTypeColor(this.props.route.params.pokemonData.types[0].type.name)[1]
                      ),
                    })
                  ),
                  Animated.round(
                    Animated.interpolate(props.position, {
                      inputRange,
                      outputRange: inputRange.map(inputIndex =>
                        inputIndex === i ? 255 : getPokemonBaseTypeColor(this.props.route.params.pokemonData.types[0].type.name)[2]
                      ),
                    })
                  ),
                );
                
                const colorView = Animated.color(
                  Animated.round(
                    Animated.interpolate(props.position, {
                      inputRange,
                      outputRange: inputRange.map(inputIndex =>
                        inputIndex === i ? getPokemonBaseTypeColor(this.props.route.params.pokemonData.types[0].type.name)[0] : 255
                      ),
                    })
                  ),
                  Animated.round(
                    Animated.interpolate(props.position, {
                      inputRange,
                      outputRange: inputRange.map(inputIndex =>
                        inputIndex === i ? getPokemonBaseTypeColor(this.props.route.params.pokemonData.types[0].type.name)[1] : 255
                      ),
                    })
                  ),
                  Animated.round(
                    Animated.interpolate(props.position, {
                      inputRange,
                      outputRange: inputRange.map(inputIndex =>
                        inputIndex === i ? getPokemonBaseTypeColor(this.props.route.params.pokemonData.types[0].type.name)[2] : 255
                      ),
                    })
                  ),
                );
      
                return (
                  <TouchableOpacity
                    style={{flex: 1, alignItems: 'center'}}
                    onPress={() => this.setState({ 
                        tabNavigationState:{
                            index: i,
                            routes: [
                                { key: 'stats', title: 'STATS' },
                                { key: 'evolutions', title: 'EVOLUTIONS' },
                                { key: 'moves', title: 'MOVES'}
                            ],
                        }
                    })}>
                    <Animated.View style={{flex: 1, height: 40, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: colorView}}>
                        <Animated.Text style={{ color }}>{route.title}</Animated.Text>
                    </Animated.View>
                  </TouchableOpacity>
                );
              })}
            </View>
        );
    }

    renderBackgroundTypes(){
        let pokemonTypes = this.props.route.params.pokemonData.types
        if(pokemonTypes[0].type.name === 'water'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/water-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'fire'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/fire-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'bug'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/bug-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'dark'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/dark-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'dragon'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/dragon-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'electric'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/electric-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'fairy'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/fairy-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'fighting'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/fighting-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'flying'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/flying-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'ghost'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/ghost-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'ground'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/ground-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'ice'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/ice-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'normal'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/normal-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'poison'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/poison-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'psychic'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/psychic-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'rock'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/rock-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'steel'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/steel-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        } else if(pokemonTypes[0].type.name === 'grass'){
            return (
                <ImageBackground style={styles.backgroundTypes} source={require('../../assets/images/grass-type-bg.png')} resizeMode={'cover'}>
                </ImageBackground>
            )
        }
    }

    renderTag(item){
        let imgSource;
            if(item.type.name === 'grass'){
                imgSource = pokemonTag.grass.uri
            } else if(item.type.name === 'fire'){
                imgSource = pokemonTag.fire.uri
            } else if(item.type.name === 'bug'){
                imgSource = pokemonTag.bug.uri
            } else if(item.type.name === 'dark'){
                imgSource = pokemonTag.dark.uri
            } else if(item.type.name === 'dragon'){
                imgSource = pokemonTag.dragon.uri
            } else if(item.type.name === 'electric'){
                imgSource = pokemonTag.electric.uri
            } else if(item.type.name === 'fairy'){
                imgSource = pokemonTag.fairy.uri
            } else if(item.type.name === 'fighting'){
                imgSource = pokemonTag.fighting.uri
            } else if(item.type.name === 'flying'){
                imgSource = pokemonTag.flying.uri
            } else if(item.type.name === 'ghost'){
                imgSource = pokemonTag.ghost.uri
            } else if(item.type.name === 'ground'){
                imgSource = pokemonTag.ground.uri
            } else if(item.type.name === 'ice'){
                imgSource = pokemonTag.ice.uri
            } else if(item.type.name === 'normal'){
                imgSource = pokemonTag.normal.uri
            } else if(item.type.name === 'poison'){
                imgSource = pokemonTag.poison.uri
            } else if(item.type.name === 'psychic'){
                imgSource = pokemonTag.psychic.uri
            } else if(item.type.name === 'rock'){
                imgSource = pokemonTag.rock.uri
            } else if(item.type.name === 'steel'){
                imgSource = pokemonTag.steel.uri
            } else if(item.type.name === 'water'){
                imgSource = pokemonTag.water.uri
            }
            return(
                <Image style={{height: 30, width: 110}} source={imgSource}/>
            )
    }

    renderDescription(){
        let description;
        if(!this.state.isFetching ){
            // console.log("POKEMON SPECIES : ", this.state.speciesData)
            for(let i=this.state.speciesData.flavor_text_entries.length - 1; i>0; i--){
                if(this.state.speciesData.flavor_text_entries[i].language.name === 'en'){
                    description = this.state.speciesData.flavor_text_entries[i].flavor_text
                    break;
                }
            }

            return(
                <Text style={{textAlign: 'center', flex: 1, color: '#4F4F4F'}}>{removeLineBreaks(description)}</Text>
            )
        } else {
            return(
                <View style={{height: 40, width: 40, alignSelf: 'center'}}>
                    <ActivityIndicator/>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    backgroundTypes: {
        flex: 1, 
        position: 'absolute', 
        top: 0, 
        bottom: 0, 
        right: 0, 
        left: 0
    },
    screenContainer: {
        flex: 1, 
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight * 2 : Dimensions.get('screen').height * 0.1
    },
    viewSpaceTop: {
        flex: 0.2, 
        height: Dimensions.get('screen').height * 0.2,
        width: '100%', 
    },
    containerPokemonDetail: {
        flex: 0.8, 
        width: '100%', 
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center', 
        borderRadius: 40,
        backgroundColor: 'white',
        marginBottom: 25
    },
    pokemonImageDetail: {
        height: Dimensions.get('screen').height *  0.23, 
        width: Dimensions.get('screen').height *  0.23, 
        marginTop: Platform.OS === 'android' ? Dimensions.get('screen').height * -0.18 : Dimensions.get('screen').height * -0.18
    },
    pokemonNameTextStyle:{
        fontSize: 32,
        color: '#4F4F4F'
    },
    containerName: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 5
    },
    containerTag:{
        flex: 0.1,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerDescription: {
        flex: 0.15, 
        width: '100%', 
        alignItems: 'center', 
        paddingTop: 5,
        paddingHorizontal: 25,
        marginVertical: 20
    },
    containerTabView: {
        flex: 0.65,
        width: '100%', 
        paddingHorizontal: 15
    }
})