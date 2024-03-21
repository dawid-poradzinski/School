import SingleByte from '../variable/SingleByte';
import TryAdd from '../functions/TryAdd';
const Add = (args, bytes, setBytes) => {
    let data = CheckAdd(args);
    if(data.code === 200)
    {
        ChangeAdd(data.change, bytes, setBytes);
    }
    return data.text;
}

const CheckAdd = (args) => {

    let data;

    if(args.length > 1 && args[1] === "-H")
    {
        data = '{"code":300, "text":["ADD arg1 arg2", "Addition operator. Adds two arguments. Overflow after 255. The result is then saved to arg1"]}';
    }
    else if(args.length < 3)
    {
        data = '{"code":400, "text":["To little arguments"]}';
    }
    else if(!/^[A-D]{1}[H|L]{1}$/g.test(args[1]) || !/^[A-D]{1}[H|L]{1}$/g.test(args[2]))
    {
        data = '{"code":400, "text":["Invalid arguments"]}';
    }
    else
    {
        data = `{"code":200, "text":["Command successful", "Added ${args[2]} to ${args[1]} and saved to ${args[1]}"], "change":["${args[1]}","${args[2]}"]}`;
    }

    return JSON.parse(data);
}

const ChangeAdd = (args, bytes, setBytes) => {

    let array = [];

    for(let i = 0; i < 2; i++)
    {
        array.push(
            bytes.find((element) => {
                return element.props.id === args[i];
        }));
    }

    let final = TryAdd(array[0].props.binary,array[1].props.binary)[0];

    const newBytes = [...bytes];

    newBytes[array[0].props.i] = <SingleByte id={array[0].props.id} binary = {final} i = {array[0].props.i}></SingleByte>

    setBytes(newBytes);
}

export default Add;