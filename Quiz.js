import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Modal, Animated, ScrollView, Dimensions, Image, ImageBackground } from 'react-native';
import Estrela2 from '../constants/estrela2';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LinearGradient } from 'expo-linear-gradient';


import data from '../data/QuizData';
import dataMatematica from '../data/QuizData2';
import dataTecnologia from '../data/QuizData3';
import dataGoverno from '../data/QuizData4';
import dataConhecimentos from '../data/QuizData5';
import dataLeiDf from '../data/QuizData6';
import dataInovacao from '../data/QuizData7';
import dataEtnica from '../data/QuizData8';
import dataIngles from '../data/QuizData9';
import dataProbabilidadeeEstatística from '../data/QuizData10';
import Estrela3 from '../constants/estrela3';

import simuladoA1 from '../data/simuladoagente1';
import simuladoA2 from '../data/simuladoagente2';
import simuladoT1 from '../data/simuladotecnico1';
import simuladoT2 from '../data/simuladotecnico2';
import simulado5 from '../data/simulado5';
import simulado6 from '../data/simulado6';
import simulado7 from '../data/simulado7';


import { useNavigation, useScrollToTop } from "@react-navigation/native";

const {width, height } = Dimensions.get('window');


export default function Quiz(props) {

  useEffect(() => {
    const fetchCurrentQuestionIndex = async () => {
      const index = await AsyncStorage.getItem('@currentQuestionIndex');
      setCurrentQuestionIndex(index ? parseInt(index, 10) - 1 : 0);
    };
    fetchCurrentQuestionIndex();
  }, []);
  


  const [savedScore, setSavedScore] = useState(null);

  useEffect(() => {
    const getScore = async () => {
      const score = await AsyncStorage.getItem('@score');
      if (score !== null) {
        setSavedScore(JSON.parse(score));
      }
    };

    getScore();
  }, []);

  const navigation = useNavigation();

  const scrollRef = useRef();


  const allQuestions =  props.route.params.nome == 'Português' ? data :
   props.route.params.nome == 'Matemática' ? dataMatematica : 
   props.route.params.nome == 'Conhecimentos de Informática' ? dataTecnologia :

   props.route.params.nome == 'Vendas e Negociação' ? dataGoverno :

   props.route.params.nome == 'Conhecimentos Bancários' ? dataConhecimentos :
   props.route.params.nome == 'Matemática Financeira' ? dataEtnica :
    props.route.params.nome == 'Atualidades do Mercado Financeiro' ? dataInovacao :
    props.route.params.nome == 'Inglês' ? dataIngles :

    props.route.params.nome == 'tecnologia da informação' ? dataLeiDf :
    props.route.params.nome == 'probabilidade e estatistica' ? dataProbabilidadeeEstatística :

    props.route.params.nome == 'SUPER SIMULADO 1' ? simuladoA1 :

    props.route.params.nome == 'SUPER SIMULADO 2' ? simuladoA2 :

    props.route.params.nome == 'SUPER SIMULADO 3' ? simuladoT1 :

    props.route.params.nome == 'SUPER SIMULADO 4' ? simuladoT2 :
    props.route.params.nome == 'SUPER SIMULADO 5' ? simulado5:

    props.route.params.nome == 'SUPER SIMULADO Tecnologia 1' ? simulado6 :

    props.route.params.nome == 'SUPER SIMULADO Tecnologia 2' ? simulado7 :
    null ;
  

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correntOption, setCorrentOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [visivel, setVisivel] = useState(false);
    const [visivel2, setVisivel2] = useState(false);
    
    const scoreKey = `score${props.route.params.nome}`;
    
    useEffect(() => {
      // Carrega o score do AsyncStorage quando o componente for montado
      AsyncStorage.getItem(scoreKey).then(value => {
        if (value !== null) {
          setScore(parseInt(value));
        }
      });
    }, []);
    
    const validateAnswer = (selectedOptions) => {
      let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
      setCurrentOptionSelected(selectedOptions);
      setCorrentOption(correct_option);
      setIsOptionsDisabled(true);
    
      if(selectedOptions == correct_option){
        setScore(score+1)
      }
      setShowNextButton(true)
    }
    
    const handleNext = () => {
      AsyncStorage.setItem('@currentQuestionIndex', JSON.stringify(currentQuestionIndex + 1));

if(currentQuestionIndex == allQuestions.length - 1){
  setShowScoreModal(true);
}else{
  setCurrentQuestionIndex(currentQuestionIndex + 1);
  setCurrentOptionSelected(null);
  setCorrentOption(null);
  setIsOptionsDisabled(false);
  setShowNextButton(false);
  scrollRef.current.scrollTo({x: 0, y: 0, Animated: true});
}
    
    
      if(currentQuestionIndex== allQuestions.length-1){
        setShowScoreModal(true)
    
        // Salva o score no AsyncStorage usando a chave única
        AsyncStorage.setItem(scoreKey, JSON.stringify(score));
      }
    }
const restartQuiz = () => {
  setShowScoreModal(false);

  setCurrentQuestionIndex(0);
  setScore(0);

  setCurrentOptionSelected(null);
  setCorrentOption(null);
  setIsOptionsDisabled(false);
  setShowNextButton(false);
  Animated.timing(progress, {
    toValue: 0,
    duration:1000,
    useNativeDriver: false,
  }).start();
}

const renderNumeru = () => {
  return<View style={{ width: '90%', flexDirection: 'row', marginBottom: height / 50, }}>
    <Text style={{color: 'rgba(300,300,300,0.8)', fontSize: 25, fontWeight: 'bold', marginBottom: 10,}}> Questão   </Text>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
    <Text style={{color: '#fff', fontSize: 25,  marginBottom: 10, fontWeight: 'bold',}}>{currentQuestionIndex+1}</Text>
    <Text style={{marginHorizontal: 5, fontSize: 20, color: 'rgba(200,200,200,0.6)', fontWeight: 'bold', marginBottom: 5,}}>/</Text>
    <Text style={{color: 'rgba(200,200,200,0.7)', fontSize: 18, fontWeight: 'bold', marginBottom: 5,}}>{allQuestions.length}</Text>
    </View>
    </View>

}
  
  const renderQuestion = () => {
    return<View style={{marginBottom: 10, width: '100%', alignItems: 'center'}}>
    <View style={{paddingVertical: 20, paddingHorizontal: 10, width: '95%', }}>
    <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold', textAlign: 'justify',}}> {allQuestions[currentQuestionIndex]?.question}</Text>
    </View>
  </View>;

  }

  const renderTextu = () => {
    if ( allQuestions[currentQuestionIndex]?.textu ){
    return<View style={{marginBottom: 10, width: '100%', alignItems: 'center'}}>
    <View style={{paddingTop: 5, paddingHorizontal: 10, width: '95%', }}>
    <Text style={{color: '#000', fontSize: 16, fontWeight: 'bold', textAlign: 'justify',}}> {allQuestions[currentQuestionIndex]?.textu}</Text>
    </View>
  </View>;
    }else{
      return null;
    }

  }

  const renderTextu1 = () => {
    return<View style={{marginBottom: allQuestions[currentQuestionIndex]?.subtexto ? 10 : 0, width: '100%', alignItems: 'center'}}>
    {
        allQuestions[currentQuestionIndex]?.subtexto ?
        allQuestions[currentQuestionIndex]?.subtexto.map(subtexto => (
          <View style={{ paddingTop: 10, paddingHorizontal: 10, width: '95%',}}>
            <Text key={subtexto} style={{color: '#000', fontSize: 16, fontWeight: 'bold', textAlign: 'justify',}}>{subtexto}</Text>
            </View>
             
        )) : null}
  </View>;

  }

  const renderOptions = () => {
    return<View>
       {
        allQuestions[currentQuestionIndex]?.options.map(option => (
          <TouchableOpacity
          onPress={() => validateAnswer(option)}
          style={{backgroundColor: option==correntOption ? '#ccffcc' : option==currentOptionSelected ? '#ffc2b3' : '#fff' , width: width * 0.90, padding: 15, flexDirection: 'row', borderRadius: 15, marginBottom: height / 30 , borderColor: option==correntOption ? '#00e600' : option==currentOptionSelected ? '#ff3300' : 'rgba(200,200,200,0.6)',
          borderWidth: 1,}}
          disabled={isOptionsDisabled}
           key={option}>
            <Text style={{textAlign: 'justify', color:'#000' , textShadowColor: option==correntOption ? '#fff' : option==currentOptionSelected ? '#fff' : 'transparent' , textShadowRadius: 1,}}>{option}</Text>
            {
              option==correntOption ? (
                <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#33ff33', alignItems: 'center', justifyContent: 'center', marginLeft: 2, }}>
                 <MaterialCommunityIcons name="check-bold" size={20} color="#fff" />
                </View>
              ): option == currentOptionSelected ? (
                 <View style={{width: 30, height: 30, borderRadius: 15, backgroundColor: '#e62e00', alignItems: 'center', justifyContent: 'center', marginLeft: 2,}}>
                 <MaterialCommunityIcons name="window-close" size={20} color="#fff" />
                </View>
              ):null
            }
          </TouchableOpacity>
        ))
       }
    </View>;
  }

 const renderNextButton = () => {
  if(showNextButton){
    return(
      <View style={{width: '100%', alignItems: 'center', justifyContent: 'center',}}>
      <TouchableOpacity onPress={handleNext} style={{width: '90%', backgroundColor: '#00cc00', alignItems: 'center', justifyContent: 'center', borderRadius: 10, padding: 15, marginBottom: 20, marginTop: 10,}}>
        <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold', textShadowColor: '#000', textShadowRadius: 1,}}>PRÓXIMO</Text>
      </TouchableOpacity>
      </View>
    )
  }else{
    return null
  }
 }

 const [progress, setProgress] = useState(new Animated.Value(0));
const progressAnim = progress.interpolate({
  inputRange: [0, allQuestions.length],
  outputRange: ['0%', '100%']
})

 const renderProgressBar = () => {
   return (
    <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', paddingVertical: height / 50, marginBottom: height / 40,}}>
      <View style={[{position: 'absolute', right: 1, marginRight: width* 0.15, top: 1,}, {transform: [{translateY: -15}]}]}>
        <Estrela2 />
        </View>
    <View style={{width: '90%', height: 18, borderRadius: 20, backgroundColor: 'rgba(300,300,300,0.2)',  overflow: 'hidden',}}>
      <Animated.View style={[{
        overflow: 'hidden',
        height: 18,
        borderRadius: 20,
        },{
          width: progressAnim
      }]}>
         <LinearGradient
        // Background Linear Gradient
        colors={['#BEFF05', '#FFF501']}
        start={{ x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{width: '100%', height: '100%'}}
      />
      </Animated.View>
      </View>
    </View>
   )
 }

 const voltar = () => {
  return(
    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center',}}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{padding: 20,}}>
      <FontAwesome name="arrow-left" size={24} color="#FFF" />
      </TouchableOpacity>
      <Text style={{marginRight: 10, color: 'rgba(300,300,300,0.8)', fontSize: 15, fontWeight: 'bold',}}>{props.route.params.nome}</Text>
    </View>
  )
 }

 const botaoTextoS = () => {
  if(allQuestions[currentQuestionIndex]?.textoS){
  return(
    <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
      <TouchableOpacity onPress={()=> {setVisivel2(true)}} style={{marginLeft: width * 0.05, paddingHorizontal: 10, paddingVertical: 2, borderColor: '#ff7b00', borderWidth: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
      <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15, fontWeight: 'bold',}}>texto</Text>
      <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: 15, fontWeight: 'bold', marginLeft: 5,}}>+</Text>
      </TouchableOpacity>
    </View>
  )
  }else{
    return null;
  }
 }

    return <SafeAreaView style={{flex: 1}}>
      <ScrollView ref={scrollRef} style={{flexGrow: 1, backgroundColor: '#0038A8'}}>
      <View style={{ alignItems: 'center',}}>
      {voltar()}
      {renderNumeru()}

        {renderProgressBar()}

        <View style={{width: '100%', alignItems: 'center', backgroundColor: '#fff', paddingBottom: height/50, paddingTop: height/50, borderTopLeftRadius: 30, borderTopRightRadius: 30,}}>
          {renderTextu()}
          {renderTextu1()}
          {botaoTextoS()}
        {renderQuestion()}
        {renderOptions()}
        {renderNextButton()}
        </View>
        <Modal
        animationType="slide"
        transparent={true}
        visible={showScoreModal}
        >
          <View style={{flex: 1,
             backgroundColor: '#0038A8',
              alignItems: 'center',
               justifyContent: 'center',}}>
                <Estrela3 />
      
            <View style={{
            alignItems: 'center',
             padding: 20,
             backgroundColor: '#fff',
             borderRadius: 20,
             marginBottom: height / 100,
              width: '90%',}}>
                <Text style={{fontSize: 40, color: '#082675', textShadowColor: '#000', textShadowRadius: 2, fontWeight: 'bold', }}>{score> (allQuestions.length/2) ? 'Parabéns!!' : 'ops!'}</Text>
                <View style={{flexDirection: 'row',  alignItems: 'center', marginBottom: 30, marginTop: 20,}}>
                  <Text style={{fontSize: 55, fontWeight: 'bold', color: score> (allQuestions.length/2) ? '#299D16' : '#FF0404',}}>{score} </Text>
                  <Text style={{fontSize: 35, fontWeight: 'bold', color: '#299D16',}}>/ {allQuestions.length}</Text>
                </View>
             
                <TouchableOpacity onPress={restartQuiz} style={{marginTop: 10, padding: 15, backgroundColor: '#1460D1', borderRadius: 10, width: '80%', alignItems: 'center', justifyContent: 'center',}}>
                  <Text style={{color: '#fff', fontSize: 17, fontWeight: 'bold', textShadowRadius: 3, textShadowColor: '#000',}}>REFAZER</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('inicio')} style={{padding: 15, backgroundColor: '#1460D1', borderRadius: 10, width: '80%', alignItems: 'center', justifyContent: 'center', marginTop: 15,}}>
                  <Text style={{color: '#fff', fontSize: 17, fontWeight: 'bold', textShadowRadius: 3, textShadowColor: '#000',}}>HOME</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
        animationType="slide"
        transparent={true}
        visible={visivel2}
        >
          <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center', }}>
            <View style={{position: 'absolute', top: 1, padding: 10, right: 0,}}>
              <TouchableOpacity onPress={()=>{setVisivel2(false)}} style={{marginRight: width * 0.04,  paddingHorizontal: 10, }}>
                <Text style={{fontSize: 40, }}>x</Text>
                </TouchableOpacity>
            </View>

           <ScrollView style={{marginTop: height / 8, width: '100%', }}>
            <View style={{ width: '100%', alignItems: 'center', paddingBottom: 20,}}>
       {
        allQuestions[currentQuestionIndex]?.textoS ?
        allQuestions[currentQuestionIndex]?.textoS.map(textoS => (
          <View style={{ width: '90%', marginBottom: 10,}}>
            <Text key={textoS} style={{textAlign: 'justify', color:'#000' , textShadowRadius: 1,}}>{textoS}</Text>
            </View>
             
        )) : null
       }
       </View>
    </ScrollView>
          </View>
        </Modal>

        {showScoreModal && (
  <View style={styles.scoreModal}>
    <Text style={styles.scoreModalTitle}>Seu score:</Text>
    <Text style={styles.scoreModalScore}>
      {savedScore ?? score}/{allQuestions.length}
    </Text>
    <TouchableOpacity
      style={styles.scoreModalButton}
      onPress={restartQuiz}
    >
      <Text style={styles.scoreModalButtonText}>Recomeçar</Text>
    </TouchableOpacity>
  </View>
)}

      </View>
      </ScrollView>
    </SafeAreaView>;
}
