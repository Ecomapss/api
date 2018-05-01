import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { AreaElemento } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, areaElemento

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  areaElemento = await AreaElemento.create({})
})

test('POST /area-elementos 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, id_area: 'test', id_elemento: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.id_area).toEqual('test')
  expect(body.id_elemento).toEqual('test')
})

test('POST /area-elementos 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /area-elementos 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /area-elementos 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /area-elementos 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /area-elementos/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${areaElemento.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(areaElemento.id)
})

test('GET /area-elementos/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${areaElemento.id}`)
  expect(status).toBe(401)
})

test('GET /area-elementos/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /area-elementos/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${areaElemento.id}`)
    .send({ access_token: adminSession, id_area: 'test', id_elemento: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(areaElemento.id)
  expect(body.id_area).toEqual('test')
  expect(body.id_elemento).toEqual('test')
})

test('PUT /area-elementos/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${areaElemento.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /area-elementos/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${areaElemento.id}`)
  expect(status).toBe(401)
})

test('PUT /area-elementos/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, id_area: 'test', id_elemento: 'test' })
  expect(status).toBe(404)
})

test('DELETE /area-elementos/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${areaElemento.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /area-elementos/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${areaElemento.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /area-elementos/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${areaElemento.id}`)
  expect(status).toBe(401)
})

test('DELETE /area-elementos/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
