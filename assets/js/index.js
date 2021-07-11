const cpfIpt = document.querySelector("#cpfIpt");
const validarBtn = document.querySelector("#btn-validar")
const resultado = document.querySelector("#resultado")

validarBtn.addEventListener("click",validar)

function validar(e){
    const valor = cpfIpt.value
    const cpfLimpo = limparCPF(valor);
    let [corpo, digitos] = retiraDigitos(cpfLimpo)
    let digitoGerado = calcularDigitoUm(corpo.split(''))
    corpo += digitoGerado 
    digitoGerado = digitoGerado.toString()
    digitoGerado += calcularDigitoDois(corpo.split(''))
    if (digitos==digitoGerado) {
        resultado.innerHTML = "CPF válido"
    }else{
        resultado.innerHTML = "CPF inválido"
    }
}

function limparCPF(valor){
    valor = valor.split('');
    valor = valor.reduce((acumulador, valor) =>{
        if (valor != '.' && valor != '-'){
            acumulador.push(valor);
        }
        return acumulador;
    },[])
    return valor.join('');
}

function retiraDigitos(valor){
    let corpo = valor.substring(0,valor.length-2)
    let digitos = valor.substring(valor.length-2,valor.length)
    return [corpo,digitos]
}

function calcularDigitoUm(valor){
    let multiplicador = 10;
    valor = valor.reduce((acumulador, valor) =>{
       let resultado =  valor * multiplicador;
       multiplicador--;
       return acumulador+resultado;
    },0)
    return 11-(valor % 11)
}

function calcularDigitoDois(valor){
    let multiplicador = 11;
    valor = valor.reduce((acumulador, valor) =>{
       let resultado =  valor * multiplicador;
       multiplicador--;
       return acumulador+resultado;
    },0)
    return 11-(valor % 11)
}