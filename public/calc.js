const submit = document.getElementById("submit")
const outputWrapper = document.getElementById("outputWrapper")
const output = document.getElementById("output")

function calcAgeByC14(at, mass) {
    const atInMin = at * 60
    const atPerMass = !mass ? atInMin : (mass * 1000) / atInMin
    const a0 = 13.56
    const th = 5730
    let age = Math.round((-Math.log(atPerMass/a0) * (th/Math.log(2))) * 1000) / 1000
    if (at <= 0) {
        age = "an infinite amount of"
    }
    if (age < 0) return "Error: age can't be negative. Check your inputs"
    return `The object is ${age} years old.`
}

submit.addEventListener("click", function() {
    const activityInputVal = document.getElementById("activity").value
    const massInputVal = document.getElementById("mass").value
    output.innerHTML = calcAgeByC14(activityInputVal, massInputVal)
})