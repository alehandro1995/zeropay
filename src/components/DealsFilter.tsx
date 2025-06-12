"use client";
import {useState, useRef, MouseEvent} from "react"
import { IoSettingsSharp } from "react-icons/io5";
import { ImSpinner2 } from "react-icons/im";
import PaymentSetting from "@/components/modals/PaymentSetting";

function DealsFilter({currencies, banks, paymentMethod}: any) {
	const [visible, setVisible] = useState(false);
	const [showModal, setShowModal] = useState(false);
	
	const boxRef = useRef<HTMLDivElement>(null);
	const boxRef2 = useRef<HTMLDivElement>(null);
	
	function setActive(e: MouseEvent<HTMLButtonElement>){
		setVisible(true)
		const target = e.target as HTMLButtonElement
		const elements = boxRef.current?.querySelectorAll('button');
		elements?.forEach(item => {
			item.classList.remove('active');
		});
	
		setTimeout(() => {
			setVisible(false);
			target.classList.add('active')
		}, 1200)
	}
	
	function setActive2(e: MouseEvent<HTMLButtonElement>){
		setVisible(true)
		const target = e.target as HTMLButtonElement
		const elements = boxRef2.current?.querySelectorAll('button');
		elements?.forEach(item => {
			item.classList.remove('active');
		});
	
		setTimeout(() => {
			setVisible(false);
			target.classList.add('active')
		}, 1200)
	}
	
	return ( 
		<>
		<div className="flex items-center justify-between bg-white shadow-sm rounded-2xl p-5">
			<div>
				<div ref={boxRef} className="flex gap-x-3">
					<button onClick={setActive} className="link-primary active">Активные</button>
					<button onClick={setActive} className="link-primary">Завершенные</button>
					<button onClick={setActive} className="link-primary">Отмененные</button>
					<button onClick={setActive} className="link-primary">Споры</button>
				</div>
				<div ref={boxRef2} className="flex gap-x-3 mt-2">
					<button onClick={setActive2} className="link-primary active">Прием</button>
					<button onClick={setActive2} className="link-primary">Выплата</button>
					<button
						onClick={() => setShowModal(true)} 
						className="link-primary">
						<IoSettingsSharp className="text-xl" />
					</button>
				</div>
			</div>
			<button className="btn-secondary">Фильтр</button>
		</div>
		{visible &&
      <div className="modal-box">
        <ImSpinner2  className="animate-spin text-8xl text-amber-50 my-auto"/>
      </div>
    }
		{showModal &&
			<PaymentSetting
				currencies={currencies}
				banks={banks}
				paymentMethod={paymentMethod}
				close={() => setShowModal(false)}
			/>
		}			
		</>
	);
}

export default DealsFilter;