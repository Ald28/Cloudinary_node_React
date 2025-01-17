const db = require('../config/conexion');

//crear celular
const crearCelular = (titulo, descripcion, imagen, callback) =>{
    const sql = 'insert into celulares (titulo, descripcion, imagen) values (?,?,?)';
    db.query(sql, [titulo, descripcion, imagen], (err, result) => {
        if(err) throw err;
        callback(null, result);
    });
}

//actualizar celular
const actualizarCelular = (id, titulo, descripcion, imagen, callback) =>{
    const sql = 'update celulares set titulo=?, descripcion=?, imagen=? where id=?';
    db.query(sql, [titulo, descripcion, imagen, id], (err, result) => {
        if(err) throw err;
        callback(null, result);
    });
}

//eliminar celular
const eliminarCelular = (id, callback) =>{
    const sql = 'delete from celulares where id=?';
    db.query(sql, [id], (err, result) => {
        if(err) throw err;
        callback(null, result);
    });
}

//mostrar todos los celulares
const mostrarCelulares = (callback) =>{
    const sql = 'select * from celulares';
    db.query(sql, (err, result) => {
        if(err) throw err;
        callback(null, result);
    });
}

//mostrar celular por id
const mostrarCelularId = (id, callback) =>{
    const sql = 'select * from celulares where id=?';
    db.query(sql, [id], (err, result) => {
        if(err) throw err;
        callback(null, result);
    });
}

module.exports = {crearCelular, actualizarCelular, eliminarCelular, mostrarCelularId, mostrarCelulares};