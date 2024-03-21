const TryAdd = (num1, num2) => {

    let final = "";
    let addon = 0;

    for(let c = num2.length-1; c > -1; c--)
    {
        let iNum1 = parseInt(num1[c]);
        let iNum2 = parseInt(num2[c]);

        let iFinal = iNum1 + iNum2 + addon;
        addon = 0;

        if(iFinal > 1) {
            addon = 1;
            iFinal -= 2;
        }

        final = iFinal.toString() + final;
    }

    return [final, addon];
}
export default TryAdd;