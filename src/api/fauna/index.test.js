import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Fauna } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, fauna

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  fauna = await Fauna.create({})
})

test('POST /faunas 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, nome_popular: 'test', nome_cientifico: 'test', ordem: 'test', reino: 'test', filo: 'test', classe: 'test', elemento_id: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.nome_popular).toEqual('test')
  expect(body.nome_cientifico).toEqual('test')
  expect(body.ordem).toEqual('test')
  expect(body.reino).toEqual('test')
  expect(body.filo).toEqual('test')
  expect(body.classe).toEqual('test')
  expect(body.elemento_id).toEqual('test')
})

test('POST /faunas 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /faunas 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /faunas 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /faunas/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${fauna.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(fauna.id)
})

test('GET /faunas/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /faunas/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${fauna.id}`)
    .send({ access_token: adminSession, nome_popular: 'test', nome_cientifico: 'test', ordem: 'test', reino: 'test', filo: 'test', classe: 'test', elemento_id: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(fauna.id)
  expect(body.nome_popular).toEqual('test')
  expect(body.nome_cientifico).toEqual('test')
  expect(body.ordem).toEqual('test')
  expect(body.reino).toEqual('test')
  expect(body.filo).toEqual('test')
  expect(body.classe).toEqual('test')
  expect(body.elemento_id).toEqual('test')
})

test('PUT /faunas/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${fauna.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /faunas/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${fauna.id}`)
  expect(status).toBe(401)
})

test('PUT /faunas/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, nome_popular: 'test', nome_cientifico: 'test', ordem: 'test', reino: 'test', filo: 'test', classe: 'test', elemento_id: 'test' })
  expect(status).toBe(404)
})

test('DELETE /faunas/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${fauna.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /faunas/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${fauna.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /faunas/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${fauna.id}`)
  expect(status).toBe(401)
})

test('DELETE /faunas/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
