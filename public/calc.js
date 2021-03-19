const submit = document.getElementById("submit")
const outputWrapper = document.getElementById("outputWrapper")
const output = document.getElementById("output")
const actUnits = document.getElementById("activityUnitSelect")
const massUnits = document.getElementById("massUnitSelect")

function calcAgeByC14(at, mass) {

    // tranform input to activity / minute
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

    const a0 = 16
    const th = 5730
    let age = Math.round((((Math.log(a0/massHandler()) / Math.log(2)) * th) * 1000) / 1000)
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