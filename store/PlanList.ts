export type Plan = {
  id: number;
  done: boolean;
  title: string;
  bookmark: boolean;
  date: string;
  time: string;
  content: string;
  link: string;
};

export type PlanList = {
  list: Plan[];
};
