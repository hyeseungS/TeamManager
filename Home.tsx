import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {deleteAction} from './store/actions';
import {Plan, PlanList} from './store/PlanList';

export default function Home() {
  const plan = useSelector((state: PlanList) => state.list);
  plan.sort((a, b) => {
    return (
      new Date(a.date + 'T' + a.time + ':00.000Z').getTime() -
      new Date(b.date + 'T' + b.time + ':00.000Z').getTime()
    );
  });
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const planSort = plan.filter(
    (item: Plan) =>
      new Date(item.date + 'T' + item.time + ':00.000Z').getTime() >=
      new Date().getTime() + 9000 * 60 * 60,
  );
  useEffect(() => {
    const dday =
      planSort[0] !== undefined
        ? new Date(
            planSort[0].date + 'T' + planSort[0].time + ':00.000Z',
          ).getTime()
        : new Date().getTime();
    const id = setInterval(() => {
      const today = new Date().getTime() + 9000 * 60 * 60; // 한국 표준 시
      const gap = dday - today;
      setDay(Math.floor(gap / (1000 * 60 * 60 * 24)));
      setHour(Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMin(Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60)));
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [plan]);
  const goLink = useCallback(url => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Alert.alert('해당 링크가 정확한 지 확인해주세요' + url);
          return false;
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => Alert.alert('해당 링크가 정확한 지 확인해주세요' + url));
  }, []);
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.view1}>
        <Text style={styles.text}>다음 일정까지 남은 시간</Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <Text style={styles.dayText}>D-{day < 0 ? 0 : day},</Text>
          <Text style={styles.timeText}>
            {hour < 0 ? 0 : hour}시간 {min < 0 ? 0 : min}분
          </Text>
        </View>
      </View>
      <View style={styles.view2}>
        <Text style={styles.text}>예정된 팀플 일정</Text>
        <View style={styles.tableView}>
          {planSort[0] !== undefined ? (
            <View
              style={planSort[0].bookmark ? styles.viewhighlight : styles.view}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => goLink(planSort[0].link)}>
                <Text style={styles.textContent}>{planSort[0].title}</Text>
                <Text style={styles.textDate}>{planSort[0].date}</Text>
                <Text style={styles.textTime}>{planSort[0].time}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  dispatch(deleteAction(planSort[0].id));
                  Alert.alert('삭제되었습니다');
                }}>
                <Icon name="trash-can-outline" size={26} color={'#474747'} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyContent}></View>
          )}
          {planSort[1] !== undefined ? (
            <View
              style={planSort[1].bookmark ? styles.viewhighlight : styles.view}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => goLink(planSort[1].link)}>
                <Text style={styles.textContent}>{planSort[1].title}</Text>
                <Text style={styles.textDate}>{planSort[1].date}</Text>
                <Text style={styles.textTime}>{planSort[1].time}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  dispatch(deleteAction(planSort[1].id));
                  Alert.alert('삭제되었습니다');
                }}>
                <Icon name="trash-can-outline" size={26} color={'#474747'} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyContent}></View>
          )}
          {planSort[2] !== undefined ? (
            <View
              style={planSort[2].bookmark ? styles.viewhighlight : styles.view}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => goLink(planSort[2].link)}>
                <Text style={styles.textContent}>{planSort[2].title}</Text>
                <Text style={styles.textDate}>{planSort[2].date}</Text>
                <Text style={styles.textTime}>{planSort[2].time}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  dispatch(deleteAction(planSort[2].id));
                  Alert.alert('삭제되었습니다');
                }}>
                <Icon name="trash-can-outline" size={26} color={'#474747'} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyContent}></View>
          )}
          {planSort[3] !== undefined ? (
            <View
              style={planSort[3].bookmark ? styles.viewhighlight : styles.view}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => goLink(planSort[3].link)}>
                <Text style={styles.textContent}>{planSort[3].title}</Text>
                <Text style={styles.textDate}>{planSort[3].date}</Text>
                <Text style={styles.textTime}>{planSort[3].time}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  dispatch(deleteAction(planSort[3].id));
                  Alert.alert('삭제되었습니다');
                }}>
                <Icon name="trash-can-outline" size={26} color={'#474747'} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyContent}></View>
          )}
          {planSort[4] !== undefined ? (
            <View
              style={planSort[4].bookmark ? styles.viewhighlight : styles.view}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => goLink(planSort[4].link)}>
                <Text style={styles.textContent}>{planSort[4].title}</Text>
                <Text style={styles.textDate}>{planSort[4].date}</Text>
                <Text style={styles.textTime}>{planSort[4].time}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  dispatch(deleteAction(planSort[4].id));
                  Alert.alert('삭제되었습니다');
                }}>
                <Icon name="trash-can-outline" size={26} color={'#474747'} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyContent}></View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  view1: {
    flex: 3,
    paddingStart: 30,
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  view2: {
    flex: 7,
    paddingStart: 30,
    justifyContent: 'center',
    marginVertical: 30,
  },
  tableView: {
    flex: 1,
    justifyContent: 'center',
    marginEnd: 30,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    color: '#474747',
    fontWeight: 'bold',
    alignItems: 'flex-start',
  },
  dayText: {
    fontSize: 48,
    color: '#4C007A',
    fontWeight: 'bold',
    marginStart: 20,
  },
  timeText: {
    fontSize: 36,
    color: '#4C007A',
    fontWeight: 'bold',
    marginStart: 20,
  },
  emptyContent: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    height: 70,
  },
  view: {
    flex: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 70,
    backgroundColor: '#F0F0F0',
  },
  viewhighlight: {
    flex: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 70,
    backgroundColor: '#EEF5FF',
  },
  button: {
    flexDirection: 'row',
  },
  textContent: {
    fontSize: 18,
    color: '#474747',
    fontWeight: 'bold',
    width: 130,
  },
  textDate: {
    fontSize: 15,
    color: '#474747',
    fontWeight: 'bold',
    marginTop: 2,
    marginStart: 6,
  },
  textTime: {
    fontSize: 15,
    color: '#474747',
    marginTop: 2,
    fontWeight: 'bold',
    marginHorizontal: 7,
  },
});
