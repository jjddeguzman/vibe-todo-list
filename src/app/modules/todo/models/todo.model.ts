export interface ITodo {
  id: number | string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface ITodoState {
  todos: ITodo[];
  loading: boolean;
  error: string | null;
}
