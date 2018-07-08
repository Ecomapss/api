import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Historia } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, historia

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  historia = await Historia.create({})
})

test('POST /historias 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, titulo: 'test', descricao: 'test', elemento_id: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.titulo).toEqual('test')
  expect(body.descricao).toEqual('test')
  expect(body.elemento_id).toEqual('test')
})

test('POST /historias 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /historias 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /historias 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /historias/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${historia.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(historia.id)
})

test('GET /historias/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /historias/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${historia.id}`)
    .send({ access_token: adminSession, titulo: 'test', descricao: 'test', elemento_id: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(historia.id)
  expect(body.titulo).toEqual('test')
  expect(body.descricao).toEqual('test')
  expect(body.elemento_id).toEqual('test')
})

test('PUT /historias/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${historia.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /historias/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${historia.id}`)
  expect(status).toBe(401)
})

test('PUT /historias/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, titulo: 'test', descricao: 'test', elemento_id: 'test' })
  expect(status).toBe(404)
})

test('DELETE /historias/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${historia.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /historias/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${historia.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /historias/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${historia.id}`)
  expect(status).toBe(401)
})

test('DELETE /historias/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
