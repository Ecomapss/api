import mongoose, { Schema } from 'mongoose'

const regiaoSchema = new Schema({
  cidade: {
    type: String
  },
  uf: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

regiaoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      cidade: this.cidade,
      uf: this.uf,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Regiao', regiaoSchema)

export const schema = model.schema
export default model
