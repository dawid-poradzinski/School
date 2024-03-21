import TryMul from '../functions/TryMul';
import SingleByte from '../variable/SingleByte';
const Mul = (args, bytes, setBytes) => {
    
    let data = CheckMul(args);
    
    if(data.code === 200)
    {
       ChangeMul(data.change, bytes, setBytes);
    }

    return data.text;
}

const CheckMul = (args) => {
    
    let data;

    if(args.Length < 2)
    {
        data = '{"code":400, "text":["To little arguments"]}';
    }
    else if(args[1] === "-H") {
        data = '{"code":300, "text":["MUL arg", "Multiply AL by arg. Return the 16-bit result with the high byte in AH and the low byte in AL"]}';
    }
    else if(!/^[A-D]{1}[H|L]{1}$/g.test(args[1]))
    {
        data = '{"code":400, "text":["Invalid argument"]}';
    }
    else
    {
        data = `{"code":200, "text":["Command successful", "Multiplied ${args[1]} by AL"], "change":["${args[1]}"]}`;
    }

    return JSON.parse(data);
}

const ChangeMul = (args, bytes, setBytes) => {

    let data = bytes.find((element) => {
        return element.props.id === args[0];
    });

    let num1 = bytes[4].props.binary;
    let num2 = data.props.binary;

    let array = TryMul(num1, num2);

    let newAHValue = array[0];
    let newALValue = array[1];

    const newBytes = [...bytes];

    newBytes[0] = <SingleByte id={"AH"} binary = {newAHValue} i = {0}></SingleByte>
    newBytes[4] = <SingleByte id={"AL"} binary = {newALValue} i = {4}></SingleByte>

    setBytes(newBytes);
}

export default Mul;