"use client";
import {useState, useEffect, useActionState} from "react";
import { useUserStore } from '../../store/user';
import { IoMdClose } from "react-icons/io";
import { FaPlus,  FaRegTrashCan } from "react-icons/fa6";
import { Group } from "@prisma/client";
import { addGroup, getGroups, deleteGroup } from "@/actions/groupAction";
import { useModalStore, ModalTypes } from "@/store/modal";
import  { useAlertStore, AlertStatus } from "@/store/alert";

const initialState = {
  status: '',
}

export default function AddDeviceModal() {
	const { hide, isVisible, type } = useModalStore();
	const show = useAlertStore(state => state.show);
	const email = useUserStore(state => state.email);
	const [groups, setGroups] = useState<Group[]>([]);
	const [state, formAction, pending] = useActionState(addGroup, initialState);
	
	useEffect(() => {
		getGroups(email)
			.then((groups) => {	
				if (state.status === 'success') {
					show(AlertStatus.SUCCESS, 'Группа успешно добавлена');	
					setGroups(groups);
				}else if (state.status === 'error') {
					show(AlertStatus.ERROR, 'Ошибка при добавлении группы');
					hide();
				}
				else {
					setGroups(groups);
				}
			})		
	}, [state]);

	
	const remove = async (id: number) => {
		const res = await deleteGroup(id);
		if (res.status === 'success') {
			show(AlertStatus.SUCCESS, 'Группа успешно удалена');
			setGroups(groups.filter((item) => item.id !== id));
		}else {
			show(AlertStatus.ERROR, 'Ошибка при удалении группы');
			hide();
		}
	}

  return(
		<>
		{isVisible && type === ModalTypes.ADD_GROUP && (
    <div className="modal-box">
      <div className="modal-content">
        <div className="w-full flex items-center justify-between border-b-2 border-gray-200 p-4">
          <h4 className="text-lg text-gray-600 font-semibold">Группы</h4>
          <IoMdClose onClick={hide} className="text-lg text-gray-600 cursor-pointer hover:text-gray-900"/>
        </div>
        <form
					action={formAction} 
					className="w-full flex flex-col p-4">
          <div className="grid grid-cols-5 p-2 border-b-[1px] border-gray-900 font-semibold text-sm">
            <div>ID</div>
            <div>Имя</div>
            <div className="col-span-2">Всего реквизитов</div>
            <div>Активных</div>
          </div>
					{groups.length > 0 && groups.map((group, index) => (
						<div
							key={index} 
							className="grid grid-cols-5 p-2">
							<div>
								{group.id}
							</div>
							<div>
								{group.name}
							</div>
							<div>
								10
							</div>
							<div className="justify-self-end relative left-2">
								5
							</div>
							<div className="justify-self-end">
								<FaRegTrashCan 
									onClick={() => remove(group.id)}
									className="text-gray-600 cursor-pointer hover:text-gray-900" />
							</div>
						</div>
					))}

					<div className="grid grid-cols-2 gap-x-2 p-2">
						<input 
							type="text" 
							name="name" 
							className="border border-gray-800 text-gray-800 py-1 px-2 rounded-sm"  
							placeholder="Имя группы"
						/>
						<input type="hidden" name="email" value={email} />
					</div>
          <div className="h-5"></div>
          <button
						type="submit"
						disabled={pending} 
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