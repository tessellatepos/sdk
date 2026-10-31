/**
 * LOCAL is a till that runs in a staff browser. It has no pairing code and no
 * hardware, and takes cash only.
 */
export type DeviceType = "TERMINAL" | "MOBILE_READER" | "LOCAL";

export interface IConfigDevice {
    id: string;
    created_at: Date;
    /** Null for LOCAL devices, which are never paired with a code. */
    pairing_code: string | null;
    /** Null for LOCAL devices, which have no pairing code to expire. */
    code_created_at: Date | null;
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
