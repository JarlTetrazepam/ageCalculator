const submit = document.getElementById("submit")
const outputWrapper = document.getElementById("outputWrapper")
const output = document.getElementById("output")

function calcAgeByC14(at, mass) {
    let atInMin = at / 60
    let atPerMass = !mass ? atInMin : (mass * 1000) / atInMin
    let a0 = 13.56
    let th = 5730
    let age = Math.round((-Math.log(atPerMass/a0) * (th/Math.log(2))) * 1000) / 1000
    if (at <= 0) return "an infinite amount of"
    if (age < 0) return RangeError
    return age
}

submit.addEventListener("click", function() {
    const activityInputVal = document.getElementById("activity").value
    const massInputVal = document.getElementById("mass").value
    outputWrapper.style.opacity = 1
    output.innerHTML = calcAgeByC14(activityInputVal, massInputVal)
})