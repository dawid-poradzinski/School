const TrySub = (num1, num2) => {


    let length = num1.length - num2.length;
    if(length !== 0)
    {
        for(let i = 0; i < length; i++)
        {
            num2 = "0" + num2;
        }
    }

    let addon = 0;

    let final = "";

    for(let c = num2.length-1; c > -1; c--)
    {
        let iNum1 = parseInt(num1[c]);
        let iNum2 = parseInt(num2[c]);

        let iFinal = iNum1 - iNum2 - addon;

        addon = 0;

        if(iFinal < 0)
        {
            addon = 1;
            iFinal += 2;
        }

        final = iFinal.toString() + final;
    }

    return [final, addon];
}

export default TrySub;
