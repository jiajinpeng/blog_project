function log(time) {
    return new Promise((resolve, reject)=> {
        setTimeout(function(){
           console.log(time)
           resolve()
        }, time)
    })
}

async function fun() {
    await log(5000)
    await log(10000)
    log(1000)
    console.log(1)
}

fun()