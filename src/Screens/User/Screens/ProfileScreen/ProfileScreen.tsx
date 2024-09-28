import React from 'react';
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';

import Header from '../../../../components/Header/Header.tsx';
import InformationInput from '../../components/InformationInput/InformationInput.tsx';
import BackButtonModal from '../../../../components/BackButtonModal/BackButtonModal.tsx';


const ProfileScreen = ({visible, setIsVisible}: {visible: boolean, setIsVisible: (a: boolean) => void}) => {



  return (
       <Modal
           visible={visible}
           onRequestClose={() => setIsVisible(!visible)}
       >
         <View style={styles.container}>
           <Header/>
          <BackButtonModal setIsVisible={setIsVisible} visible={visible}/>
           <ScrollView>
             <Text style={styles.header}>Профиль</Text>
             <View style={styles.inputsWrapper}>
               <View style={styles.inputTextWrapper}>
                 <Text style={styles.inputLabel}>Имя</Text>
                 <InformationInput placeholder="Введите Имя" inputMode="text"/>
               </View>
               <View style={styles.inputTextWrapper}>
                 <Text style={styles.inputLabel}>Email</Text>
                 <InformationInput placeholder="Введите Email" inputMode="email"/>
               </View>
               <View style={styles.inputTextWrapper}>
                 <Text style={styles.inputLabel}>Телефон</Text>
                 <InformationInput placeholder="Введите телефон" inputMode="tel"/>
               </View>
               <TouchableOpacity style={styles.btnChangePass}>
                 <Text style={styles.changePassText}>Изменить пароль</Text>
               </TouchableOpacity>
             </View>
           </ScrollView>

           <View style={styles.footer}>
             <TouchableOpacity style={styles.saveBtn}><Text style={styles.btnText}>Сохранить</Text></TouchableOpacity>
           </View>
         </View>

       </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#141414',
  },
  header: {
    fontFamily: 'MontserratRegular',
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600',
    color: 'white',
    marginTop: nh(30),
    marginBottom: nh(15),
    textAlign: 'center',
  },
  inputsWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: '#171717',
    width: '100%',
    height: nh(80),
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtn: {
    width: nw(345),
    height: nh(44),
    backgroundColor: '#FFE600',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'MontserratRegular',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '500',
    color: 'black',
  },
  inputTextWrapper: {
    marginBottom: nh(15),
  },
  inputLabel: {
    fontFamily: 'MontserratRegular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    color: '#616161',
    marginBottom: nh(7),
  },
  btnChangePass: {
    width: nw(365),
    height: nh(44),
    borderRadius: 10,
    backgroundColor: '#FFE60099',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePassText: {
    fontFamily: 'MontserratRegular',
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
});

export default ProfileScreen;
