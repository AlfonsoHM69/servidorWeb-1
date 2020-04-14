'use strict'
class Obj {

    constructor () {
    }

    // Inicia l'objecte
    init () {
        // TODO
    }

    async llistat (db, utils, data, result) {

        let sql = '',
            taulaProductesExisteix = false,
            taula = null
    
        // Forçem una espera al fer login amb codi, perquè es vegi la càrrega (TODO: esborrar-ho)
        await utils.promiseWait(3000) 
        
        // Mira si la taula "productes" existeix
        try {
            taulaProductesExisteix = await db.promiseTableExists('productes')
        } catch (e) {
            console.warn('Avis, funció login: la taula "productes" no existeix')
        }
    
        // Si la taula "productes" no existeix, en crea una i afegeix productes
        if (!taulaProductesExisteix) {
            try {
                sql = 'CREATE TABLE productes (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, nom VARCHAR(50) NOT NULL, descripcio TEXT, preu INT(6), imatge VARCHAR(255),nou TEXT)'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, nou) VALUES ("Viatge a Madrid", "Capital central Espanya", 50, "/web/imatges/madrid.jpg", "-200 €")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, nou) VALUES ("Viatge a Barcelona", "Regió de Catalunya a Espanya", 75, "/web/imatges/barcelona.jpeg", "-200 €")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, nou) VALUES ("Viatge a Benidorm", "Balneari costaner a la costa est de Espanya", 100, "/web/imatges/benidorm.jpg", "-200 €")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, nou) VALUES ("Viatge a Valencia", "Es situa en la costa sud-est de Espanya", 50, "/web/imatges/valencia.jpeg", "-150 €")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, nou) VALUES ("Viatge a Sevilla", "Es la capital de la regió Andalusia", 50, "/web/imatges/sevilla.jpg", "-200 €")'
                await db.promiseQuery(sql)
                sql = 'INSERT INTO productes (nom, descripcio, preu, imatge, nou) VALUES ("Viatge a Malaga", "Es una ciutat portuaria en la Costa del Sol, en el sud de España", 45, "/web/imatges/malaga.jpg", "-150 €")'
                await db.promiseQuery(sql)
            } catch (e) {
                console.error(e)
                return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: no s'ha pogut crear la taula productes"})  
            }
        }
    
        // Demana la informació de productes
        try {
            sql = 'SELECT * FROM productes'
            taula = await db.promiseQuery(sql)
        } catch (e) {
            console.error(e)
            return result.json({ resultat: "ko", missatge: "Error, funció llistatProductes: ha fallat la crida a les dades"})  
        }   
    
        // Si l'usuari existeix i s'ha identificat correctament (amb codi o amb token) retornem 'ok'
        if (typeof taula === 'object' && typeof taula.length === 'number') {
            result.json({ resultat: "ok", missatge: taula })
        } else {
            result.json({ resultat: "ko", missatge: [] })
        }
    }
}

// Export
module.exports = Obj

