import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Area } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, area

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  area = await Area.create({})
})

test('POST /areas 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, nome: 'test', categoria: 'test', areacol: 'test', id_regiao: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.nome).toEqual('test')
  expect(body.categoria).toEqual('test')
  expect(body.areacol).toEqual('test')
  expect(body.id_regiao).toEqual('test')
})

test('POST /areas 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /areas 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /areas 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /areas 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /areas 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /areas/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${area.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(area.id)
})

test('GET /areas/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${area.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /areas/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${area.id}`)
  expect(status).toBe(401)
})

test('GET /areas/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /areas/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${area.id}`)
    .send({ access_token: adminSession, nome: 'test', categoria: 'test', areacol: 'test', id_regiao: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(area.id)
  expect(body.nome).toEqual('test')
  expect(body.categoria).toEqual('test')
  expect(body.areacol).toEqual('test')
  expect(body.id_regiao).toEqual('test')
  
})

test('PUT /areas/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${area.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /areas/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${area.id}`)
  expect(status).toBe(401)
})

test('PUT /areas/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, nome: 'test', categoria: 'test', areacol: 'test' })
  expect(status).toBe(404)
})

test('DELETE /areas/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${area.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /areas/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${area.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /areas/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${area.id}`)
  expect(status).toBe(401)
})

test('DELETE /areas/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
