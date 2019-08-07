import PubSub from 'pubsub-js';

export default class TratadorErros {
    publicaErros(objetoErros) {
        for (var i = 0; i < Object.keys(objetoErros).length; i++) {
            // objetoErros[campo com erro]
            var erro = objetoErros[Object.keys(objetoErros)[i]];
            erro["field"] = Object.keys(objetoErros)[i];
            PubSub.publish("erro-validacao-autor", erro);
        }
    }
}