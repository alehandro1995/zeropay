"use client"
import { useModalStore, ModalTypes } from "@/store/modal";
import { deleteRequisites } from "@/actions/requisitesAction";

function Modal() {
	const { isVisible, type, hide, data } = useModalStore();

	const handleDelete = async () => {
		if (data && typeof data === 'number') {
			const result = await deleteRequisites(data);
			if (result.status === 'success') {
				hide();
			} else {
				console.error('Error deleting requisites');
			}
		}
	}
	
  return ( 
		<>
		{isVisible &&  type === ModalTypes.REMOVE_REQUISITE && (
    <div className="modal-box">
			<div className="modal-content p-5">
				<h3 className="text-xl">Вы точно хотите удалить эти реквизиты?</h3>
				<div className="w-full flex justify-around mt-4">
					<button onClick={handleDelete} className="btn-secondary w-[100px]" type="submit">Да</button>
					<button onClick={hide} className="btn-secondary w-[100px]" type="button">Нет</button>
				</div>
			</div>
		</div>
		)}
		</>
  );
}

export default Modal;