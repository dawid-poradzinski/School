import SingleByte from '../variable/SingleByte';

const Exch = (args, bytes, setBytes) => {
    let data = CheckExch(args);
    if(data.code === 200)
    {
        ChangeExch(data.change, bytes, setBytes);
    }
    return data.text;
}

const CheckExch = (args) => {
    let data;

    if(args.length > 1 && args[1] === "-H")
    {
        data = '{"code":300, "text":["EXCH arg1 arg2", "Swapping the positions of both arguments"]}';
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
        data = `{"code":200, "text":["Command successful", "Swapped ${args[1]} with ${args[2]}"], "change":["${args[1]}","${args[2]}"]}`;
    }

    return JSON.parse(data);
}

const ChangeExch = (args, bytes, setBytes) => {

    let array = [];

    for(let i = 0; i < 2; i++)
    {
        array.push(
            bytes.find((element) => {
                return element.props.id === args[i];
        }));
    }

    const newBytes = [...bytes];

    newBytes[array[0].props.i] = <SingleByte id={array[0].props.id} binary = {array[1].props.binary} i = {array[0].props.i}></SingleByte>
    newBytes[array[1].props.i] = <SingleByte id={array[1].props.id} binary = {array[0].props.binary} i = {array[1].props.i}></SingleByte>

    setBytes(newBytes);
}

export default Exch;