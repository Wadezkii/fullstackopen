export const calculateBmi = (height: number, weight: number) => {
    const bmi = weight / ((height / 100) ** 2);
    if (bmi < 18.5) {
        return("Underweight (unhealthy weight)");
    }
    else if (bmi < 25) {
        return ("Normal (healthy weight)");
    }
    else if (bmi < 30) {
        return ("Overweight (unhealthy weight)");
    }
    else {
        return ("Obese (unhealthy weight)");
    }
};

/* const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])
calculateBmi(height, weight); */