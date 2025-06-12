import {TransactionStatus} from "@prisma/client"

function DealStatus() {
	return ( 
		<select name="deal_status" className="default-input">
    	<option value={""}>Статусы</option> 
			<option value={TransactionStatus.PENDING}>В ожидании</option>
			<option value={TransactionStatus.COMPLETED}>Успешно</option>
			<option value={TransactionStatus.CANCELED}>Отменено</option>
			<option value={TransactionStatus.FAILED}>Неудачно</option>
			<option value={TransactionStatus.REFUNDED}>Возвращено</option>
			<option value={TransactionStatus.DISPUTED}>Споры</option>
  	</select>
	);
}

export default DealStatus;