import {  useRef } from "react";
import PropTypes from 'prop-types';
import Mov from './commands/Mov';
import { useOutletContext } from "react-router-dom";
import Exch from './commands/Exch';
import Inc from './commands/Inc';
import Dec from './commands/Dec';
import Not from "./commands/Not";
import Neg from "./commands/Neg";
import And from './commands/And';
import Or from './commands/Or';
import Xor from './commands/Xor';
import Add from "./commands/Add";
import Sub from "./commands/Sub";
import Mul from "./commands/Mul";
import Imul from "./commands/Imul";
import Div from "./commands/Div";
import Idiv from "./commands/Idiv";
import Help from "./commands/Help";

const Console = () => {

    const [bytes, setBytes] = useOutletContext();

    const consRef = useRef();

    const handleKeyDown = (event) => {
        
        if(event.key === 'Enter')
        {
            let consoleValue = event.target.value.trim();
            if(consoleValue)
            {

                let e = createSpan(consoleValue);
                consRef.current.appendChild(e);

                let data = CheckCommend(consoleValue);

                data.forEach(element => {
                    setTimeout(() => {
                        e = createSpan(element);
                        let num = consRef.current.childElementCount
                        if(num > 8)
                        {
                            let a = consRef.current.children;
                            for(let c = 0; c < num-8; c++)
                              consRef.current.removeChild(a[0]);

                        }
                        consRef.current.appendChild(e);
                    }, 500);
                });

                event.target.value = "";
            }
        }
    }

    const createSpan = (text) => {
        let e = document.createElement('span');
        e.innerHTML = "C:\\Dayid>" + text;
        return e;
    }

    const CheckCommend = (props) => {
        let args = props.replace(/\s+/g, ' ');
        args = args.toUpperCase().split(" ");

        switch(args[0].toUpperCase()){
            case "-H":{
                return Help();
            }
            case "MOV":{
                return Mov(args, bytes, setBytes);
            }
            case "EXCH":{
                return Exch(args, bytes, setBytes);
            }
            case "INC":{
                return Inc(args, bytes, setBytes);
            }
            case "DEC":{
                return Dec(args, bytes, setBytes);
            }
            case "NOT":{
                return Not(args, bytes, setBytes);
            }
            case "NEG":{
                return Neg(args, bytes, setBytes);
            }
            case "AND":{
                return And(args, bytes, setBytes);
            }
            case "OR":{
                return Or(args, bytes, setBytes);
            }
            case "XOR":{
                return Xor(args, bytes, setBytes);
            }
            case "ADD":{
                return Add(args, bytes, setBytes);
            }
            case "SUB":{
                return Sub(args, bytes, setBytes);
            }
            case "MUL":{
                return Mul(args, bytes, setBytes);
            }
            case "IMUL":{
                return Imul(args, bytes, setBytes);
            }
            case "DIV":{
                return Div(args, bytes, setBytes);
            }
            case "IDIV":{
                return Idiv(args, bytes, setBytes);
            }
            default: {
                return ["command not found"];
            }
        }
    }

    CheckCommend.propTypes = {
        props: PropTypes.string.isRequired,
      };

    return (
        <div className="text-3xl lg:text-lg p-5 text-lime-400 w-full h-full bg-gradient-to-t from-neutral-900 to-neutral-800 rounded-lg shadow-xl backdrop-blur-lg flex overflow-clip items-left justify-end flex-col gap-4">
            <div className="flex flex-col gap-4" ref={consRef}>

            </div>

            <div className="flex">
                <span>
                C:\Dayid&gt;
                </span>
                <input className="text-lime-400 bg-transparent focus:outline-none w-full" onKeyDown={handleKeyDown} placeholder="-h"/>
            </div>

        </div>
    );

}

export default Console;