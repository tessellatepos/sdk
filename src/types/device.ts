export type DeviceType = "TERMINAL" | "MOBILE_READER";

export interface IConfigDevice {
    id: string;
    created_at: Date;
    pairing_code: string;
    code_created_at: Date;
    paired_at: Date | null;
    square_location: string | null;
    customer_facing: boolean;
    device_hardware_id: string | null;
    device_type: DeviceType | null;
    /** Square's own device id, assigned once this device is paired through Square's Device Code flow. */
    square_device_id: string | null;
    /** The pending Square DeviceCode id, set while a pairing code is awaiting entry on the terminal. */
    square_device_code_id: string | null;
    /** Expiry of the current pending Square pairing code. */
    square_pair_by: Date | null;
}
