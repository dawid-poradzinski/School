import TrySub from '../functions/TrySub';

const TryDiv = (num1, num2) => {
    
    // what if div by 0?
    if(parseInt(num2) === 0)
    {
        return ["00000000", "00000000"];
    }

    // if num1 < num2 return num1
    if(parseInt(num1) < parseInt(num2))
    {
        return ["00000000", num1];
    }

    let startOfNum1 = -1;
    let startOfNum2 = -1;

    // FIND START
    for(let i = 0; i < 8; i++)
    {
        if(startOfNum1 === -1 && num1[i] === "1")
            startOfNum1 = i;

        if(startOfNum2 === -1 && num2[i] === "1")
            startOfNum2 = i

        if(startOfNum1 !== -1 && startOfNum2 !== -1)
            break;
    }

    num2 = num2.slice(startOfNum2);

    let avToAdd = 8 - startOfNum1 - num2.length;

    let sub;

    let newString = num1.slice(startOfNum1, startOfNum1 + num2.length);

    let wynik = "";


    while(avToAdd > -1)
    {

        if(parseInt(newString) < parseInt(num2))
        {
            wynik += "0";
        }
        else
        {
            sub = TrySub(newString, num2);
            newString = parseInt(sub[0]).toString();
            wynik += "1";
        }

        if(avToAdd !== 0)
        {
            newString += num1[8-avToAdd];
        }
        avToAdd--;
    }    

    let s = 8 - wynik.length;
    for(let c = 0; c < s; c++)
    {
        wynik = "0" + wynik;
    }

    s = 8 - newString.length;
    for(let c = 0; c < s; c++)
    {
        newString = "0" + newString;
    }

    return [wynik, newString];
}

export default TryDiv;

// 01111 - 5
// 1011 - 4
// =>
// 0001111 - 7
// 001011 - 6