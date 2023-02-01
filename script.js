async function buscaEndereco(CEP) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${CEP}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente.');
        }
        var cidade = document.getElementById('cidade');
        var estado = document.getElementById('estado');
        var logradouro = document.getElementById('endereco');
        var bairro = document.getElementById('bairro');

        cidade.value = consultaCEPConvertida.localidade;
        estado.value = consultaCEPConvertida.uf;
        logradouro.value = consultaCEPConvertida.logradouro;
        bairro.value = consultaCEPConvertida.bairro;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch(erro) {
        console.log(erro);
        mensagemErro.innerHTML = `<br><p>CEP inválido. Tente novamente.</p><br>`
    }
}

var CEP = document.getElementById('cep');
CEP.addEventListener('focusout', () => buscaEndereco(CEP.value));