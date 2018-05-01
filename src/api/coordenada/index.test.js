import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Coordenada } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, coordenada

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  coordenada = await Coordenada.create({})
})

test('POST /coordenadas 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, longitude: 'test', latitude: 'test', precisao: 'test', id_area_elemento: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.longitude).toEqual('test')
  expect(body.latitude).toEqual('test')
  expect(body.precisao).toEqual('test')
  expect(body.id_area_elemento).toEqual('test')
})

test('POST /coordenadas 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /coordenadas 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /coordenadas 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /coordenadas 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /coordenadas/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${coordenada.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(coordenada.id)
})

test('GET /coordenadas/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${coordenada.id}`)
  expect(status).toBe(401)
})

test('GET /coordenadas/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /coordenadas/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${coordenada.id}`)
    .send({ access_token: adminSession, longitude: 'test', latitude: 'test', precisao: 'test', id_area_elemento: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(coordenada.id)
  expect(body.longitude).toEqual('test')
  expect(body.latitude).toEqual('test')
  expect(body.precisao).toEqual('test')
  expect(body.id_area_elemento).toEqual('test')
})

test('PUT /coordenadas/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${coordenada.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /coordenadas/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${coordenada.id}`)
  expect(status).toBe(401)
})

test('PUT /coordenadas/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, longitude: 'test', latitude: 'test', precisao: 'test', id_area_elemento: 'test' })
  expect(status).toBe(404)
})

test('DELETE /coordenadas/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${coordenada.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /coordenadas/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${coordenada.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /coordenadas/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${coordenada.id}`)
  expect(status).toBe(401)
})

test('DELETE /coordenadas/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
