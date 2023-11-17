interface BmiValues  {
    heightInCm: number,
    weightInKg: number
} 

export const parseBmiArguments = (
    height: number,
    weight: number
  ): BmiValues => {
    if (!isNaN(height) && !isNaN(weight)) {
      return {
        heightInCm: height,
        weightInKg: weight
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };

export const calculateBmi = (height: number, weight: number): string => {

    const bmi = (weight / (height ** 2)) * 10000;
    
    if (bmi < 16 ) {
        return 'Peso bajo (Delgadez severa)';
    } else if (bmi > 16 && bmi < 16.99) {
        return 'Peso bajo (Delgadez moderada)';
    } else if (bmi > 17 && bmi < 18.49) {
        return 'Peso bajo (Delgadez leve)';
    } else if ( bmi > 18.5 && bmi < 24.99) {
        return 'Peso normal (healthy weight)';
    } else if ( bmi > 25 && bmi < 29.99){
        return 'Sobrepeso (Preobesidad)';
    } else if (bmi >= 30 && bmi <= 34.99){
        return 'Obesidad (leve)';
    } else if (bmi >= 35 && bmi <= 39.99) {
        return 'Obesidad (media)';
    } else if (bmi >= 40) {
        return 'Obesidad (morbida)';
    } else{
        return 'No hay respuesta para esos parametros';
    }
};   



