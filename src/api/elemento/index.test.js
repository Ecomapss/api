import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Elemento } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, elemento

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  elemento = await Elemento.create({})
})

test('POST /elementos 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, info: 'test', estado: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.info).toEqual('test')
  expect(body.estado).toEqual('test')
})

test('POST /elementos 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /elementos 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /elementos 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /elementos/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${elemento.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(elemento.id)
})

test('GET /elementos/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /elementos/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${elemento.id}`)
    .send({ access_token: adminSession, info: 'test', estado: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(elemento.id)
  expect(body.info).toEqual('test')
  expect(body.estado).toEqual('test')
})

test('PUT /elementos/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${elemento.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /elementos/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${elemento.id}`)
  expect(status).toBe(401)
})

test('PUT /elementos/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, info: 'test', estado: 'test' })
  expect(status).toBe(404)
})

test('DELETE /elementos/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${elemento.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /elementos/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${elemento.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /elementos/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${elemento.id}`)
  expect(status).toBe(401)
})

test('DELETE /elementos/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
