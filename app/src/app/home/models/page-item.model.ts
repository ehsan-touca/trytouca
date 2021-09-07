// Copyright 2021 Touca, Inc. Subject to Apache-2.0 License.

export enum IconColor {
  Blue = 'dodgerblue',
  Gold = 'gold',
  Gray = 'lightgray',
  Green = 'mediumseagreen',
  Orange = 'darkorange',
  Red = 'mediumvioletred'
}

export enum IconType {
  PlusCircle = 'plus-circle',
  MinusCircle = 'minus-circle',
  Spinner = 'spinner',
  CheckCircle = 'check-circle',
  Circle = 'circle',
  Star = 'star',
  TimesCircle = 'times-circle'
}

export type Icon = {
  color: IconColor;
  type: IconType;
  spin: boolean;
};

export type Data = {
  link: string;
  name: string;
  query: any;
};

export type Topic = {
  color?: string[];
  text: string;
  title?: string;
  type?: TopicType;
  click?: () => void;
};

export enum TopicType {
  MatchRate = 1,
  Performance,
  SubmissionDate,
  TestCases
}
