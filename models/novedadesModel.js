var pool = require('./bd');

/* sirve para listar las novedades */
async function getNovedades() {
    var query = 'select * from novedades';
    var rows = await pool.query(query);
    return rows;
  
}

/* sirve para borrar una novedad by el id */

async function deleteNovedadesById(id) {
    var query = 'delete from novedades where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
  
}

/* para agregar una novedad en la tabla de novedades*/

async function insertNovedad(obj) {
    try {
        var query = "insert into novedades set ?";
        var rows = await pool.query(query, [obj])
        return rows;

    }catch (error) {
        console.log(error);
        throw error;
        }//cierra catch
}// cierra insert


module.exports = { getNovedades, deleteNovedadesById, insertNovedad }