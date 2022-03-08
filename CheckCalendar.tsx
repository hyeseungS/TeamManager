import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Agenda, AgendaItemsMap} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {checkAction, deleteAction, Plan, PlanList} from './store';
import {useNavigation} from '@react-navigation/native';

interface AgendaItem {
  name: string;
  i: number;
  id: number;
  time: string;
  content: string;
  done: boolean;
}

export default function CheckCalendar() {
  const [planDates, setPlanDates] = useState<AgendaItemsMap<AgendaItem>>();
  const navigation = useNavigation();
  const planData = useSelector((state: PlanList) => state.list);

  const dispatch = useDispatch();

  useEffect(() => {
    const formatData = (array: Plan[]) => {
      const object: AgendaItemsMap<AgendaItem> = {};
      for (let i = 0; i < array.length; i++) {
        if (array[i].id >= 0) {
          const date = array[i].date;
          if (object[date]) {
            object[date] = [
              {
                name: array[i].title,
                i: i,
                id: array[i].id,
                time: array[i].time,
                content: array[i].content,
                done: array[i].done,
              },
              ...object[date],
            ];
          } else {
            object[date] = [
              {
                name: array[i].title,
                i: i,
                id: array[i].id,
                time: array[i].time,
                content: array[i].content,
                done: array[i].done,
              },
            ];
          }
        }
      }

      return object;
    };

    const formattedData = formatData(planData);
    setPlanDates(formattedData);
  }, [planData]);
  const renderItem = (item: AgendaItem) => {
    return (
      <View style={{marginRight: 10, marginTop: 17}}>
        <View style={styles.contentView}>
          <View style={styles.timeView}>
            <Text style={item.done ? styles.strikeDayText : styles.dayText}>
              시작 시간
            </Text>
            <Text style={item.done ? styles.strikeDayText : styles.dayText}>
              {item.time}
            </Text>
          </View>
          <View style={styles.seperateView}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(checkAction(item.i));
                }}
                style={{marginRight: 6}}>
                {item.done ? (
                  <Icon
                    name="checkbox-marked-circle-outline"
                    size={20}
                    color="#bbb"
                  />
                ) : (
                  <Icon
                    name="checkbox-blank-circle-outline"
                    size={20}
                    color="#584F8D"
                  />
                )}
              </TouchableOpacity>
              <Text
                style={
                  item.done ? styles.strikeContentText : styles.contentText
                }>
                {item.name}
              </Text>
            </View>
            <Text
              style={
                item.done
                  ? {color: '#bbb', textDecorationLine: 'line-through'}
                  : {}
              }>
              {item.content}
            </Text>
          </View>
          <View style={item.done ? styles.strikeBar : styles.bar} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('UpdatePlan', {id: item.i});
            }}
            style={{marginStart: 5}}>
            <Icon name="square-edit-outline" size={22} color={'#584F8D'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(deleteAction(item.id));
              Alert.alert('삭제되었습니다');
            }}
            style={{marginStart: 5}}>
            <Icon name="trash-can-outline" size={22} color={'#584F8D'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const rowHasChanged = (r1: AgendaItem, r2: AgendaItem) =>
    r1.done !== r2.done ||
    r1.content !== r2.content ||
    r1.name !== r2.name ||
    r1.time !== r2.time;

  const renderEmptyDate = () => <View></View>;

  return (
    <SafeAreaView style={styles.safe}>
      <Agenda
        items={planDates}
        pastScrollRange={12}
        renderItem={renderItem}
        renderEmptyData={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        showClosingKnob={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, marginBottom: 10},
  seperateView: {
    flexDirection: 'column',
    width: 140,
  },
  timeView: {
    flexDirection: 'column',
    marginEnd: 20,
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    elevation: 5,
    marginBottom: 5,
  },
  dayText: {
    fontWeight: 'bold',
  },
  strikeDayText: {
    fontWeight: 'bold',
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  contentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#584F8D',
  },
  strikeContentText: {
    fontSize: 18,
    color: '#bbb',
    fontWeight: 'bold',
    textDecorationLine: 'line-through',
  },
  bar: {
    height: 50,
    borderStartWidth: 3,
    marginHorizontal: 10,
    borderColor: '#584F8D',
  },
  strikeBar: {
    height: 50,
    borderStartWidth: 3,
    marginHorizontal: 10,
    borderColor: '#bbb',
  },
  dayItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  dayItemText: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 30,
  },
});
