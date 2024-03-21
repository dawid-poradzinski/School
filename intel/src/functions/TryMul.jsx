import TryAdd from "../functions/TryAdd";

const TryMul = (num1, num2) => {

    let spacesAL = "";
    let newALValue = "00000000";
    let newAHValue = "00000000";
    for(let i = 7; i > -1; i--)
    {
        let finalAL = spacesAL;
        let finalAH = "";

        if(num1[i] === "1")
        {
            let spacesAH = "";
            for(let j = 7; j > -1; j--)
            {
                if(j > 6-i)
                {
                    finalAL = num2[j] + finalAL;
                    spacesAH += "0";
                }
                else
                {
                    finalAH = num2[j] + finalAH;
                }
            }
            finalAH = spacesAH + finalAH;

            let ALVal = TryAdd(newALValue, finalAL);
            newALValue = ALVal[0];
            
            if(ALVal[1] === 1)
            {
                newAHValue = TryAdd(newAHValue, "00000001")[0];
            }
            newAHValue = TryAdd(newAHValue, finalAH)[0];
        }
        spacesAL += "0";
    }

    return [newAHValue, newALValue];
    
}

export default TryMul;