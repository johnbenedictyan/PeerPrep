// Converts all keys to be optional
export type StringInterface<T> = {
  [_P in keyof T]: string;
};
