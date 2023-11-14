interface BmiValues  {
    height: number,
    weight: number
} 

const parseBmiArguments = (args: string[]): BmiValues => {
    if (args.length !== 2) throw new Error('Incorrect number of arguments')

    const height = Number(args[0]);
    const weight = Number(args[1]);

    if (isNaN(height) || isNaN(weight)) {
        throw new Error('Provided values for height and weight were not numbers.');
    }

    return { height, weight };
}

const calculateBmi = (height: number, weight: number): string => {

    const bmi = (weight / (height ** 2)) * 10000
    console.log(bmi)
    if (bmi < 16 ) {
        return 'Peso bajo (Delgadez severa)'
    } else if (bmi > 16 && bmi < 16.99) {
        return 'Peso bajo (Delgadez moderada)'
    } else if (bmi > 17 && bmi < 18.49) {
        return 'Peso bajo (Delgadez leve)'
    } else if ( bmi > 18.5 && bmi < 24.99) {
        return 'Peso normal (healthy weight)'
    } else if ( bmi > 25 && bmi < 29.99){
        return 'Sobrepeso (Preobesidad)'
    } else if (bmi >= 30 && bmi <= 34.99){
        return 'Obesidad (leve)'
    } else if (bmi >= 35 && bmi <= 39.99) {
        return 'Obesidad (media)'
    } else if (bmi >= 40) {
        return 'Obesidad (morbida)'
    } else{
        return 'No hay respuesta para esos parametros'
    }
}   

const args = process.argv.slice(2);
try {
    const { height, weight } = parseBmiArguments(args);
    const result = calculateBmi(height, weight);
    console.log(result);
} catch (error) {
    console.error(error.message);
}


