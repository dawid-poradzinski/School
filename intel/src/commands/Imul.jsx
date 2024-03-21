import TryAdd from "../functions/TryAdd";
import TryMul from "../functions/TryMul";
import TryNot from "../functions/TryNot";
import SingleByte from '../variable/SingleByte';
const Imul = (args, bytes, setBytes) => {
    
    let data = CheckImul(args);
    
    if(data.code === 200)
    {
        ChangeImul(data.change, bytes, setBytes);
    }

    return data.text;
}

const CheckImul = (args) => {
    
    let data;

    if(args.Length < 2)
    {
        data = '{"code":400, "text":["To little arguments"]}';
    }
    else if(args[1] === "-H") {
        data = '{"code":300, "text":["IMUL arg", "Multiply AL by arg, where both are a number in the range of -128 to 127. Return the 16-bit result with the high byte in AH and the low byte in AL"]}';
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

const ChangeImul = (args, bytes, setBytes) => {

    let data = bytes.find((element) => {
        return element.props.id === args[0];
    });
    
    let num1 = data.props.binary;
    let num2 = bytes[4].props.binary;

    let flip = false;

    if(num1[0] === "1")
    {
        num1 = FastNeg(num1);
        flip = !flip;
    }
    if(num2[0] === "1")
    {
        num2 = FastNeg(num2);
        flip = !flip;
    }

    let array = TryMul(num1, num2);

    let newAHValue = array[0];
    let newALValue = array[1];

    if(flip)
    {
        newAHValue = TryNot(newAHValue);
        newALValue = TryNot(newALValue);

        array = TryAdd(newALValue, "00000001");

        newALValue = array[0];

        if(array[1] === 1)
        {
            newAHValue = TryAdd(newAHValue, "00000001")[0];
        }
    }


    const newBytes = [...bytes];

    newBytes[0] = <SingleByte id={"AH"} binary = {newAHValue} i = {0}></SingleByte>
    newBytes[4] = <SingleByte id={"AL"} binary = {newALValue} i = {4}></SingleByte>

    setBytes(newBytes);
}

const FastNeg = (num) => {
    num = TryNot(num);
    num = TryAdd(num, "00000001")[0];
    return num;
}
export default Imul;
