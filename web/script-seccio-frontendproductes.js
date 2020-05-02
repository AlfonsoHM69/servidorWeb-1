
class ObjSeccioFrontendProductes {

    constructor () {
    }

    async iniciaSeccio () {
        let refLoading = document.getElementById('productesLoading'),
            refContinguts = document.getElementById('productesContinguts'),
            objRebut = null,
            valor = null,
            codiHTML = '',
            cntProducte = 0

        // Amaguem els continguts actuals i mostrem la càrrega
        refContinguts.style.display = 'none'
        refLoading.style.display = 'flex'

        // Demanem el llistat de productes al servidor
        objRebut = await promiseCallServer('POST', '/call/llistatProductes', {})

        // Transformem l'objecte rebut en codi HTML
        if (objRebut.resultat === 'ok') {
            for (cntProducte = 0; cntProducte < objRebut.missatge.length; cntProducte = cntProducte + 1) {
                valor = objRebut.missatge[cntProducte]
                codiHTML = codiHTML + '<div class="producte" onclick=\'navegacio.canviaSeccio("frontendProducte&' + valor.id + '")\'>'
                codiHTML = codiHTML + '<img src="' + valor.imatge + '" width="200" />'
                codiHTML = codiHTML + '<h4>' + valor.nom +'</h4>'
                codiHTML = codiHTML + '<div>' + valor.descripcio +'</div>'
                codiHTML = codiHTML + '<div>' + valor.preu +' €</div>'
                codiHTML = codiHTML + '<div>' + valor.nou +' </div>'
                codiHTML = codiHTML + '<hr/>'
            }
        }

        // Amaguem la càrrega i mostrem el llistat de productes
        refContinguts.innerHTML = codiHTML
        refContinguts.style.display = 'flex'
        refLoading.style.display = 'none'
    }
}