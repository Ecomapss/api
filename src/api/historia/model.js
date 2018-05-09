import mongoose, { Schema } from 'mongoose'

const historiaSchema = new Schema({
  titulo: {
    type: String
  },
  descricao: {
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

historiaSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      titulo: this.titulo,
      descricao: this.descricao,
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

const model = mongoose.model('Historia', historiaSchema)

export const schema = model.schema
export default model
