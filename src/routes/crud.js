const express = require('express');
const { createPool } = require('mysql');
const router = express.Router();
const conection = require('../views/mysql');




router.get('/agregar',(req,res)=>{
    res.render('../views/front/agregar');
})

router.post('/agregar',async (req,res)=>{
    const {nombre_empleado,edad_empleado,sexo_empleado,id_puesto} = req.body;
    const empleado = {
        nombre_empleado,
        edad_empleado,
        sexo_empleado,
        id_puesto
    }; 
    await conection.query('INSERT INTO empleados SET ? ',[empleado]);

    res.redirect('/crud/lista');
});

router.get('/lista', async(req, res)=>{
    let usuarios = [];
    const empleado = await conection.query('SELECT * FROM empleados');
    for (let i = 0; i < empleado.length; i++) {
        let id = empleado[i].id_puesto;
        let puestos = await conection.query('SELECT * FROM c_puestos WHERE idC_puestos = ?', [id]);
        empleados = {
            id_empleados: empleado[i].id_empleados,
            nombre_empleado: empleado[i].nombre_empleado,
            edad_empleado: empleado[i].edad_empleado,
            sexo_empleado: empleado[i].sexo_empleado,
            id_puesto: puestos[0].puesto,
            sueldo: puestos[0].sueldo,
            departamento: puestos[0].despartamento 
        };
        usuarios.push(empleados);
    }
    res.render('../views/front/lista', { usuarios });
});
/*Se muestra la ventana borrar*/
router.get('/borrar',async(req,res)=>{
    let usuarios = [];
    const empleado = await conection.query('SELECT * FROM empleados');
    for (let i = 0; i < empleado.length; i++) {
        let id = empleado[i].id_puesto;
        let puestos = await conection.query('SELECT * FROM c_puestos WHERE idC_puestos = ?', [id]);
        empleados = {
            id_empleados: empleado[i].id_empleados,
            nombre_empleado: empleado[i].nombre_empleado,
            edad_empleado: empleado[i].edad_empleado,
            sexo_empleado: empleado[i].sexo_empleado,
            id_puesto: puestos[0].puesto,
            sueldo: puestos[0].sueldo,
            departamento: puestos[0].despartamento 
        };
        usuarios.push(empleados);
    }
    res.render('../views/front/borrar', { usuarios });
});
/*Para borrar*/
router.get('/borrar/:id',async(req,res)=>{
    const {id} = req.params;
    await conection.query('DELETE FROM empleados WHERE id_empleados = ?', [id]);
    res.redirect('/crud/borrar');
});
/*para mostrar editar*/
router.get('/edicion',async(req,res)=>{
    let usuarios = [];
    const empleado = await conection.query('SELECT * FROM empleados');
    for (let i = 0; i < empleado.length; i++) {
        let id = empleado[i].id_puesto;
        let puestos = await conection.query('SELECT * FROM c_puestos WHERE idC_puestos = ?', [id]);
        empleados = {
            id_empleados: empleado[i].id_empleados,
            nombre_empleado: empleado[i].nombre_empleado,
            edad_empleado: empleado[i].edad_empleado,
            sexo_empleado: empleado[i].sexo_empleado,
            id_puesto: puestos[0].puesto,
            sueldo: puestos[0].sueldo,
            departamento: puestos[0].despartamento 
        };
        usuarios.push(empleados);
    }
    res.render('../views/front/edicion', { usuarios });
});
/*para editar*/
router.get('/editar/:id',async(req,res)=>{
    const {id} = req.params;
    const usuario =  await conection.query('SELECT * FROM empleados WHERE id_empleados = ?',[id]);
    const pu = usuario[0].id_puesto;
    const puesto = await conection.query('SELECT * FROM c_puestos WHERE idC_puestos = ?', [pu]);
    usuario[0].id_puesto = puesto[0].puesto;
    console.log(usuario[0].id_puesto);
    res.render('../views/front/editar', {usuario: usuario[0]});
});

router.post('/editar/:id',async(req,res)=>{
    const { id } = req.params;
    const {nombre_empleado,edad_empleado,sexo_empleado,id_puesto} = req.body;
    const empleado = {
        nombre_empleado,
        edad_empleado,
        sexo_empleado,
        id_puesto
    };  
    await conection.query('UPDATE empleados set ? WHERE id_empleados = ? ',[empleado,id]);

    res.redirect('/crud/edicion');
});

module.exports = router;