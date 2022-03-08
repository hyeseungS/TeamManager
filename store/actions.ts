import type {Action} from 'redux';

type AddAction = Action<'add'> & {
  id: number;
  title: string;
  bookmark: boolean;
  date: string;
  time: string;
  content: string;
  link: string;
};
type UpdateAction = Action<'update'> & {
  id: number;
  done: boolean;
  title: string;
  bookmark: boolean;
  date: string;
  time: string;
  content: string;
  link: string;
};
type DeleteAction = Action<'delete'> & {
  id: number;
};
type CheckAction = Action<'check'> & {
  id: number;
};

export type AddActions = AddAction | UpdateAction | DeleteAction | CheckAction;

export const addAction = (
  id: number,
  title: string,
  bookmark: boolean,
  date: string,
  time: string,
  content: string,
  link: string,
) => {
  return {
    type: 'add',
    id: id,
    title: title,
    bookmark: bookmark,
    date: date,
    time: time,
    content: content,
    link: link,
  };
};

export const updateAction = (
  id: number,
  done: boolean,
  title: string,
  bookmark: boolean,
  date: string,
  time: string,
  content: string,
  link: string,
) => {
  return {
    type: 'update',
    id: id,
    done: done,
    title: title,
    bookmark: bookmark,
    date: date,
    time: time,
    content: content,
    link: link,
  };
};

export const deleteAction = (id: number) => {
  return {
    type: 'delete',
    id: id,
  };
};

export const checkAction = (id: number) => {
  return {
    type: 'check',
    id: id,
  };
};
