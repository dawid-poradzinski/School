// xor => x_or = 2
// or => x_or = 1
const TryOr = (num1, num2, x_or) => {
   let final = "";

   for(let c = 0; c < 8; c++)
   {

    let iNum1 = parseInt(num1[c]);
    let iNum2 = parseInt(num2[c]);
    let iFinal = iNum1 + iNum2;

    if(iFinal === 2)
    {
        iFinal -= x_or;
    }

    final += iFinal.toString();
   }

   return final;
}

export default TryOr;
