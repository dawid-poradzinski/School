import TrySub from '../functions/TrySub';
import SingleByte from '../variable/SingleByte';

const Dec = (args, bytes, setBytes) => {
    let data = CheckDec(args);
    if(data.code === 200)
    {
        ChangeDec(data.change, bytes, setBytes);
    }
    return data.text;
}

const CheckDec = (args) => {
    
    let data;

    if(args.Length < 2)
    {
        data = '{"code":400, "text":["To little arguments"]}';
    }
    else if(args[1] === "-H") {
        data = '{"code":300, "text":["DEC arg", "Subtracting 1 from the selected argument"]}';
    }
    else if(!/^[A-D]{1}[H|L]{1}$/g.test(args[1]))
    {
        data = '{"code":400, "text":["Invalid argument"]}';
    }
    else
    {
        data = `{"code":200, "text":["Command successful", "Decresed ${args[1]} by 1"], "change":["${args[1]}"]}`;
    }

    return JSON.parse(data);
}

const ChangeDec = (args, bytes, setBytes) => {

    let data = bytes.find((element) => {
        return element.props.id === args[0];
    });

    let num = data.props.binary;

    let final = TrySub(num, "00000001")[0];

    const newBytes = [...bytes];

    newBytes[data.props.i] = <SingleByte id={data.props.id} binary = {final} i = {data.props.i}></SingleByte>

    setBytes(newBytes);

}

export default Dec;
