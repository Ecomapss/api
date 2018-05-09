import { Fauna } from '.'

let fauna

beforeEach(async () => {
  fauna = await Fauna.create({ nome_popular: 'test', nome_cientifico: 'test', ordem: 'test', reino: 'test', filo: 'test', classe: 'test', elemento_id: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = fauna.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(fauna.id)
    expect(view.nome_popular).toBe(fauna.nome_popular)
    expect(view.nome_cientifico).toBe(fauna.nome_cientifico)
    expect(view.ordem).toBe(fauna.ordem)
    expect(view.reino).toBe(fauna.reino)
    expect(view.filo).toBe(fauna.filo)
    expect(view.classe).toBe(fauna.classe)
    expect(view.elemento_id).toBe(fauna.elemento_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = fauna.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(fauna.id)
    expect(view.nome_popular).toBe(fauna.nome_popular)
    expect(view.nome_cientifico).toBe(fauna.nome_cientifico)
    expect(view.ordem).toBe(fauna.ordem)
    expect(view.reino).toBe(fauna.reino)
    expect(view.filo).toBe(fauna.filo)
    expect(view.classe).toBe(fauna.classe)
    expect(view.elemento_id).toBe(fauna.elemento_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
