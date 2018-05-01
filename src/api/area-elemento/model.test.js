import { AreaElemento } from '.'

let areaElemento

beforeEach(async () => {
  areaElemento = await AreaElemento.create({ id_area: 'test', id_elemento: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = areaElemento.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(areaElemento.id)
    expect(view.id_area).toBe(areaElemento.id_area)
    expect(view.id_elemento).toBe(areaElemento.id_elemento)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = areaElemento.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(areaElemento.id)
    expect(view.id_area).toBe(areaElemento.id_area)
    expect(view.id_elemento).toBe(areaElemento.id_elemento)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
