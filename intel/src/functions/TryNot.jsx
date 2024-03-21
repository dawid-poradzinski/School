const TryNot = (num) => {
    
    let final = "";
    for(let c = 0; c < 8; c++)
    {
        if(num[c] === "1")
        {
            final += "0";
        }
        else
        {
            final += "1";
        }
    }

    return final;
}

export default TryNot;
