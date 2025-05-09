const request = require('supertest');
const app = require('../index'); 

describe('API Actores', () => {
  it('debe devolver un actor por su ID', async () => {
    const response = await request(app)
      .get('/actor/3')
      .expect(200);

    expect(response.body.resultado[0]).toHaveProperty('id');
    expect(response.body.resultado[0]).toHaveProperty('nombre');
    expect(response.body.resultado[0]).toHaveProperty('genero');
    expect(response.body.resultado[0]).toHaveProperty('nacionalidad');
    expect(response.body.resultado[0]).toHaveProperty('peliculaMasExitosa');
    expect(response.body.resultado[0]).toHaveProperty('premios');
  });

  it('debe devolver un error 404 si el actor no existe', async () => {
    const response = await request(app)
      .get('/actor/999')
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Actor no encontrado');
  });

  it('debe agregar un actor correctamente', async () => {
    const newActor = {
      nombre: 'Nuevo Actor',
      genero: 'Femenino', 
      nacionalidad: 'Estadounidense',
      peliculaMasExitosa: 'Película X',
      premios: 5
    };

    const response = await request(app)
      .post('/actor')
      .send(newActor)
      .expect(200);

    expect(response.body).toHaveProperty('mensaje', 'Actor agregado correctamente');
    expect(response.body).toHaveProperty('id');
  });
});
