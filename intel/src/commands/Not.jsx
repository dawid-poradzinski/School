import TryNot from '../functions/TryNot';
import SingleByte from '../variable/SingleByte';

const Not = (args, bytes, setBytes) => {
    let data = CheckNot(args);
    if(data.code === 200)
    {
        ChangeNot(data.change, bytes, setBytes);
    }
    return data.text;
}

const CheckNot = (args) => {
    
    let data;

    if(args.Length < 2)
    {
        data = '{"code":400, "text":["To little arguments"]}';
    }
    else if(args[1] === "-H") {
        data = '{"code":300, "text":["NOT arg", "Negates 1 to 0 and 0 to 1 in the selected argument"]}';
    }
    else if(!/^[A-D]{1}[H|L]{1}$/g.test(args[1]))
    {
        data = '{"code":400, "text":["Invalid argument"]}';
    }
    else
    {
        data = `{"code":200, "text":["Command successful", "Negated ${args[1]}"], "change":["${args[1]}"]}`;
    }

    return JSON.parse(data);
}

const ChangeNot = (args, bytes, setBytes) => {

    let data = bytes.find((element) => {
        return element.props.id === args[0];
    });

    let num = data.props.binary;

    let final = TryNot(num);

    const newBytes = [...bytes];

    newBytes[data.props.i] = <SingleByte id={data.props.id} binary = {final} i = {data.props.i}></SingleByte>

    setBytes(newBytes);

}

export default Not;
