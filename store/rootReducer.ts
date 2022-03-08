import type {Plan, PlanList} from './PlanList';
import type {AddActions} from './actions';
import {format} from 'date-fns';

const initialState: PlanList = {
  list: [
    {
      id: 0,
      done: false,
      title: '동아리 회의',
      bookmark: false,
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '23:59',
      content: '프로젝트 주제 정하기',
      link: 'https://www.google.co.kr/',
    },
  ],
};

export const rootReducer = (
  state: PlanList = initialState,
  action: AddActions,
) => {
  switch (action.type) {
    case 'add':
      return Object.assign({}, state, {
        list: state.list.concat({
          id: action.id,
          done: false,
          title: action.title,
          bookmark: action.bookmark,
          date: action.date,
          time: action.time,
          content: action.content,
          link: action.link,
        }),
      });

    case 'update':
      return Object.assign({}, state, {
        list: state.list.map((item, index) => {
          item = Object.assign({}, item);
          if (index === action.id) {
            (item.id = item.id),
              (item.done = action.done),
              (item.title = action.title),
              (item.bookmark = action.bookmark),
              (item.date = action.date),
              (item.time = action.time),
              (item.content = action.content),
              (item.link = action.link);
          }
          return item;
        }),
      });

    case 'delete':
      return Object.assign({}, state, {
        list: state.list.filter((item: Plan) => item.id !== action.id),
      });

    case 'check':
      return Object.assign({}, state, {
        list: state.list.map((item, index) => {
          item = Object.assign({}, item);
          if (index === action.id) {
            item.done = !item.done;
          }
          return item;
        }),
      });
    default:
      return state;
  }
};
