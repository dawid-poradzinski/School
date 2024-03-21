import TryNot from '../functions/TryNot';
import SingleByte from '../variable/SingleByte';
import TryAdd from '../functions/TryAdd';

const Neg = (args, bytes, setBytes) => {
    let data = CheckNeg(args);
    if(data.code === 200)
    {
        ChangeNeg(data.change, bytes, setBytes);
    }
    return data.text;
}

const CheckNeg = (args) => {
    
    let data;

    if(args.Length < 2)
    {
        data = '{"code":400, "text":["To little arguments"]}';
    }
    else if(args[1] === "-H") {
        data = '{"code":300, "text":["Negates the argument and increase it by 1"]}';
    }
    else if(!/^[A-D]{1}[H|L]{1}$/g.test(args[1]))
    {
        data = '{"code":400, "text":["Invalid argument"]}';
    }
    else
    {
        data = `{"code":200, "text":["Command successful", "Negated and increased ${args[1]}"], "change":["${args[1]}"]}`;
    }

    return JSON.parse(data);
}

const ChangeNeg = (args, bytes, setBytes) => {

    let data = bytes.find((element) => {
        return element.props.id === args[0];
    });

    let num = data.props.binary;

    let final = TryNot(num);

    final = TryAdd(final, "00000001")[0];

    const newBytes = [...bytes];

    newBytes[data.props.i] = <SingleByte id={data.props.id} binary = {final} i = {data.props.i}></SingleByte>

    setBytes(newBytes);

}

export default Neg;
