import TryDiv from '../functions/TryDiv';
import SingleByte from '../variable/SingleByte';

const Div = (args, bytes, setBytes) => {
    
    let data = CheckDiv(args);
    
    if(data.code === 200)
    {
       ChangeDiv(data.change, bytes, setBytes);
    }

    return data.text;
}

const CheckDiv = (args) => {
    
    let data;

    if(args.Length < 2)
    {
        data = '{"code":400, "text":["To little arguments"]}';
    }
    else if(args[1] === "-H") {
        data = '{"code":300, "text":["DIV arg", "Divide AL by arg. Return the quotient in AH and the remainder in AL"]}';
    }
    else if(!/^[A-D]{1}[H|L]{1}$/g.test(args[1]))
    {
        data = '{"code":400, "text":["Invalid argument"]}';
    }
    else
    {
        data = `{"code":200, "text":["Command successful", "Divided AL by ${args[1]}"], "change":["${args[1]}"]}`;
    }

    return JSON.parse(data);
}

const ChangeDiv = (args, bytes, setBytes) => {

    let data = bytes.find((element) => {
        return element.props.id === args[0];
    });

    let num1 = bytes[4].props.binary;
    let num2 = data.props.binary;

    let array = TryDiv(num1, num2);

    let newAHValue = array[0];
    let newALValue = array[1];

    const newBytes = [...bytes];

    newBytes[0] = <SingleByte id={"AH"} binary = {newAHValue} i = {0}></SingleByte>
    newBytes[4] = <SingleByte id={"AL"} binary = {newALValue} i = {4}></SingleByte>

    setBytes(newBytes);
}

export default Div;