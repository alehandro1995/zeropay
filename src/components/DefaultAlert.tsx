"use client"
import {useAlertStore, AlertStatus} from '../store/alert'
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion"

const variants = {
  open: { x: 0 },
  closed: { x: 500 },
}

function Alert() {
	const {isVisible, type, message, hide} = useAlertStore();

  return ( 
    <motion.div
      variants={variants}
      initial="closed"
      animate={isVisible ? "open" : "closed"}
      className={`${type === AlertStatus.ERROR ? 'bg-red-500/80 border-2 border-red-900' : ''} 
			${type === AlertStatus.SUCCESS ? 'bg-green-600/80 border-2 border-green-800' : ''}
			text-white text-center p-4 rounded-xl w-fit flex justify-center items-center fixed right-5 bottom-5 z-50`}>
      <p>{message}</p>
			<span
				onClick={hide} 
				className='text-2xl ml-4 cursor-pointer hover:text-red-700 border border-white hover:border-red-700 rounded-md p-1'>
				<IoMdClose />
			</span>
    </motion.div>
  );
}

export default Alert;