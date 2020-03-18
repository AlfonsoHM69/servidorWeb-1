var login = null
var navegacio = null
var popups = null
var seccioBackofficeUsuaris = null
var seccioFrontendProductes = null

// Aquesta funció s'inicia al carregar la pàgina
async function inicia () {

    // Iniciem els objectes globals
    login = new ObjLogin()
    navegacio = new ObjNavegacio()
    popups = new ObjPopups()
    seccioBackofficeUsuaris = new ObjSeccioBackofficeUsuaris()
    seccioFrontendProductes = new ObjSeccioFrontendProductes()

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

function iniciaSeccio(seccio) {
    switch(seccio) {
    case 'frontendProductes': seccioFrontendProductes.iniciaSeccio(); break
    case 'backofficeUsuaris': seccioBackofficeUsuaris.iniciaSeccio(); break
    default:
    }
}
function mostraMenu (evt) {
    let refBody = document.getElementsByTagName('body')[0],
        refSmall = document.getElementById('frontendMenuMobil'),
        refContainer = document.getElementById('menuContainer'),
        estilContainer = window.getComputedStyle(refContainer, ''),
        midaContainer = parseInt(estilContainer.getPropertyValue('height')),
        altura = - midaContainer + 10

    refBody.style.overflow = 'hidden' // Treure scroll
    refSmall.style.visibility = 'visible'
    refSmall.style.opacity = 1

    refContainer.style.transform =  'translateY(' + altura + 'px)'
}
function amagaMenu (evt) {
    let refBody = document.getElementsByTagName('body')[0],
        refSmall = document.getElementById('frontendMenuMobil'),
        refContainer = document.getElementById('menuContainer')

    refBody.style.overflow = 'auto' // Recuperar scroll

    refSmall.style.opacity = 0
    setTimeout(() => { refSmall.style.visibility = 'hidden' }, 500)

    refContainer.style.transform = 'translateY(0)'
}

