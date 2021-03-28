import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { Text } from '../Themed';
import PropTypes, { InferProps } from 'prop-types';


export default function VideosSuggestions({ selected, setSuggestion }: InferProps<typeof VideosSuggestions.propTypes>) {
    const suggestions = ["Videogames", "Science", "Sports", "Music", "Food", "Programming"];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView horizontal={true} style={styles.scrollView} showsHorizontalScrollIndicator={false}>
                {suggestions.map((topic) => (
                    <TouchableOpacity
                        key={topic}
                        style={topic === selected ? styles.suggestionSelected : styles.suggestion}
                        onPress={() => setSuggestion(topic)}>
                        <Text style={topic === selected ? styles.textSelected : {}}>{topic}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

VideosSuggestions.propTypes = {
    selected: PropTypes.string.isRequired,
    setSuggestion: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginVertical: 5
    },
    suggestionSelected: {
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#606060',
        paddingHorizontal: 10,
        marginHorizontal: 5,
        borderColor: '#4F4F4F',
        borderWidth: 1
    },
    suggestion: {
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 10,
        marginHorizontal: 5,
        borderColor: '#E1E1E1',
        borderWidth: 1
    },
    textSelected: {
        color: 'white',
    }
});
