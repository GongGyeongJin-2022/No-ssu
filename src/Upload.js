import React, { useCallback } from 'react';
import { Platform, Pressable, Image, View, Text, TouchableOpacity, StyleSheet, Button, FlatList, TextInput, TouchableHighlight, Label} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Slider} from 'rn-range-slider'
const renderThumb = useCallback(() => <Thumb/>, []);
const renderRail = useCallback(() => <Rail/>, []);
const renderRailSelected = useCallback(() => <RailSelected/>, []);
const renderLabel = useCallback(value => <Label text={value}/>, []);
const renderNotch = useCallback(() => <Notch/>, []);
const handleValueChange = useCallback((low, high) => {
  setLow(low);
  setHigh(high);
}, []);

const ShowPicker = () => {

    //launchImageLibrary : 사용자 앨범 접근
      launchImageLibrary({}, (res)=>{
        alert(res.assets[0].uri)
        const formdata = new FormData()
        formdata.append('file', res.assets[0].uri);
        console.log(res);
      })
  }


const Upload = () => {
    return (
        <View>
            <Pressable style={styles.Button} onPress={ShowPicker}>
                <Text style={styles.Button_txt}>이미지 업로드하기</Text>
            </Pressable>
            <Text>&nbsp;</Text>
                <Text>&nbsp;</Text>
            <View>
            <Text style={styles.title_txt}>        태그</Text>
            <Text>&nbsp;</Text>
            <View style = {{flexDirection:'row', left : 40}}>

            <TouchableHighlight style={styles.tag_btn} onPress={underlayColor="white"} ><Text style={styles.tag_txt}># 플라스틱</Text></TouchableHighlight>
            <TouchableOpacity style={styles.tag_btn}><Text style={styles.tag_txt}># 종이</Text></TouchableOpacity>
            <TouchableOpacity style={styles.tag_btn}><Text style={styles.tag_txt}># 유리</Text></TouchableOpacity>
            </View>
            <Text>&nbsp;</Text>
            <View style={{flexDirection:'row', justifyContent : "space-evenly"}}>
            <TouchableOpacity style={styles.tag_btn}><Text style={styles.tag_txt}># 일반쓰레기</Text></TouchableOpacity>
            <TouchableOpacity style={styles.tag_btn}><Text style={styles.tag_txt}># 캔/알루미늄</Text></TouchableOpacity>
            <TouchableOpacity style={styles.tag_btn}><Text style={styles.tag_txt}># 음식물 쓰레기</Text></TouchableOpacity>
            </View>
            </View>
            <Text>&nbsp;</Text>
            <View>
                <Text style={styles.title_txt}>       사이즈</Text> 
                <Text>&nbsp;</Text>
                <View  style={{flexDirection : 'row', justifyContent : "space-evenly"}}>
                <TouchableOpacity style={styles.tag_btn}><Text style={styles.tag_txt}># 소형</Text></TouchableOpacity>
                <TouchableOpacity style={styles.tag_btn}><Text style={styles.tag_txt}># 중형</Text></TouchableOpacity>
                <TouchableOpacity style={styles.tag_btn}><Text style={styles.tag_txt}># 대형</Text></TouchableOpacity></View>
            </View>
            <View>
                <Text>&nbsp;</Text>
                <Text style={styles.title_txt}>       코멘트</Text>
                <TextInput
                style={styles.textInput}
                placeholder="쓰레기에 대한 설명을 입력해 주세요." />
            </View>
            <View>
                <Text>&nbsp;</Text>
                <Text style={styles.title_txt}>       리워드</Text>
                <Slider
  style={styles.slider}
  min={0}
  max={100}
  step={1}
  floatingLabel
  renderThumb={renderThumb}
  renderRail={renderRail}
  renderRailSelected={renderRailSelected}
  renderLabel={renderLabel}
  renderNotch={renderNotch}
  onValueChanged={handleValueChange}
/>
            </View>
            </View>
    )
};

const styles = StyleSheet.create({
    Button : {
        top : 15,
        alignSelf : 'center', 
        width : 340, 
        height : 300,
        backgroundColor : '#BDBDBD', 
        borderRadius : 10,
        shadowColor : '#000000',
        shadowOpacity : 0.3,
        
    }, 
    background : {
        backgroundColor : "#BDBDBD",
        flex : 1,
        justifyContent : "center",
        alignItems : "center"
    },
    Button_txt : {
        alignSelf : 'center', 
        fontSize : 15,
        color : '#000000', 
        fontWeight : 'Bold', 
        top : 150
    },
    title_txt : {
        alignSelf : 'flex-start', 
        fontSize : 17,
        fontWeight : 'Bold', 
        color : '#000000', 
        top : 3
    },
    tag_btn : {
        borderColor : '#BDBDBD', 
        borderRadius : 15,
        width : 80,
        height : 25, 
        backgroundColor : '#FFFFFF',
        borderWidth : 0.5, 
        top : 5
    }, 

    tag_txt : {
        top : 3,
        alignSelf : 'center',
        fontSize : 10,
        color : '#000000'
    },

    textInput : {
        top : 10,
        width : 320, 
        height : 50,
        alignSelf : 'center',
        borderColor : '#BDBDBD',
        borderWidth : 1,
        borderRadius : 10
    }
    })

export default Upload;
