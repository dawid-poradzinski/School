import TryAdd from "../functions/TryAdd";
import TryDiv from "../functions/TryDiv";
import TryNot from "../functions/TryNot";
import SingleByte from '../variable/SingleByte';
const Idiv = (args, bytes, setBytes) => {
    
    let data = CheckIdiv(args);
    
    if(data.code === 200)
    {
        ChangeIdiv(data.change, bytes, setBytes);
    }

    return data.text;
}

const CheckIdiv = (args) => {
    
    let data;

    if(args.Length < 2)
    {
        data = '{"code":400, "text":["To little arguments"]}';
    }
    else if(args[1] === "-H") {
        data = '{"code":300, "text":["IDIV arg", "Divide AL by arg, where both AL and arg are numbers in the range of -128 to 127. Return the quotient in AH and the remainder in AL"]}';
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

const ChangeIdiv = (args, bytes, setBytes) => {

    let data = bytes.find((element) => {
        return element.props.id === args[0];
    });
    
    // AL
    let num1 = bytes[4].props.binary;
    let num2 = data.props.binary;

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

    console.log(flip);

    let array = TryDiv(num1, num2);

    let newAHValue = array[0];
    let newALValue = array[1];

    if(flip)
    {
        newAHValue = FastNeg(newAHValue);
        // newALValue = FastNeg(newALValue);

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

export default Idiv;
