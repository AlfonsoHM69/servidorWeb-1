var login = null
var navegacio = null
var popups = null
var seccioBackofficeUsuaris = null
var seccioFrontendProductes = null
var seccioFrontendProducte = null

// Aquesta funció s'inicia al carregar la pàgina
async function inicia () {

    // Iniciem els objectes globals
    login = new ObjLogin()
    navegacio = new ObjNavegacio()
    popups = new ObjPopups()
    seccioBackofficeUsuaris = new ObjSeccioBackofficeUsuaris()
    seccioFrontendProductes = new ObjSeccioFrontendProductes()
    seccioFrontendProducte = new ObjSeccioFrontendProducte()

    // Inicia les funcions de navegació HTML5
    navegacio.inicia()

    // Fem que els botons de navegació endavant i endarrera mostrin el canvi de secció
    window.onpopstate = function (evt) {
        if (evt.state === null) {
            navegacio.mostraSeccio('frontendHome')
        } else {
            navegacio.mostraSeccio(evt.state.html)
        }
    }

    // Si tenim guardat un usuari i un token intentem identificar-lo
    await login.autenticaAmbToken()
}

function iniciaSeccio(seccio, id) {
    switch(seccio) {
    case 'frontendProductes': seccioFrontendProductes.iniciaSeccio(); break
    case 'frontendProducte':  seccioFrontendProducte.iniciaSeccio(id); break
    case 'backofficeUsuaris': seccioBackofficeUsuaris.iniciaSeccio(); break
    default:
    }
}