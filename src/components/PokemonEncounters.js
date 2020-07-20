import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions, ActivityIndicator } from 'react-native';
import { uppercaseLetter, pokemonImageTypes, getPokemonImage, getPokemonBaseTypeColor } from '../utils/Utils';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { values } from 'pokedex-promise-v2/src/default';
import { variable } from '../utils/Variable';

const PokemonEncounters = (props) => {
    let data = props.pokemonEncountersData
    let typeColor = props.pokemonTypesColor[0].type.name
    let rgbColor = 'rgb('+getPokemonBaseTypeColor(typeColor)[0]+','+getPokemonBaseTypeColor(typeColor)[1]+','+getPokemonBaseTypeColor(typeColor)[2]+')'
    return(
        <View style={styles.containerEncounter}>
            <View style={styles.containerTitle}>
                <Text style={{...styles.titleTextStyle, color: rgbColor}}>Encounter</Text>
            </View>
            <View style={styles.containerColumn}>
                <View style={styles.containerRow}>
                    <View style={styles.containerInnerRow}>
                        <View style={styles.containerTitleHabitat}>
                            <Text style={{color: rgbColor}}>Location</Text>
                        </View>
                    </View>
                    <View style={styles.containerDividerRow}>
                        <View style={styles.dividerStyle}></View>
                    </View>
                    <View style={styles.containerInnerRow}>
                        <View style={styles.containerTitleHabitat}>
                            <Text style={{color: rgbColor}}>Version</Text>
                        </View>
                    </View>
                    <View style={styles.containerDividerRow}>
                        <View style={styles.dividerStyle}></View>
                    </View>
                    <View style={styles.containerInnerRow}>
                        <View style={styles.containerTitleHabitat}>
                            <Text style={{color: rgbColor}}>Encounter Rate</Text>
                        </View>
                    </View>
                </View>
                {renderEncounterData(data, rgbColor)}
            </View>
        </View>
    );
}

const renderEncounterData = (data, rgbColor) => {
    if(data === null){
        return(
            <View style={styles.containerRowContent}>
                <View style={styles.containerInnerRow}>
                    <View style={styles.containerItemsHabitat}>
                        <Text style={{color: variable.textColor}}>No Data</Text>
                    </View>
                </View>
                <View style={styles.containerDividerRow}>
                    <View style={styles.dividerStyle}></View>
                </View>
                <View style={styles.containerInnerRow}>
                    <View style={styles.containerItemsHabitat}>
                        <Text style={{color: variable.textColor}}>No Data</Text>
                    </View>
                </View>
                <View style={styles.containerDividerRow}>
                    <View style={styles.dividerStyle}></View>
                </View>
                <View style={styles.containerInnerRow}>
                    <View style={styles.containerItemsHabitat}>
                        <Text style={{color: variable.textColor}}>No Data</Text>
                    </View>
                </View>
            </View>
        )
    } else {
        return data.map((res)=>{
            // console.log("MAP ENCOUNTER ", res)
            return(
                <View style={styles.containerRowContent}>
                    <View style={styles.containerInnerRow}>
                        <View style={styles.containerItemsHabitat}>
                            <Text style={{color: variable.textColor, textAlign: 'center'}}>{res.location_area.name.replace(/-/g, ' ')}</Text>
                        </View>
                    </View>
                    <View style={styles.containerDividerRow}>
                        <View style={styles.dividerStyle}></View>
                    </View>
                    <View style={styles.containerInnerRow}>
                        {mappingVersion(res.version_details)}
                    </View>
                    <View style={styles.containerDividerRow}>
                        <View style={styles.dividerStyle}></View>
                    </View>
                    <View style={styles.containerInnerRow}>
                        {mappingRate(res.version_details, rgbColor)}
                    </View>
                </View>
            )
        })
    }
}

const mappingVersion = (data) => {
    return data.map((res, index)=>{
        // console.log("MAPPING VERSION ", res)
        return(
            <View style={data.length === index + 1 ? styles.containerItemsHabitatMarBot : styles.containerItemsHabitat}>
                <Text style={{color: variable.textColor}}>{res.version.name.replace(/-/g, ', ')}</Text>
            </View>
        )
    })
}

const mappingRate = (data, rgbColor) => {
    return data.map((res)=>{
        // console.log("MAPPING VERSION ", res)
        return(
            <View style={styles.containerItemsHabitat}>
                <Text style={{color: rgbColor}}>{res.max_chance} %</Text>
            </View>
        )
    })
}


const styles = StyleSheet.create({
    containerEncounter: {
        flex: 1,
        flexDirection: 'column',
        marginVertical: 25,
        paddingHorizontal: 10
    },
    containerTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15
    },
    titleTextStyle: {
        fontSize: 18
    },
    containerRow: {
        flexDirection: 'row',
        height: 60
    },
    containerRowContent: {
        flexDirection: 'row'
    },
    containerColumn: {
        flexDirection: 'column',
        marginTop: 15,
    },
    containerDividerRow: {
        flex: 0.05,
        alignItems: 'center',
    },
    containerInnerRow: {
        flex: 0.3,
        flexDirection: 'column'
    },
    dividerStyle: {
        flex: 1,
        backgroundColor: variable.lightGrey,
        width: 1
    },
    containerTitleHabitat: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    containerItemsHabitat: {
        alignItems: 'center',
        marginVertical: 5,
    },
    containerItemsHabitatMarBot: {
        alignItems: 'center',
        marginVertical: 5,
        marginBottom: 20
    },
})

export default PokemonEncounters;