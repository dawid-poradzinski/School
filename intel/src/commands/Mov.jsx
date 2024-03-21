import SingleByte from '../variable/SingleByte';

const Mov = (args, bytes, setBytes) => {
    let data = CheckMov(args);
    if(data.code === 200)
    {
        changeMov(data.change, bytes, setBytes);
    }
    return data.text;
}

const CheckMov = (args) => {
    let data;

    if(args.length > 1 && args[1] === "-H")
    {
        data = '{"code":300, "text":["MOV arg1 arg2", "Moving data from arg2 to arg1"]}';
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
        data = `{"code":200, "text":["Command successful", "Moved ${args[2]} to ${args[1]}"], "change":["${args[1]}","${args[2]}"]}`;
    }

    return JSON.parse(data);
}

const changeMov = (args, bytes, setBytes) => {

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

    setBytes(newBytes);
}

export default Mov;