export type daysType = {
  id: number;
  label: string;
};
export type hoursType = {
  id: number;
  label: string;
  name: string;
  imgSrc: string;
};
export type sessionType = {
  id: number;
  label: string;
  imgSrc: string;
  location: string;
  price: string;
};

export type ProfileAlertBoxProps = {
  alertTitle: string;
  alertMessage: string;
  buttonText: string;
  buttonAction: () => void;
};
