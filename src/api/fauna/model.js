import mongoose, { Schema } from 'mongoose'

const faunaSchema = new Schema({
  nome_popular: {
    type: String
  },
  nome_cientifico: {
    type: String
  },
  ordem: {
    type: String
  },
  reino: {
    type: String
  },
  filo: {
    type: String
  },
  classe: {
    type: String
  },
  elemento_id: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

faunaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      nome_popular: this.nome_popular,
      nome_cientifico: this.nome_cientifico,
      ordem: this.ordem,
      reino: this.reino,
      filo: this.filo,
      classe: this.classe,
      elemento_id: this.elemento_id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Fauna', faunaSchema)

export const schema = model.schema
export default model
