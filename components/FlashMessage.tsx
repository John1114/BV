import FlashMessage from "react-flash-message";

interface FlashState{
	message: string;
	backgroundColor: string;
	textColor: string;
}

export default function Message({
	message,
	backgroundColor,
	textColor
}: FlashState){
	const flashClassName = `${backgroundColor} h-16 p-4 absolute w-1/2 l-0 rounded-br flex place-content-center`
	const textClassName = `${textColor} align-middle`
	return (
		<FlashMessage duration={5000}>
		  <div className={flashClassName}>
			<strong className={textClassName}>{message}</strong>
		  </div>
		</FlashMessage>
	  )
}
