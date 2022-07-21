let a = {
    num: 200
}

function fn(a) {
    a.num = 300
}
fn(a)
console.log(a.num)
