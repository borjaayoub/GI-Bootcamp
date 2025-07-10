const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

colors.forEach((item, idx)=>{
  console.log(`${idx+1}# choice is ${item}`)
})

if(colors.some((item) => item === 'Violet')){
  console.log("Yeah")
}else{
  console.log("No..")
}
