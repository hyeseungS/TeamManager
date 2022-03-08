import React, {useCallback, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';
import {format} from 'date-fns';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useDispatch, useSelector} from 'react-redux';
import {addAction, PlanList} from './store';

export default function AddPlan() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDateTimePicker, setShowDatePicker] = useState(
    Platform.OS === 'ios',
  );
  const [text, onChangeText] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [bmImage, updateBMImage] = useState<string>('star-outline');
  const dispatch = useDispatch();
  const plan = useSelector((state: PlanList) => state.list);
  const doAdd = useCallback(() => {
    dispatch(
      addAction(
        plan.length,
        title,
        bookmark,
        text,
        format(selectedDateTime, 'HH:mm'),
        content,
        link,
      ),
    );
    setSelectedDateTime(new Date());
    onChangeText(format(new Date(), 'yyyy-MM-dd'));
    setTitle('');
    setContent('');
    setLink('');
    setBookmark(false);
    updateBMImage('star-outline');
  }, [title, bookmark, text, content, link]);
  const starLike = useCallback(() => {
    if (bookmark) {
      setBookmark(false);
      updateBMImage('star-outline');
    } else {
      setBookmark(true);
      updateBMImage('star');
    }
  }, [bookmark]);

  function handleChangeTime(_: Event, dateTime: Date | undefined) {
    if (Platform.OS === 'android') {
      setShowDatePicker(oldState => !oldState);
    }

    if (dateTime) {
      setSelectedDateTime(dateTime);
    }
  }

  function handleOpenDateTimePickerAndroid() {
    setShowDatePicker(oldState => !oldState);
  }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: number | Date) => {
    hideDatePicker();
    onChangeText(format(date, 'yyyy-MM-dd'));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
        <View style={styles.view}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Text style={styles.timeText}>날짜</Text>
            <TouchableOpacity onPress={showDatePicker} style={styles.dayButton}>
              <Text style={styles.text}>{text}</Text>
              <Icon name="calendar-blank" size={26} color={'#584F8D'} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Text style={styles.timeText}>시작 시간</Text>
            {showDateTimePicker && (
              <DateTimePicker
                value={selectedDateTime}
                mode="time"
                display="spinner"
                onChange={handleChangeTime}
              />
            )}

            {Platform.OS === 'android' && (
              <TouchableOpacity
                onPress={handleOpenDateTimePickerAndroid}
                style={styles.dayButton}>
                <Text style={styles.text}>{`${format(
                  selectedDateTime,
                  'HH:mm',
                )}`}</Text>
                <Icon
                  name="clock-time-three-outline"
                  size={26}
                  color={'#584F8D'}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.inputTextView}>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="회의 제목을 입력하세요."
              style={styles.inputText1}></TextInput>
            <TouchableOpacity onPress={starLike}>
              <Icon name={bmImage} size={26} color={'#584F8D'} />
            </TouchableOpacity>
          </View>
          <TextInput
            value={content}
            onChangeText={setContent}
            placeholder="회의 내용을 입력하세요."
            style={styles.inputText2}></TextInput>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.timeText}>회의 링크</Text>
            <TextInput
              value={link}
              onChangeText={setLink}
              placeholder="회의 링크를 입력하세요."
              style={styles.inputText3}></TextInput>
          </View>
          <TouchableOpacity style={styles.button} onPress={doAdd}>
            <Text style={styles.buttonText}>저장하기</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  dayButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    width: 150,
    color: '#979797',
    fontWeight: '600',
  },
  timeText: {
    width: 100,
    fontSize: 18,
    color: '#474747',
    marginStart: 10,
    fontWeight: 'bold',
  },
  inputTextView: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 330,
    height: 50,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingStart: 20,
  },
  inputText1: {
    fontSize: 18,
    width: 263,
    color: '#979797',
    fontWeight: '600',
  },
  inputText2: {
    fontSize: 18,
    color: '#979797',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 330,
    height: 220,
    margin: 10,
    fontWeight: '600',
    paddingStart: 20,
  },
  inputText3: {
    fontSize: 15,
    color: '#979797',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 220,
    height: 40,
    marginVertical: 10,
    marginStart: 5,
    fontWeight: '600',
    paddingStart: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  button: {
    borderRadius: 10,
    width: 330,
    height: 50,
    backgroundColor: '#584F8D',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
