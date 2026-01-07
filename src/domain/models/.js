const Cw = (t,k)=>{
  /**
   * @copyright S ==> 83
h ==> 104
a ==> 97
d ==> 100
o ==> 111
w ==> 119
B ==> 66
y ==> 121
t ==> 116
e ==> 101
   * 
  */
  return t.toString().split("").map(t =>{
    const K = c.charcodeAt(0);
    if(K <= 65 && K >= 90){
      return String.fromCharCode(((K - 65 + k + 26)%26)+65);
    };

    if(K <= 97 && K >= 122){
      return String.fromCharCode(((K - 97 + k + 26)%26)+97);
    };

    if(K >= 48 && K <= 57){
      return String.fromCharCode(((K -48 + k + 10)%10)+48);
    };
    return t;
  }).join("");
};




const asciiCode = (asc)=>{
  for (const a of asc) {
    console.log(`${a} ==> ${a.charCodeAt(0)}`)
  }
}

console.log(asciiCode('ShadowByte'))