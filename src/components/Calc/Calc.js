import { useState } from "react";
import CalcBtn from "../UI/CalcBtn";

function Calc() {
	const calcNum = [
		"C",
		"/",
		"x",
		<svg
			width="27"
			height="14"
			viewBox="0 0 27 18"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fill-rule="evenodd"
				clip-rule="evenodd"
				d="M9.58578 0H10H26H27V1V17V18H26H10H9.58578L9.29289 17.7071L1.29289 9.70711L0.585785 9L1.29289 8.29289L9.29289 0.292893L9.58578 0ZM10.4142 2L3.41421 9L10.4142 16H25V2H10.4142ZM14 4.58578L14.7071 5.29288L17 7.58578L19.2929 5.29289L20 4.58579L21.4142 6L20.7071 6.70711L18.4142 9L20.7071 11.2929L21.4142 12L20 13.4142L19.2929 12.7071L17 10.4142L14.7071 12.7071L14 13.4142L12.5858 12L13.2929 11.2929L15.5858 9L13.2929 6.7071L12.5858 5.99999L14 4.58578Z"
				fill="white"
			/>
		</svg>,
		"7",
		"8",
		"9",
		"-",
		"4",
		"5",
		"6",
		"+",
		"1",
		"2",
		"3",
		"=",
		"%",
		"0",
		".",
	];

	const [displayCalc, setDisplayCalc] = useState({
		display: "",
		answer: 0,
	});

	const displayCalcHandler = (value) => {
		const check = ["/", "+", "-", ".", "x"];
		if (value === "C") {
			setDisplayCalc(() => {
				return { display: "", answer: 0 };
			});
		}
		else if(value==="="){
			const display = document.querySelector('.solution');
			display.classList.add('anim');


			const timer = setTimeout(()=>{
				display.classList.remove('anim');
				clearTimeout(timer);
			},300)

			setDisplayCalc(prevState=>{
				const results = prevState.answer===0? "" :prevState.answer.toString();
				responsiveDisplay("");
				return {display:results, answer:0}
			})
		}
		
		else if (!value.type) {
			setDisplayCalc((prevState) => {
				const updateDisplay = ["/", "+", "-", ".", "x",'%'].includes(prevState.display + value)? '':prevState.display + value;

				let solve = check.includes(value)
					? prevState.answer.toString()
					: updateDisplay;
        solve = solve.toString().length > 0 ? solve : '0'
				solve = eval(solve.replaceAll("x", "*").replaceAll('%','/100'));
				solve = solve.toString().includes(".") ? solve.toFixed(2) : solve;
				
				responsiveDisplay(updateDisplay);

				return {
					display: updateDisplay,
					answer: solve,
				};
			});
		} else {
			setDisplayCalc((prevState) => {
				const updateDisplay = prevState.display.slice(
					0,
					prevState.display.length - 1
				);
				let solve = check.includes(updateDisplay[updateDisplay.length - 1])
					? updateDisplay.slice(0, updateDisplay.length - 1)
					: updateDisplay;
        solve = solve.toString().length > 0 ? solve : '0';
				solve = eval(solve.replaceAll("x", "*").replaceAll('%','/100'));
				solve = solve.toString().includes(".") ? solve.toFixed(2) : solve;

        responsiveDisplay(updateDisplay);

				return {
					display: updateDisplay.length > 0 ? updateDisplay : "",
					answer: solve,
				};
			});
		}
	};

	const responsiveDisplay = (calc)=>{
		const display = document.querySelector('.solution');
		const calcLength = calc.length;

		switch(true){
			case calcLength>16:
				display.style.fontSize = "20px";
				break
	
			case calcLength>10:
				display.style.fontSize = "34px";
				break


			case calcLength<=10:
				display.style.fontSize = "60px";
				break

			default:

		}
	}

	return (
		<div>
			<div className="text-end font-light">
				<p className={`text-6xl duration-150 ${displayCalc.display === "" && "invisible"} solution`}>
					{displayCalc.display === "" ? "0" : displayCalc.display}
				</p>

				<p
					className={`text-davyGrey text-xl md:text-2xl ${
						displayCalc.answer === 0 && "invisible"
					}`}
				>
					{displayCalc.answer === 0 ? 0 : displayCalc.answer}
				</p>
			</div>
			<div className="grid grid-cols-4 gap-3 auto-rows-[4.2rem] mt-12">
				{calcNum.map((val, i) => {
          const changeColor = (i+1)%4===0? true :false;
					return <CalcBtn
						text={val}
						color= {changeColor}
						key={i}
						span={val === "=" && true}
						onAdd={displayCalcHandler}
					/>
        })}
			</div>
		</div>
	);
}

export default Calc;
