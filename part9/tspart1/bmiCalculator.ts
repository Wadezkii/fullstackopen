const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / ((height / 100) ** 2);
    if (bmi < 18.5) {
        console.log("Underweight (unhealthy weight)");
    }
    else if (bmi < 25) {
        console.log ("Normal (healthy weight)");
    }
    else if (bmi < 30) {
        console.log ("Overweight (unhealthy weight)");
    }
    else {
        console.log ("Obese (unhealthy weight)");
    }
}

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])
calculateBmi(height, weight);