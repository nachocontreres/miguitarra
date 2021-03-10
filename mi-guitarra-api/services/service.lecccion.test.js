const lecciones = require("./service.leccion");
const leccionesJSON = require("./lecciones.json");
const leccionEsperada = require('./leccionEsperada.json');
let leccion2 = require('./retrieveLeccion.json');
const LeccionModel = require("../models/model.leccion");

let nuevaLeccion = new LeccionModel("Lección test jest", "descripcion test", "https://www.youtube.com/watch?v=PDLKmXJA2yk", "https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf", "Principiante");
const expectedResult = JSON.stringify(lecciones.todas());

test('Deberia devolver la lista de lecciones correctamente', () => {
    expect(expectedResult).toEqual(JSON.stringify(leccionesJSON.lecciones));
});

test('Deberia devolver titulo de la leccion para el id correspondiente', () => {
    expect(lecciones.retrieve('l1').titulo).toBe("Lección 2");
});

test('Deberia devolver la leccion para el id correspondiente', () => {
    expect(lecciones.retrieve('l1')).toEqual(leccion2);
});

test('Deberia devolver la descripción de la leccion para el id correspondiente', () => {
    expect(lecciones.retrieve('l1').descripcion).toBe("Cambio de cuerdas, afinación y acordes");
});

test('Deberia devolver el URL para la leccion para el id correspondiente', () => {
    expect(lecciones.retrieve('l1').url).toBe("https://www.youtube.com/watch?v=PDLKmXJA2yk");
});

test('Deberia devolver la URL de la tablatura para la leccion para el id correspondiente', () => {
    expect(lecciones.retrieve('l1').urlTablatura).toBe("https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf");
});

test('Deberia devolver la dificultad de la leccion para el id correspondiente', () => {
    expect(lecciones.retrieve('l1').dificultad).toBe("Principiante");
});

test('Deberia crearse correctamente la leccion', () => {
    lecciones.create(nuevaLeccion);
    expect(lecciones.retrieve('l9')).toEqual(leccionEsperada);
});

test('Error en la verificación del título de la lección por ser demasiado corto', () => {
    let recibido;
    try {
        lecciones.create(new LeccionModel("Le", "descripcion test", "https://www.youtube.com/watch?v=PDLKmXJA2yk", "https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf", "Principiante"));
    }
    catch (error) {
        recibido = error;
    }
    esperado = { "message": { "titulo": "El título es demasiado corto" }, "name": "ValidationError" };
    expect(recibido).toEqual(esperado);
});

test('Error en la verificación del título de la lección por ser demasiado largo', () => {
    let recibido;
    try {
        lecciones.create(new LeccionModel("Lorem ipsum dolor sit amet, consect.", "descripcion test", "https://www.youtube.com/watch?v=PDLKmXJA2yk", "https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf", "Principiante"));
    }
    catch (error) {
        recibido = error;
    }
    esperado = { "message": { "titulo": "El largo del título no puede superar los 35 caracteres." }, "name": "ValidationError" };
    expect(recibido).toEqual(esperado);
});

test('Error en la verificación de la descripción de la lección por ser demasiado corta', () => {
    let recibido;
    try {
        lecciones.create(new LeccionModel("Leccion", "des", "https://www.youtube.com/watch?v=PDLKmXJA2yk", "https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf", "Principiante"));
    }
    catch (error) {
        recibido = error;
    }
    esperado = { "message": { "descripcion": "La descripción es demasiado corta" }, "name": "ValidationError" };
    expect(recibido).toEqual(esperado);
});

test('Error en la verificación de la descripción de la lección por ser demasiado larga', () => {
    let recibido;
    try {
        lecciones.create(new LeccionModel("Leccion", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ex arcu, porta eget risus quis, hendrerit mattis tortor. In venenatis ut lectus quis dictum. Integer vulputate, augue vitae condimentum fermentum, nunc nisi cursus lorem, et aliquam mi eros sed nulla. Aliquam orci turpis, consectetur nec egestas ut, aliquam nec ante. Suspendisse vulputate scelerisque velit vel suscipit. Vestibulum sed tempor enim, vel sodales est. Nam eget auctor lacus. Donec eget placerat purus. Sed tincidunt metus.", "https://www.youtube.com/watch?v=PDLKmXJA2yk", "https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf", "Principiante"));
    }
    catch (error) {
        recibido = error;
    }
    esperado = { "message": { "descripcion": "El largo de la descripción no puede superar los 500 caracteres." }, "name": "ValidationError" };
    expect(recibido).toEqual(esperado);
});

test('Error en la verificación de la url del video por ser demasiado corta', () => {
    let recibido;
    try {
        lecciones.create(new LeccionModel("Leccion", "Descripción de la lección.", "http", "https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf", "Principiante"));
    }
    catch (error) {
        recibido = error;
    }
    esperado = { "message": { "url": "La url es demasiado corta" }, "name": "ValidationError" };
    expect(recibido).toEqual(esperado);
});

test('Error en la verificación de la url del video por ser demasiado larga', () => {
    let recibido;
    try {
        lecciones.create(new LeccionModel("Leccion", "Descripción de la lección.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ex arcu, porta eget risus quis, hendrerit mattis tortor. In venenatis ut lectus quis dictum. Integer vulputate, augue vitae condimentum fermentum, nunc nisi cursus lorem, et aliquam mi eros sed nulla. Aliquam orci turpis, consectetur nec egestas ut, aliquam nec ante. Suspendisse vulputate scelerisque velit vel suscipit.", "https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf", "Principiante"));
    }
    catch (error) {
        recibido = error;
    }
    esperado = { "message": { "url": "El largo de la url no puede superar los 200 caracteres." }, "name": "ValidationError" };
    expect(recibido).toEqual(esperado);
});

test('Error en la verificación de la url de la tablatura por ser demasiado larga', () => {
    let recibido;
    try {
        lecciones.create(new LeccionModel("Leccion", "Descripción de la lección.", "https://www.youtube.com/watch?v=PDLKmXJA2yk", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris venenatis, sem et placerat gravida, dui quam egestas nibh, sed convallis leo risus non risus. Donec mollis massa non tortor blandit, vitae congue ipsum bibendum. Nam quis est id ligula venenatis pharetra quis in orci. Pellentesque fusce.", "Principiante"));
    }
    catch (error) {
        recibido = error;
    }
    esperado = { "message": { "urlTablatura": "El largo de la url de la tablatura no puede superar los 300 caracteres." }, "name": "ValidationError" };
    expect(recibido).toEqual(esperado);
});

test('Error en la verificación de la dificultad de la lección por ser demasiado corta', () => {
    let recibido;
    try {
        lecciones.create(new LeccionModel("Lección", "descripcion test", "https://www.youtube.com/watch?v=PDLKmXJA2yk", "https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf", "Dif"));
    }
    catch (error) {
        recibido = error;
    }
    esperado = { "message": { "dificultad": "La dificultad es demasiado corta" }, "name": "ValidationError" };
    expect(recibido).toEqual(esperado);
});

test('Error en la verificación de la dificultad de la lección por ser demasiado larga', () => {
    let recibido;
    try {
        lecciones.create(new LeccionModel("Lección", "descripcion test", "https://www.youtube.com/watch?v=PDLKmXJA2yk", "https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ex arcu, porta eget risus quis."));
    }
    catch (error) {
        recibido = error;
    }
    esperado = { "message": { "dificultad": "El largo de la dificultad no puede superar los 50 caracteres." }, "name": "ValidationError" };
    expect(recibido).toEqual(esperado);
});

test('Error al intentar recuperar lección no existente', () => {
    expect(()=>{lecciones.retrieve("l100");}).toThrowError("Imposible recuperar la lección (lid:l100)");
});