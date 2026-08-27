export type DeviceType = "TERMINAL" | "MOBILE_READER";

export interface IConfigDevice {
    id: string;
    created_at: Date;
    paring_code: string;
    code_created_at: Date;
    paired_at: Date | null;
    square_location: string | null;
    customer_facing: boolean;
    device_hardware_id: string | null;
    device_type: DeviceType | null;
}
