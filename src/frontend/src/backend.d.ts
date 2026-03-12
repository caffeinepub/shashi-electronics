import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    customerName: string;
    issueDescription: string;
    tvBrand: string;
    timestamp: Time;
    phoneNumber: string;
}
export type Time = bigint;
export interface backendInterface {
    getAllBookings(): Promise<Array<Booking>>;
    getBooking(id: bigint): Promise<Booking>;
    submitBooking(customerName: string, phoneNumber: string, tvBrand: string, issueDescription: string): Promise<bigint>;
}
