"use client";
import {useState, useEffect, useActionState} from "react";
import { useUserStore } from '../../store/user';
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { addDevice, getDevices, deleteDevice } from "@/actions/deviceAction";
import { useModalStore, ModalTypes } from "@/store/modal";
import { useAlertStore, AlertStatus } from "@/store/alert";
import {Device} from "@prisma/client";

const initialState = {
  status: '',
}

export default function AddDeviceModal() {
	const show = useAlertStore(state => state.show);
	const { hide, isVisible, type } = useModalStore();
	const email = useUserStore(state => state.email);
	const [devices, setDevices] = useState<Device[]>([]);
	const [state, formAction, pending] = useActionState(addDevice, initialState);

	useEffect(() => {
		getDevices(email)
			.then((devices) => {
				console.log('Devices fetched:', devices);
				if (state.status === 'success') {
					show(AlertStatus.SUCCESS, 'Устройство успешно добавлено');
					setDevices(devices);
				}else if (state.status === 'error') {
					show(AlertStatus.ERROR, 'Ошибка при добавлении устройства');
					hide();
				} else {
					setDevices(devices);
				}
			})
	}, [state, email]);

	const remove = async (deviceId: string) => {
		const res = await deleteDevice(deviceId);
		if (res.status === 'success') {
			setDevices(devices.filter((device) => device.deviceId !== deviceId));
			show(AlertStatus.SUCCESS, 'Устройство успешно удалено');
		}else {
			show(AlertStatus.ERROR, 'Ошибка при удалении устройства');
			hide();
		}
	}

  return(
		<>
		{isVisible && type === ModalTypes.ADD_DEVICE && (
    <div className="modal-box">
      <div className="modal-content">
        <div className="w-full flex items-center justify-between border-b-2 border-gray-200 p-4">
          <h4 className="text-lg text-gray-600 font-semibold">Устройства</h4>
          <IoMdClose onClick={hide} className="text-lg text-gray-600 cursor-pointer hover:text-gray-900"/>
        </div>
        <form 
					action={formAction}
					className="w-full flex flex-col p-4">
          <div className="grid grid-cols-6 p-2 border-b-[1px] border-gray-900 font-semibold">
            <div className="col-span-3">ID</div>
            <div className="pl-5">Имя</div>
          </div>
					{devices.length > 0 && devices.map((device, index) => (
						<div
							key={index} 
							className="grid grid-cols-6 p-2">
							<div className="col-span-3">
								{device.deviceId}
							</div>
							<div className="col-span-2 pl-5">
								{device.name}
							</div>
							<div className="col-span-1 justify-self-end">
								<FaRegTrashCan 
									onClick={() => remove(device.deviceId)}
									className="text-gray-600 cursor-pointer hover:text-gray-900" 
								/>
							</div>
          	</div>
					))}
					<div className="grid grid-cols-4 p-2 border-b-[1px] border-gray-900">
            <div className="col-span-2"></div>
            <div>
							<input 
								type="text" 
								name="name" 
								className="border border-gray-800 text-gray-800 py-1 px-2 ml-5 rounded-sm" 
								placeholder="Название устройства" 
							/>
							<input type="hidden" name="email" value={email} />
						</div>
          </div>

          <div className="h-5"></div>
          <button
						disabled={pending}
						type="submit"
						className="btn-secondary w-full">
            <FaPlus />
            <span>Добавить</span>
          </button>
        </form> 
        <div className="w-full flex items-center justify-end border-t-2 border-gray-200 p-4">
          <button onClick={hide} type="button" className="btn-secondary">Закрыть</button>
        </div>
      </div>
    </div>
		)}
		</>
  )
}