import FlashMessage from "react-flash-message";

interface FlashState{
	message: string;
	backgroundColor: string;
	textColor: string;
	width?: string;
	duration?: number;
}

export default function Message({
	message,
	backgroundColor,
	textColor,
	width,
	duration
}: FlashState){
	let flashClassName = `${backgroundColor} h-16 p-4 absolute l-0 rounded-br flex place-content-center`
	if (width){
		flashClassName += ` ${width}`
	}else{
		flashClassName += " w-full"
	}
	
	const textClassName = `${textColor} align-middle`
	return (
		<FlashMessage duration={duration? duration: 5000}>
		  <div className={flashClassName}>
			<strong className={textClassName}>{message}</strong>
		  </div>
		</FlashMessage>
	  )
}
