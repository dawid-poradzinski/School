import SingleByte from '../variable/SingleByte';
const And = (args, bytes, setBytes) => {
    let data = CheckAnd(args);
    if(data.code === 200)
    {
        ChangeAnd(data.change, bytes, setBytes);
    }
    return data.text;
}

const CheckAnd = (args) => {

    let data;

    if(args.length > 1 && args[1] === "-H")
    {
        data = '{"code":300, "text":["AND arg1 arg2", "Bitwise AND operator. If bits from arg1 and arg2 are both 1, the result is 1; otherwise, it is 0"]}';
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
        data = `{"code":200, "text":["Command successful", "Used AND on ${args[1]} with ${args[2]} and saved to ${args[1]}"], "change":["${args[1]}","${args[2]}"]}`;
    }

    return JSON.parse(data);
}

const ChangeAnd = (args, bytes, setBytes) => {

    let array = [];

    for(let i = 0; i < 2; i++)
    {
        array.push(
            bytes.find((element) => {
                return element.props.id === args[i];
        }));
    }

    let final = "";

    for(let c = 0; c < 8; c++)
    {
        let num1 = parseInt(array[0].props.binary[c]);
        let num2 = parseInt(array[1].props.binary[c]);

        let iFinal = num1 + num2;

        if(iFinal === 2)
        {
            final += "1";
        }
        else
        {
            final += "0";
        }
    }

    const newBytes = [...bytes];

    newBytes[array[0].props.i] = <SingleByte id={array[0].props.id} binary = {final} i = {array[0].props.i}></SingleByte>

    setBytes(newBytes);
}

export default And;
