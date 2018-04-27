import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Regiao } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, regiao

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  regiao = await Regiao.create({})
})

test('POST /regioes 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, cidade: 'test', uf: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.cidade).toEqual('test')
  expect(body.uf).toEqual('test')
})

test('POST /regioes 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /regioes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /regioes 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /regioes 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /regioes 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /regioes/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${regiao.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(regiao.id)
})

test('GET /regioes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${regiao.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /regioes/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${regiao.id}`)
  expect(status).toBe(401)
})

test('GET /regioes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /regioes/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${regiao.id}`)
    .send({ access_token: adminSession, cidade: 'test', uf: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(regiao.id)
  expect(body.cidade).toEqual('test')
  expect(body.uf).toEqual('test')
})

test('PUT /regioes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${regiao.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /regioes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${regiao.id}`)
  expect(status).toBe(401)
})

test('PUT /regioes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, cidade: 'test', uf: 'test' })
  expect(status).toBe(404)
})

test('DELETE /regioes/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${regiao.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /regioes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${regiao.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /regioes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${regiao.id}`)
  expect(status).toBe(401)
})

test('DELETE /regioes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
