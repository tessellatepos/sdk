import { Address } from "./address.js";
import { CurrencyCode } from "./currencies.js";

export interface Location {
    id: string;
    name: string;
    address: Address;
    currency: CurrencyCode;
    phone_number: string;
    website_url: string;
    email: string;
    hours: LocationHours;
    logo_url: string;
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
