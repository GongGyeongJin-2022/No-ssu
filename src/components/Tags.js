import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useApi} from "@hooks/Hooks";
import {getTag} from "@apis/apiServices";
import {FlatList, Text, View} from "react-native";

const sizesObj = {
    "L": "대형",
    "M": "중형",
    "S": "소형"
}

export const Tags = ({tags, sizes}) => {
    const [tagLoading, tagResolved, tagApi] = useApi(getTag, true);
    const [filterTag, setFilterTag] = useState([]);
    const tagListRef = useRef(null);

    useEffect(() => {
        tagApi()
    },[])

    useEffect(() => {
        if(!tagLoading && filterTag.length===0) {
            tags.forEach((tag) => {
                setFilterTag(prev => [...prev, tagResolved[tag-1].name])
            });

            setFilterTag(prev => [...prev, sizesObj[sizes]]);
        }
        console.log("tags!" ,tagResolved)
    },[tagLoading])

    return (
        <FlatList
            ref={tagListRef}
            data={filterTag}
            style={styles.filter}
            contentContainerStyle={{
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
                width: filterTag.length * 90,
            }}
            renderItem={({item}) =>
                <View key={"tag_"+item} style={styles.tag}>
                    <Text style={styles.tagText}>#{item}</Text>
                </View>
            }
            keyExtractor={(item, index) => 'key' + index}
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        />
    )
}

const styles = StyleSheet.create({
    filter: {
        display: "flex",
        flexDirection: "row",
        marginTop: 10,
        zIndex:10
    },
    tag: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 76,
        height: 24,
        borderWidth: 1,
        borderColor: '#C8C8C8',
        borderRadius: 50,
        marginHorizontal: 3
    },
    tagText: {
        fontSize: 10,
        color: '#252525'
    }
})