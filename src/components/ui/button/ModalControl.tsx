"use client";
import React from "react";
import { useModalStore, ModalTypes } from "@/store/modal";

type ModalControlProps = {
	icon: React.JSX.Element;
	text: string;
	type: ModalTypes;
	classes?: string;
}

function ModalControl({icon, text, type, classes}: ModalControlProps) {
	const { show } = useModalStore();
	return ( 
		<button 
			onClick={() => show(type)}
			className={`btn-secondary ${classes}`}>
			{icon}
			<span>{text}</span>
		</button>
	);
}

export default ModalControl;