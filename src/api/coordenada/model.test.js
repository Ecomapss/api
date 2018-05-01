import { Coordenada } from '.'

let coordenada

beforeEach(async () => {
  coordenada = await Coordenada.create({ longitude: 'test', latitude: 'test', precisao: 'test', id_area_elemento: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = coordenada.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(coordenada.id)
    expect(view.longitude).toBe(coordenada.longitude)
    expect(view.latitude).toBe(coordenada.latitude)
    expect(view.precisao).toBe(coordenada.precisao)
    expect(view.id_area_elemento).toBe(coordenada.id_area_elemento)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = coordenada.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(coordenada.id)
    expect(view.longitude).toBe(coordenada.longitude)
    expect(view.latitude).toBe(coordenada.latitude)
    expect(view.precisao).toBe(coordenada.precisao)
    expect(view.id_area_elemento).toBe(coordenada.id_area_elemento)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
