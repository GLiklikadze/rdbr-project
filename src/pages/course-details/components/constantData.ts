import morningIcon from "@/assets/morning.svg";
import afternoonIcon from "@/assets/afternoon.svg";
import eveningIcon from "@/assets/evening.svg";
import onlineIcon from "@/assets/online.svg";
import inPersonIcon from "@/assets/in_person.svg";
import hybridIcon from "@/assets/hybrid.svg";
import type { daysType, hoursType } from "./types";

export const days: daysType[] = [
  { id: 1, label: "Mon - Wed" },
  { id: 2, label: "Tue - Thu" },
  { id: 3, label: "Wed - Fri" },
  { id: 4, label: "Weekend" },
];
export const hours: hoursType[] = [
  {
    id: 1,
    label: "9:00 AM - 11:00 AM",
    name: "Morning",
    imgSrc: morningIcon,
  },
  {
    id: 2,
    label: "2:00 PM - 4:00 PM",
    name: "Afternoon",
    imgSrc: afternoonIcon,
  },
  {
    id: 3,
    label: "6:00 PM - 8:00 PM",
    name: "Evening",
    imgSrc: eveningIcon,
  },
];
export const sessionTypes = [
  {
    id: 1,
    label: "Online",
    imgSrc: onlineIcon,
    location: "Google Meet",
    price: "Included",
  },
  {
    id: 2,
    label: "In-Person",
    imgSrc: inPersonIcon,
    location: "Chavchavadze St.34",
    price: "+ $50",
  },
  {
    id: 3,
    label: "Hybrid",
    imgSrc: hybridIcon,
    location: "Chavchavadze St.34",
    price: "+ $30",
  },
];
