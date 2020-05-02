class ObjSeccioFrontendProducte {

    constructor () {
    }

    async iniciaSeccio (idProducte) {
        let refLoading = document.getElementById('producteLoading'),
            refContinguts = document.getElementById('producteContinguts'),
            objRebut = null,
            valor = null,
            codiHTML = '',
            cntProducte = 0

        // Amaguem els continguts actuals i mostrem la càrrega
        refContinguts.style.display = 'none'
        refLoading.style.display = 'flex'

        // Demanem el llistat de productes al servidor
        objRebut = await promiseCallServer('POST', '/call/llistatProductes', { id: idProducte })

        // Transformem l'objecte rebut en codi HTML
        if (objRebut.resultat === 'ok' && objRebut.missatge.length === 1) {
            valor = objRebut.missatge[0]
            codiHTML = codiHTML + '<div class="detall" onclick=\'navegacio.canviaSeccio("frontendProducte&' + cntProducte + '")\'>'
            codiHTML = codiHTML + '<br>'
            codiHTML = codiHTML + '<img src="' + valor.imatge + '" width="500" />'
            codiHTML = codiHTML + '<h3>' + valor.nom +'</h3>'
            codiHTML = codiHTML + '<div>' + valor.descripcio +'</div>'
            codiHTML = codiHTML + '<div>' + valor.preu +' €</div>'
            codiHTML = codiHTML + '</div>'
        }

        // Amaguem la càrrega i mostrem el llistat de productes
        refContinguts.innerHTML = codiHTML
        refContinguts.style.display = 'flex'
        refLoading.style.display = 'none'
    }
}