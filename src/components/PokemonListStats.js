import React from 'react'
import { View, StyleSheet, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import { uppercaseLetter, pokemonImageTypes, getPokemonImage } from '../utils/Utils';
import { values } from 'pokedex-promise-v2/src/default';
import Animated from 'react-native-reanimated';

const PokemonListStats = (props) => {
    let arrColor = props.labelFontColor
    let rgbColor = 'rgb('+arrColor[0]+','+arrColor[1]+','+arrColor[2]+')'
    let data = props.dataStats
    let totalStats, hp, atk, def, satk, sdef, spd;
    let barHp, barAtk, barDef, barSatk, barSdef, barSpd;

    data.map((res) => {
        if(res.stat.name === 'hp'){
            hp = res.base_stat
        } else if(res.stat.name === 'attack'){
            atk = res.base_stat
        } else if(res.stat.name === 'defense'){
            def = res.base_stat
        } else if(res.stat.name === 'special-attack'){
            satk = res.base_stat
        } else if(res.stat.name === 'special-defense'){
            sdef = res.base_stat
        } else if(res.stat.name === 'speed'){
            spd = res.base_stat
        }
    })

    totalStats = hp+atk+def+satk+sdef+spd;
    barHp = hp / 300;
    barAtk = atk / 300;
    barDef = def / 300;
    barSatk = satk / 300;
    barSdef = sdef / 300;
    barSpd = spd / 300;

    return(
        <View style={styles.containerStats}>
            <View style={styles.containerEachStats}>
                <View style={styles.containerLabelStats}>
                    <Text style={{...styles.statsTextStyle, color: rgbColor}}>HP</Text>
                </View>
                <View style={styles.containerValueStats}>
                    <Text style={styles.valueStatsTextStyle}>{hp}</Text>
                </View>
                <View style={styles.containerStatsBar}>
                    <View style={{...styles.pokemonStatsBar, backgroundColor: rgbColor, flex: barHp}}></View>
                </View>
            </View>
            <View style={styles.containerEachStats}>
                <View style={styles.containerLabelStats}>
                    <Text style={{...styles.statsTextStyle, color: rgbColor}}>ATK</Text>
                </View>
                <View style={styles.containerValueStats}>
                    <Text style={styles.valueStatsTextStyle}>{atk}</Text>
                </View>
                <View style={styles.containerStatsBar}>
                    <View style={{...styles.pokemonStatsBar, backgroundColor: rgbColor, flex: barAtk}}></View>
                </View>
            </View>
            <View style={styles.containerEachStats}>
                <View style={styles.containerLabelStats}>
                    <Text style={{...styles.statsTextStyle, color: rgbColor}}>DEF</Text>
                </View>
                <View style={styles.containerValueStats}>
                    <Text style={styles.valueStatsTextStyle}>{def}</Text>
                </View>
                <View style={styles.containerStatsBar}>
                    <View style={{...styles.pokemonStatsBar, backgroundColor: rgbColor, flex: barDef}}></View>
                </View>
            </View>
            <View style={styles.containerEachStats}>
                <View style={styles.containerLabelStats}>
                    <Text style={{...styles.statsTextStyle, color: rgbColor}}>SATK</Text>
                </View>
                <View style={styles.containerValueStats}>
                    <Text style={styles.valueStatsTextStyle}>{satk}</Text>
                </View>
                <View style={styles.containerStatsBar}>
                    <View style={{...styles.pokemonStatsBar, backgroundColor: rgbColor, flex: barSatk}}></View>
                </View>
            </View>
            <View style={styles.containerEachStats}>
                <View style={styles.containerLabelStats}>
                    <Text style={{...styles.statsTextStyle, color: rgbColor}}>SDEF</Text>
                </View>
                <View style={styles.containerValueStats}>
                    <Text style={styles.valueStatsTextStyle}>{sdef}</Text>
                </View>
                <View style={styles.containerStatsBar}>
                    <View style={{...styles.pokemonStatsBar, backgroundColor: rgbColor, flex: barSdef}}></View>
                </View>
            </View>
            <View style={styles.containerEachStats}>
                <View style={styles.containerLabelStats}>
                    <Text style={{...styles.statsTextStyle, color: rgbColor}}>SPD</Text>
                </View>
                <View style={styles.containerValueStats}>
                    <Text style={styles.valueStatsTextStyle}>{spd}</Text>
                </View>
                <View style={styles.containerStatsBar}>
                    <View style={{...styles.pokemonStatsBar, backgroundColor: rgbColor, flex: barSpd}}></View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerStats: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10
    },
    containerEachStats : {
        flex: 0.1666,
        flexDirection: 'row',
        marginVertical: 4
    },
    statsTextStyle: {
        fontWeight: 'bold'
    },
    valueStatsTextStyle: {
        color: '#4F4F4F'
    },
    containerLabelStats: {
        flex: 0.13
    },
    containerValueStats: {
        flex: 0.1
    },
    containerStatsBar: {
        flex: 0.77, 
        height: 10, 
        flexDirection: 'row', 
        alignSelf: 'center', 
        alignItems: 'center', 
        backgroundColor: '#F0F0F0', 
        borderRadius: 5
    },
    pokemonStatsBar:{
        height: 10, 
        borderRadius: 5
    }
})

export default PokemonListStats;