import { Address } from "./address.js";
import { CurrencyCode } from "./currencies.js";

export interface Location {
    id: string;
    name: string;
    address: Address;
    currency: CurrencyCode;
    phoneNumber: string;
    websiteUrl: string;
    email: string;
    hours: LocationHours;
    logoUrl: string;
}

export interface LocationHours {
    sunday: TimePeriod[];
    monday: TimePeriod[];
    tuesday: TimePeriod[];
    wednesday: TimePeriod[];
    thursday: TimePeriod[];
    friday: TimePeriod[];
    saturday: TimePeriod[];
}

export interface TimePeriod {
    open: Time;
    close: Time;
}

export interface Time {
    time: string;
    timezone: string;
}
