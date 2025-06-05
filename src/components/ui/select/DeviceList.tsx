'use client'
import { Device } from '@prisma/client';

type DeviceListProps = {
	devices: Device[];
	value?: number;
}

function DeviceList({devices, value}: DeviceListProps) {

	return ( 
		<select
			defaultValue={value || 0} 
			name="device" 
			className="default-input">
			<option value={0}>Устройство</option>
			{devices.length > 0 && devices.map((device) => (
				<option key={device.id} value={device.id}>
					{device.name}
				</option>
			))}
		</select>
	);
}

export default DeviceList;