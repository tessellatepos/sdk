/**
 * LOCAL is a till that runs in a staff browser. It has no pairing code and no
 * hardware, and takes cash only.
 */
export type DeviceType = "TERMINAL" | "MOBILE_READER" | "LOCAL";

export interface IConfigDevice {
    id: string;
    createdAt: Date;
    /** Null for LOCAL devices, which are never paired with a code. */
    pairingCode: string | null;
    /** Null for LOCAL devices, which have no pairing code to expire. */
    codeCreatedAt: Date | null;
    pairedAt: Date | null;
    squareLocation: string | null;
    customerFacing: boolean;
    deviceHardwareId: string | null;
    deviceType: DeviceType | null;
    /** Square's own device id, assigned once this device is paired through Square's Device Code flow. */
    squareDeviceId: string | null;
    /** The pending Square DeviceCode id, set while a pairing code is awaiting entry on the terminal. */
    squareDeviceCodeId: string | null;
    /** Expiry of the current pending Square pairing code. */
    squarePairBy: Date | null;
}
