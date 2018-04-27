import mongoose, { Schema } from 'mongoose'

const areaSchema = new Schema({
  nome: {
    type: String
  },
  categoria: {
    type: String
  },
  areacol: {
    type: String
  },
  id_regiao: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

areaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nome: this.nome,
      categoria: this.categoria,
      areacol: this.areacol,
      id_regiao: this.id_regiao,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Area', areaSchema)

export const schema = model.schema
export default model
