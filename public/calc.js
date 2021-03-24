const submit = document.getElementById("submit")
const outputWrapper = document.getElementById("outputWrapper")
const output = document.getElementById("output")
const actUnits = document.getElementById("activityUnitSelect")
const massUnits = document.getElementById("massUnitSelect")

function calcAgeByC14(at, mass) {
    // half time of C14
    const th = 5730

    // transform input to activity / minute
    let atInMin = at

    if (actUnits.value !== "dpm") {
        atInMin *= 60
    }
    
    // if mass is given, calculate unit into grams
    const massHandler = function() {
        if (!mass || massUnits.value === "gram") return atInMin;
        if (massUnits.value === "milligram") return atInMin / (mass / 1000)
        if (massUnits.value === "kilogram") return atInMin / (mass * 1000)
    }

    // converts half time to minutes and calculates lambda
    const lambda = Math.log(2) / (th * 525600)

    // number of C14-particles by converting baseline of ~12g/mol C12-particles to mol, then to particles, then using the frequency ratio of C12 and C14 to C14-particles
    const C14N = (1/12) * (6.022 * Math.pow(10, 23)) * (1.2 * Math.pow(10, -12))

    // activity = lambda * N
    const a0 = lambda * C14N
    console.log(a0)

    let age = Math.round((((Math.log(massHandler()/a0) * th) / -Math.log(2)) * 1000) / 1000)
    if (at <= 0) {
        age = "an infinite amount of"
        return `The object is ${age} years old. It might not be dead yet, please double check`
    }
    if (age < 0) return "Error: age can't be negative. Check your inputs"
    return `The object is ${age} years old.`
}

submit.addEventListener("click", function() {
    const activityInputVal = document.getElementById("activity").value
    const massInputVal = document.getElementById("mass").value
    output.innerHTML = calcAgeByC14(activityInputVal, massInputVal)
})