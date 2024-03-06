function CalcBtn(props) {
	return (
		<button className={`${props.color ? 'bg-violetBlue text-[#ffff]' : "dark:bg-davyGrey bg-['#fff] bg-[#fff]"} text-center rounded-[1.2rem] py-4 flex justify-center items-center active:scale-90 duration-200 shadow-md  ${props.span && "row-span-2"}`} onClick={props.onAdd.bind(null,props.text)}>
			<p>{props.text}</p>
		</button>
	);
}

export default CalcBtn;
